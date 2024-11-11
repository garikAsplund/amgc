<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let videoEnded = $state<string | boolean | null>("false");
	$inspect(videoEnded);
	let navHeight: number = $state(0);

	onMount(() => {
		let navElement: HTMLDivElement = document.getElementById('nav');
		videoEnded = sessionStorage.getItem("visited");
		setTimeout(() => sessionStorage.setItem("visited", "true"), 2000);

		function calculateNavHeight() {
			if (navElement) {
				navHeight = navElement.offsetHeight; 
				// console.log(`Navigation height: ${navHeight}px`);
			}
		}
		calculateNavHeight();
		window.addEventListener('resize', calculateNavHeight);
		return () => {
			window.removeEventListener('resize', calculateNavHeight);
		};
	});

	function handleVideoEnd() {
		videoEnded = "true";
	}
</script>

<section class="flex shrink-0 flex-col items-center justify-center w-full "
    style="height: calc(100vh - {navHeight}px)"
>
<div class="absolute inset-0 -z-10 h-full w-full object-cover bg-black"></div>
	{#if videoEnded === "false" || videoEnded === null}
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

	<div class="flex h-full flex-col items-center justify-center space-y-8 text-center px-8 -translate-y-12">
		<p class="text-lg md:text-2xl text-gray-100">Welcome to</p>
		<h1 class="font-serif text-2xl md:text-6xl font-semibold text-gray-100">Alpine Meadows Golf Course</h1>
		<h2 class="pt-8 font-serif text-xl md:text-4xl text-gray-100">
			Golf at the base of the Wallowa Mountains
		</h2>
		<p class="absolute bottom-0 py-16 font-serif text-xl md:text-2xl text-gray-300">
			Currently closed for the winter
		</p>
	</div>
</section>
