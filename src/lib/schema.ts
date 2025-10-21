import { z } from 'zod';

export const schema = z.object({
	fullName: z
		.string()
		.min(1, 'Full name is required')
		.max(255, 'Full name must be 255 characters or less')
		.default(''),
	email: z
		.string()
		.email('Please enter a valid email address')
		.max(255, 'Email must be 255 characters or less')
		.default(''),
	company: z.string().optional().default(''),
	'g-recaptcha-response': z.string().optional() // 👈 ADD THIS
});
