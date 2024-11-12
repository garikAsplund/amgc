<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { schema } from '$lib/schema';
	import { zod } from 'sveltekit-superforms/adapters';

	let { data } = $props();
	const { form, errors, constraints, message, enhance, validateForm } = superForm(data.form, {
		validators: zod(schema),
		schema,
		dataType: 'json'
	});

	let videoEnded = $state<string | boolean | null>('false');
	// $inspect(videoEnded);
	let navHeight: number = $state(0);

	let isLoading = $state(false);
	let isSubmitted = $state(false);
	let emailMessage = $state('');

	// Simulate form submission for demonstration
	async function handleSubmit(event) {
		isLoading = true;
	}

	onMount(() => {
		let navElement: HTMLDivElement = document.getElementById('nav');
		videoEnded = sessionStorage.getItem('visited');
		setTimeout(() => sessionStorage.setItem('visited', 'true'), 2000);
		function calculateNavHeight() {
			if (navElement) {
				navHeight = navElement.offsetHeight;
			}
		}
		calculateNavHeight();
		window.addEventListener('resize', calculateNavHeight);
		return () => {
			window.removeEventListener('resize', calculateNavHeight);
		};
	});
	function handleVideoEnd() {
		videoEnded = 'true';
	}
</script>

<section
	class="relative flex w-full shrink-0 flex-col items-center justify-center"
	style="height: calc(100vh - {navHeight}px)"
>
	<div class="absolute inset-0 -z-10 h-full w-full bg-black object-cover"></div>
	{#if videoEnded === 'false' || videoEnded === null}
		<video
			class="absolute inset-0 -z-10 h-full w-full object-cover"
			muted
			autoplay
			playsinline
			disablepictureinpicture
			poster="first-frame.avif"
			onended={handleVideoEnd}
		>
			<source src="/amgc.webm" type="video/webm" />
			<source src="/amgc.mp4" type="video/mp4" />
		</video>
	{:else}
		<div class="absolute inset-0 -z-10 bg-black" transition:fade={{ duration: 1500 }}>
			<enhanced:img
				src="/static/amgc-hero.jpg"
				alt="Alpine Meadows Golf Course"
				class="h-full w-full object-cover object-left"
			/>
			<div class="absolute inset-0 z-0 bg-orange-400/20 dark:bg-black/30"></div>
		</div>
	{/if}

	<div
		class="flex h-full -translate-y-12 flex-col items-center justify-center space-y-8 px-8 text-center"
	>
		<p class="text-lg text-gray-100 md:text-2xl">Welcome to</p>
		<h1 class="font-serif text-2xl font-semibold text-gray-100 md:text-6xl">
			Alpine Meadows Golf Course
		</h1>
		<h2 class="pt-8 font-serif text-xl text-gray-100 md:text-4xl">
			Golf at the base of the Wallowa Mountains
		</h2>

		<p class="absolute bottom-0 py-16 font-serif text-xl text-gray-300 md:text-2xl">
			Currently closed for the winter
		</p>
	</div>
</section>

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
					<input
						type="email"
						name="email"
						placeholder="Enter your email"
						bind:value={$form.email}
						required
						autocomplete="email"
						disabled={isLoading}
						class:opacity-50={isLoading}
						class="w-full rounded-md border border-gray-300 bg-white/90 px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800/90 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:bg-gray-700/90"
					/>

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
	input:-webkit-autofill {
		-webkit-box-shadow: 0 0 0px 1000px #1a1a1a inset; /* Sets a custom background color for autofill */
		-webkit-text-fill-color: #f1f1f1; /* Ensures text color stays consistent */
	}

	input:-webkit-autofill:focus {
		-webkit-box-shadow: 0 0 0px 1000px #1a1a1a inset;
		-webkit-text-fill-color: #f1f1f1;
	}
</style>
