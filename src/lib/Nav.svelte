<script lang="ts">
	import Socials from '$lib/Socials.svelte';
	import LogoSvg from '$lib/svgs/LogoSVG.svelte';
	import LogoDark from '$lib/svgs/LogoDark.svelte';
	import WeatherWidget from '$lib/WeatherWidget.svelte';
	import { page } from '$app/stores';
	import { ChevronDown, X } from 'lucide-svelte';

	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}
</script>

<nav
	class="sticky top-0 z-10 flex w-full items-center justify-between bg-white py-4 font-serif font-light text-gray-800 md:px-8 dark:bg-[#121212] dark:text-gray-200"
	id="nav"
	aria-label="Main navigation"
>
	<!-- Logo -->
	<div class="z-10 flex-shrink-0">
		<a href="/" aria-label="Return to homepage" class="hover:opacity-80" onclick={closeMenu}>
			<div class="dark:hidden">
				<LogoSvg />
			</div>
			<div class="hidden dark:block">
				<LogoDark />
			</div>
		</a>
	</div>

	<!-- Desktop Navigation Links -->
	<div
		class="absolute inset-x-0 hidden justify-center lg:flex lg:space-x-4 lg:text-lg xl:space-x-8 xl:text-2xl"
		role="navigation"
		aria-label="Desktop menu"
	>
		<a
			href="/course"
			class="p-4 hover:opacity-75 {$page.url.pathname === '/course'
				? 'border-b-2 border-slate-600'
				: ''}"
			aria-current={$page.url.pathname === '/course' ? 'page' : undefined}
		>
			Course
		</a>
		<a
			href="/rates"
			class="p-4 hover:opacity-75 {$page.url.pathname === '/rates'
				? 'border-b-2 border-slate-600'
				: ''}"
			aria-current={$page.url.pathname === '/rates' ? 'page' : undefined}
		>
			Rates
		</a>
		<a
			href="/events"
			class="p-4 hover:opacity-75 {$page.url.pathname === '/events'
				? 'border-b-2 border-slate-600'
				: ''}"
			aria-current={$page.url.pathname === '/events' ? 'page' : undefined}
		>
			Events
		</a>
		<a
			href="/membership"
			class="p-4 hover:opacity-75 {$page.url.pathname === '/membership'
				? 'border-b-2 border-slate-600'
				: ''}"
			aria-current={$page.url.pathname === '/membership' ? 'page' : undefined}
		>
			Membership
		</a>
		<a
			href="/team"
			class="p-4 hover:opacity-75 {$page.url.pathname === '/team'
				? 'border-b-2 border-slate-600'
				: ''}"
			aria-current={$page.url.pathname === '/team' ? 'page' : undefined}
		>
			Our Team
		</a>
	</div>

	<!-- Mobile Menu Button -->
	<div class="flex items-center space-x-2 lg:hidden">
		<button
			aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={isMenuOpen}
			aria-controls="mobile-menu"
			class="flex items-center p-4 focus:outline-none"
			onclick={toggleMenu}
		>
			<span class="mr-2 text-2xl">Menu</span>
			{#if isMenuOpen}
				<X class="h-6 w-6" aria-hidden="true" />
			{:else}
				<ChevronDown class="h-6 w-6" aria-hidden="true" />
			{/if}
		</button>
	</div>

	<!-- Weather and Socials -->
	<div class="flex items-center space-x-4" aria-label="Utilities">
		<WeatherWidget />
		<div class="hidden md:block">
			<Socials />
		</div>
	</div>
</nav>

<!-- Mobile Dropdown Menu -->
{#if isMenuOpen}
	<div
		class="absolute left-0 top-24 z-10 flex w-full flex-col items-center space-y-4 bg-white py-6 text-gray-800 shadow-lg lg:hidden dark:bg-[#121212] dark:text-gray-200"
		id="mobile-menu"
		role="navigation"
		aria-label="Mobile menu"
	>
		<a
			href="/course"
			class="w-full p-4 text-center text-lg hover:opacity-75 {$page.url.pathname === '/course'
				? 'border-b-2 border-slate-600'
				: ''}"
			onclick={closeMenu}
			aria-current={$page.url.pathname === '/course' ? 'page' : undefined}
		>
			Course
		</a>
		<a
			href="/rates"
			class="w-full p-4 text-center text-lg hover:opacity-75 {$page.url.pathname === '/rates'
				? 'border-b-2 border-slate-600'
				: ''}"
			onclick={closeMenu}
			aria-current={$page.url.pathname === '/rates' ? 'page' : undefined}
		>
			Rates
		</a>
		<a
			href="/events"
			class="w-full p-4 text-center text-lg hover:opacity-75 {$page.url.pathname === '/events'
				? 'border-b-2 border-slate-600'
				: ''}"
			onclick={closeMenu}
			aria-current={$page.url.pathname === '/events' ? 'page' : undefined}
		>
			Events
		</a>
		<a
			href="/membership"
			class="w-full p-4 text-center text-lg hover:opacity-75 {$page.url.pathname === '/membership'
				? 'border-b-2 border-slate-600'
				: ''}"
			onclick={closeMenu}
			aria-current={$page.url.pathname === '/membership' ? 'page' : undefined}
		>
			Membership
		</a>
		<a
			href="/team"
			class="w-full p-4 text-center text-lg hover:opacity-75 {$page.url.pathname === '/team'
				? 'border-b-2 border-slate-600'
				: ''}"
			onclick={closeMenu}
			aria-current={$page.url.pathname === '/team' ? 'page' : undefined}
		>
			Our Team
		</a>
	</div>
{/if}
