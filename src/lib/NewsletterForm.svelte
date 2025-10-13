<script lang="ts">
	import { onMount } from 'svelte';
import SuperDebug, { superForm } from 'sveltekit-superforms';
import { schema } from '$lib/schema';
import { zod } from 'sveltekit-superforms/adapters';
import { Mail } from 'lucide-svelte';
import { PUBLIC_RECAPTCHA_SITE_KEY } from '$env/static/public';

let grecaptchaReady = $state(false);

onMount(() => {
  if (window.grecaptcha?.enterprise) {
    grecaptchaReady = true;
    return;
  }

  const script = document.createElement('script');
  script.src = `https://www.google.com/recaptcha/enterprise.js?render=${PUBLIC_RECAPTCHA_SITE_KEY}`;
  script.async = true;
  script.defer = true;
  script.onload = () => {
    grecaptchaReady = true;
  };
  document.head.appendChild(script);
});

let { data } = $props();
let isLoading = $state(false);
let { form, errors, message, enhance } = superForm(data.form, {
  validators: zod(schema),
  schema,
  dataType: 'json'
});

async function handleSubmit() {
  if (!grecaptchaReady) {
    console.warn('reCAPTCHA not ready yet');
    return;
  }

  const token = await window.grecaptcha.enterprise.execute(
    PUBLIC_RECAPTCHA_SITE_KEY,
    { action: 'submit' }
  );

  $form['g-recaptcha-response'] = token;
  isLoading = true;
}
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
			<form method="POST" use:enhance onsubmit={handleSubmit} class="flex flex-col space-y-4">
        <!-- Honeypot -->
				<input type="text" name="company" style="display:none;" tabindex="-1" autocomplete="off" />

        <!-- reCAPTCHA v3 -->
				<input
					type="hidden"
					name="g-recaptcha-response"
					bind:value={$form['g-recaptcha-response']}
				/>

        <!-- Actual form -->
				<div class="flex flex-col">
					<label for="fullName" class="mb-1 font-medium dark:text-gray-100"> Full Name </label>
					<input
						id="fullName"
						name="fullName"
						bind:value={$form.fullName}
						required
						disabled={isLoading}
						class="rounded-md border bg-white/90 px-3 py-2 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800/90 dark:text-gray-100"
					/>
					{#if errors.fullName}
						<p class="mt-1 text-sm text-red-600">{errors.fullName}</p>
					{/if}
				</div>

				<div class="flex flex-col">
					<label for="email" class="mb-1 font-medium dark:text-gray-100"> Email Address </label>
					<input
						id="email"
						type="email"
						name="email"
						bind:value={$form.email}
						required
						autocomplete="email"
						disabled={isLoading}
						class="rounded-md border bg-white/90 px-3 py-2 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800/90 dark:text-gray-100"
					/>
					{#if errors.email}
						<p class="mt-1 text-sm text-red-600">{errors.email}</p>
					{/if}
				</div>

				<button
					type="submit"
					disabled={isLoading}
					class=" rounded-md bg-green-700 px-4 py-2 font-medium text-white transition hover:bg-green-600 dark:bg-green-700/80"
				>
					{#if isLoading}Submitting...{:else}Subscribe{/if}
				</button>
			</form>
		{/if}

		<div class="mt-4 text-center">
			<a
				href="/newsletters/october-2025.pdf"
				target="_blank"
				class="text-base hover:underline dark:text-gray-100"
			>
				Read our latest newsletter
			</a>
		</div>
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
