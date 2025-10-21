import { superValidate, message } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { schema } from '$lib/schema';
import { RECAPTCHA_SECRET_KEY } from '$env/static/private';
import { PUBLIC_RECAPTCHA_SITE_KEY } from '$env/static/public';
import { dev } from '$app/environment';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(schema));
	return { form };
};

export const actions = {
	default: async ({ request, fetch }) => {
		const form = await superValidate(request, zod(schema));
		console.log('form.data:', form.data);
		if (!form.valid) return fail(400, { form });

		// Honeypot check
		const company = (form.data.company ?? '').trim();
		if (company !== '') {
			console.warn('🤖 Honeypot triggered:', company);
			return message(form, 'Bot detected', { status: 400 });
		}

		// -----🧠 reCAPTCHA check -----
		if (!dev) {
			const token = form.data['g-recaptcha-response'];

			const verify = await fetch(
				`https://recaptchaenterprise.googleapis.com/v1/projects/sup-email-463020/assessments?key=${RECAPTCHA_SECRET_KEY}`,
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
			console.log(JSON.stringify(result, null, 2));
			if (!result.tokenProperties?.valid) {
				return message(form, 'ReCAPTCHA validation failed', { status: 400 });
			}
		} else {
			console.log('⚠️ Skipping reCAPTCHA validation in dev');
		}
		// --------------------------------

		// Send email
		const res = await fetch('/api/send-email', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(form.data)
		});

		if (!res.ok) {
			const err = await res.json();
			return message(form, `Error sending email: ${err.error}`, { status: 500 });
		}

		return message(form, 'Email sent successfully');
	}
} satisfies Actions;
