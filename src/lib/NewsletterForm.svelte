<script lang="ts">
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { schema } from '$lib/schema';
	import { zod } from 'sveltekit-superforms/adapters';
	import { Mail } from 'lucide-svelte';

	let { data } = $props();

	let isLoading = $state(false);
	let isSubmitted = $state(false);
	let emailMessage = $state('');

	const { form, errors, constraints, message, enhance, validateForm } = superForm(data.form, {
		validators: zod(schema),
		schema,
		dataType: 'json'
	});

	// Simulate form submission for demonstration
	async function handleSubmit(event) {
		isLoading = true;
	}
</script>

<section class="flex flex-col items-center dark:bg-current">
	<div class="my-8 w-full max-w-md space-y-8 px-4">
		<h2 class="text-center text-lg font-semibold dark:text-gray-100">
			Sign up for our newsletter!
		</h2>

		{#if $message}
			<!-- Confirmation Message -->
			<p class="rounded bg-green-700 px-4 py-2 text-center text-sm text-white">
				{$message}
			</p>
		{:else}
			<!-- Newsletter Signup Form -->
			<form
				method="POST"
				use:enhance
				onsubmit={handleSubmit}
				class="flex flex-col items-center space-y-4"
			>
				<div class="flex w-full max-w-sm items-center space-x-2">
					<div class="relative w-full">
						<Mail
							class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-gray-400"
						/>
						<input
							type="email"
							name="email"
							placeholder="Enter your email"
							bind:value={$form.email}
							required
							autocomplete="email"
							disabled={isLoading}
							class:opacity-50={isLoading}
							class="w-full rounded-md border border-gray-300 bg-white/90 py-2 pl-10 pr-4 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800/90 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:bg-gray-700/90"
						/>
					</div>
					<button
						type="submit"
						class="rounded-md bg-green-700 px-4 py-2 font-medium text-white shadow-lg transition-all hover:bg-green-600 dark:bg-green-700/80 dark:hover:bg-green-600/40"
						class:opacity-50={isLoading}
						disabled={isLoading}
					>
						{#if isLoading}
							Submitting...
						{:else}
							Subscribe
						{/if}
					</button>
				</div>
				{#if $message && !isSubmitted}
					<p class="rounded bg-black/50 px-4 py-2 text-sm text-gray-100">{$message}</p>
				{/if}
			</form>
		{/if}

		<div class="mt-4 text-center">
			<a
				href="/newsletters/october-2024.pdf"
				target="_blank"
				class="text-base hover:underline hover:underline-offset-4 hover:opacity-75 dark:text-gray-100"
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
