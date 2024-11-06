<script lang="ts">
	import { fade } from 'svelte/transition';

	let videoEnded = $state(false);

	function handleVideoEnd() {
		videoEnded = true;
	}
</script>

<section class="flex h-[100vh] shrink-0 flex-col items-center justify-center ">
	{#if !videoEnded}
		<video
			class="absolute -z-10 h-full w-full object-cover"
			muted
			autoplay
			playsinline
			disablepictureinpicture
			poster="first-frame.png"
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
				class="h-full w-full object-cover"
			/>
			<div class="absolute inset-0 z-0 bg-orange-400/20"></div>
		</div>
	{/if}

	<div class="flex h-full flex-col items-center justify-center space-y-8 text-center px-8">
		<h3 class="text-2xl text-gray-100">Welcome to</h3>
		<h1 class="font-serif text-6xl font-semibold text-gray-100">Alpine Meadows Golf Course</h1>
		<h2 class="pt-8 font-serif text-4xl text-gray-100">
			Golf at the base of the Wallowa Mountains
		</h2>
		<h4 class="absolute bottom-0 py-16 font-serif text-2xl text-gray-300">
			Currently closed for the winter
		</h4>
	</div>
</section>
