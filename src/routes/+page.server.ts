import { superValidate, message } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { schema } from '$lib/schema';
import { RECAPTCHA_API_KEY } from '$env/static/private';
import { PUBLIC_RECAPTCHA_SITE_KEY } from '$env/static/public';
import { dev } from '$app/environment';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(schema));
	return { form };
};

export const actions = {
	default: async ({ request, fetch }) => {
		// read raw form once
		const raw = await request.formData();

		// feed it into Superforms
		const form = await superValidate(raw, zod(schema));

		// ⬅️ manually re‑inject the token so it's available
		const token = raw.get('g-recaptcha-response') as string | undefined;
		form.data['g-recaptcha-response'] = token;

		console.log('raw token:', token);
		console.log('form.data token:', form.data['g-recaptcha-response']);

		if (!form.valid) return fail(400, { form });

		// Honeypot
		const company = (form.data.company ?? '').trim();
		if (company !== '') {
			console.warn('🤖 Honeypot triggered:', company);
			return message(form, 'Bot detected', { status: 400 });
		}

		// ===== 🧠 reCAPTCHA Enterprise Verification =====
		if (!dev) {
			if (!token) {
				console.error('❌ Missing reCAPTCHA token on backend');
				return message(form, 'Missing reCAPTCHA token', { status: 400 });
			}

			const verify = await fetch(
				`https://recaptchaenterprise.googleapis.com/v1/projects/sup-email-463020/assessments?key=${RECAPTCHA_API_KEY}`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						event: {
							token,
							expectedAction: 'submit',
							siteKey: PUBLIC_RECAPTCHA_SITE_KEY
						}
					})
				}
			);

			let result: any = null;
			try {
				result = await verify.json();
			} catch (err) {
				const errText = await verify.text();
				console.error('❌ Could not parse Google JSON:', errText);
				return message(form, 'Invalid reCAPTCHA response', { status: 500 });
			}

			if (!verify.ok) {
				console.error('❌ Google verify failed:', verify.status, result);
				return message(form, `Google error ${verify.status}`, { status: 500 });
			}

			if (!result.tokenProperties?.valid) {
				return message(form, `reCAPTCHA failed: ${result.tokenProperties.invalidReason}`, {
					status: 400
				});
			}

			console.log('✅ reCAPTCHA valid, score:', result?.riskAnalysis?.score);
		} else {
			console.log('⚠️ Skipping reCAPTCHA validation in dev');
		}

		// Send email
		const res = await fetch('/api/send-email', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(form.data)
		});

		if (!res.ok) {
			const err = await res.json();
			return message(form, `Error sending email: ${err.error}`, {
				status: 500
			});
		}

		return message(form, 'Email sent successfully');
	}
} satisfies Actions;
