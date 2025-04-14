<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import NewsletterForm from '$lib/NewsletterForm.svelte';

	let { data } = $props();

	let videoEnded = $state<string | boolean | null>('false');
	// $inspect(videoEnded);
	let navHeight: number = $state(0);

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
		<div class="py-12">
			<a
				href="/membership"
				class="inline-block transform rounded-md bg-white px-8 py-3 font-semibold text-emerald-800 shadow-md transition duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-gray-100"
			>
				Pay Membership Dues
			</a>
		</div>
		<p class="absolute bottom-0 py-16 font-serif text-xl text-gray-300 md:text-2xl">
			Now open!
		</p>
	</div>
</section>

<NewsletterForm {data} />
