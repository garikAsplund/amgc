import { superValidate, message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { schema } from '$lib/schema';
import { RECAPTCHA_SECRET_KEY } from '$env/static/private';
import { PUBLIC_RECAPTCHA_SITE_KEY } from '$env/static/public';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(schema));

	return { form };
};

export const actions = {
	default: async ({ request, fetch }) => {
		const form = await superValidate(request, zod(schema));
		console.log(form);

		if (!form.valid) {
			return fail(400, { form });
		} else {
			// Honeypot check
			if (form.data.company) return message(form, 'Bot detected', { status: 400 });

			// reCAPTCHA verify
			const data = await request.formData();
			const token = data.get('g-recaptcha-response');

			const verify = await fetch(
				'https://recaptchaenterprise.googleapis.com/v1/projects/sup-email-463020/assessments?key=' +
					RECAPTCHA_SECRET_KEY,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						event: {
							token,
							siteKey: PUBLIC_RECAPTCHA_SITE_KEY,
							expectedAction: 'submit'
						}
					})
				}
			);

			const result = await verify.json();
			if (!result.tokenProperties?.valid) {
				return fail(400, { message: 'ReCAPTCHA validation failed.' });
			}
			const response = await fetch('/api/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(form)
			});

			if (response.ok) {
				return message(form, 'Email sent successfully');
			} else {
				const errorData = await response.json();
				return message(form, `Error sending email: ${errorData.error}`);
			}
		}
	}
} satisfies Actions;
