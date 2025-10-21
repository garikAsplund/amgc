<script lang="ts">
	import { onMount } from 'svelte';
	import { superForm } from 'sveltekit-superforms';
	import { schema } from '$lib/schema';
	import { zod } from 'sveltekit-superforms/adapters';
	import { PUBLIC_RECAPTCHA_SITE_KEY } from '$env/static/public';

	let { data } = $props();
	let { form, errors, message, enhance } = superForm(data.form, {
		validators: zod(schema),
		dataType: 'json'
	});

	let isLoading = $state(false);

	onMount(() => {
		// Load Enterprise JS
		const s = document.createElement('script');
		s.src = `https://www.google.com/recaptcha/enterprise.js?render=${PUBLIC_RECAPTCHA_SITE_KEY}`;
		s.async = true;
		s.defer = true;
		document.head.appendChild(s);

		// Define the callback Google calls when the token is ready
		(window as any).onRecaptchaSubmit = (token: string) => {
			console.log('reCAPTCHA token:', token);
			const formEl = document.getElementById('newsletter-form') as HTMLFormElement;
			if (!formEl) return;

			let hidden = formEl.querySelector<HTMLInputElement>('[name="g-recaptcha-response"]');
			if (!hidden) {
				hidden = document.createElement('input');
				hidden.name = 'g-recaptcha-response';
				hidden.type = 'hidden';
				formEl.appendChild(hidden);
			}
			hidden.value = token;

			isLoading = true;
			formEl.submit();
		};
	});
</script>

<section class="flex flex-col items-center dark:bg-current">
	<div class="my-8 w-full max-w-md space-y-6 px-4">
		<h2 class="text-center text-lg font-semibold dark:text-gray-100">
			Sign up for our newsletter!
		</h2>

		{#if $message}
			<p class="rounded bg-green-700 px-4 py-2 text-center text-sm text-white">
				{$message}
			</p>
		{:else}
			<form
				id="newsletter-form"
				action="?/submit"
				method="POST"
				use:enhance
				class="flex flex-col space-y-4"
			>
				<!-- Honeypot -->
				<input
					type="text"
					name="company"
					style="display:none"
					tabindex="-1"
					autocomplete="off"
					bind:value={$form.company}
				/>

				<input
					type="hidden"
					name="g-recaptcha-response"
					bind:value={$form['g-recaptcha-response']}
				/>

				<div class="flex flex-col">
					<label for="fullName" class="mb-1 font-medium dark:text-gray-100">Full Name</label>
					<input
						id="fullName"
						name="fullName"
						bind:value={$form.fullName}
						required
						disabled={isLoading}
						class="rounded-md border px-3 py-2"
					/>
					{#if errors.fullName}
						<p class="mt-1 text-sm text-red-600">{errors.fullName}</p>
					{/if}
				</div>

				<div class="flex flex-col">
					<label for="email" class="mb-1 font-medium dark:text-gray-100">Email Address</label>
					<input
						id="email"
						type="email"
						name="email"
						bind:value={$form.email}
						required
						autocomplete="email"
						disabled={isLoading}
						class="rounded-md border px-3 py-2"
					/>
					{#if errors.email}
						<p class="mt-1 text-sm text-red-600">{errors.email}</p>
					{/if}
				</div>

				<button
					class="g-recaptcha rounded-md bg-green-700 px-4 py-2 font-medium text-white hover:bg-green-600"
					type="button"
					data-sitekey={PUBLIC_RECAPTCHA_SITE_KEY}
					data-callback="onRecaptchaSubmit"
					data-action="submit"
					disabled={isLoading}
				>
					{#if isLoading}Submitting...{:else}Subscribe{/if}
				</button>
			</form>

			<p class="mt-3 text-left text-xs text-gray-500">
				This site is protected by reCAPTCHA and the Google
				<a
					href="https://policies.google.com/privacy"
					class="underline transition-colors hover:text-gray-700"
					target="_blank"
					rel="noopener noreferrer">Privacy Policy</a
				>
				and
				<a
					href="https://policies.google.com/terms"
					class="underline transition-colors hover:text-gray-700"
					target="_blank"
					rel="noopener noreferrer">Terms of Service</a
				>
				apply.
			</p>
		{/if}
	</div>
</section>

<style>
	@media (prefers-color-scheme: dark) {
		input:-webkit-autofill {
			-webkit-box-shadow: 0 0 0px 1000px #1a1a1a inset; /* Sets a custom background color for autofill */
			-webkit-text-fill-color: #f1f1f1; /* Ensures text color stays consistent */
		}

		input:-webkit-autofill:focus {
			-webkit-box-shadow: 0 0 0px 1000px #1a1a1a inset;
			-webkit-text-fill-color: #f1f1f1;
		}
	}
</style>
