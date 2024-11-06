<script lang="ts">
	import Socials from '$lib/Socials.svelte';
	import LogoSvg from './svgs/LogoSVG.svelte';
</script>

<div
	class="relative top-0 flex w-full items-center justify-between space-x-4 px-16 py-4 font-serif font-light text-gray-800"
>
	<div class="">
		<a href="/" aria-label="Home" class="hover:opacity-75"><LogoSvg /> </a>
	</div>
	<div class="flex justify-center space-x-8 text-2xl">
		<a href="" class="hover:opacity-75 p-4">Course</a>
		<a href="" class="hover:opacity-75 p-4">Golf</a>
		<a href="" class="hover:opacity-75 p-4">Events</a>
		<a href="/team" class="hover:opacity-75 p-4">Our Team</a>
	</div>
	<div class="">
		<Socials />
	</div>
</div>
