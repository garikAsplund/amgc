<script lang="ts">
	import Socials from '$lib/Socials.svelte';
	import LogoSvg from '$lib/svgs/LogoSVG.svelte';
	import WeatherWidget from '$lib/WeatherWidget.svelte';
	import { page } from '$app/stores';
</script>

<div
	class="sticky top-0 flex w-full items-center justify-between space-x-4 px-16 py-4 font-serif font-light text-gray-800 bg-white z-10"
	id="nav"
>
	<div class="">
		<a href="/" aria-label="Home" class="hover:opacity-75"><LogoSvg /> </a>
	</div>
	<div class="flex justify-center space-x-8 text-2xl">
		<a href="/course" class="hover:opacity-75 p-4 {$page.url.pathname === '/course' ? 'border-b-2 border-slate-600 ' : ''}">Course</a>
		<a href="/golf" class="hover:opacity-75 p-4 {$page.url.pathname === '/golf' ? 'border-b-2 border-slate-600 ' : ''}">Golf</a>
		<a href="/events" class="hover:opacity-75 p-4 {$page.url.pathname === '/events' ? 'border-b-2 border-slate-600 ' : ''}">Events</a>
		<a href="/team" class="hover:opacity-75 p-4 {$page.url.pathname === '/team' ? 'border-b-2 border-slate-600 ' : ''}">Our Team</a>
	</div>
	<div class="flex items-center space-x-4">
		<WeatherWidget />
		<Socials />
	</div>
</div>
