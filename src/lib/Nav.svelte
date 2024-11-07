<script lang="ts">
	import Socials from '$lib/Socials.svelte';
	import LogoSvg from '$lib/svgs/LogoSVG.svelte';
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

<nav class="sticky top-0 flex w-full items-center justify-between px-8 py-4 font-serif font-light text-gray-800 bg-white dark:bg-[#121212] dark:text-gray-200 z-10" 
    id="nav" 
    aria-label="Main navigation">
	<!-- Logo -->
	<div class="flex-shrink-0 z-10">
		<a href="/" aria-label="Return to homepage" onclick={closeMenu}>
			<LogoSvg />
		</a>
	</div>
	
	<!-- Desktop Navigation Links -->
	<div class="hidden lg:flex justify-center xl:space-x-8 lg:space-x-4 xl:text-2xl lg:text-lg absolute inset-x-0"
	     role="navigation"
	     aria-label="Desktop menu">
		<a href="/course" 
		   class="hover:opacity-75 p-4 {$page.url.pathname === '/course' ? 'border-b-2 border-slate-600' : ''}"
		   aria-current={$page.url.pathname === '/course' ? 'page' : undefined}>
			Course
		</a>
		<a href="/rates" 
		   class="hover:opacity-75 p-4 {$page.url.pathname === '/rates' ? 'border-b-2 border-slate-600' : ''}"
		   aria-current={$page.url.pathname === '/rates' ? 'page' : undefined}>
			Rates
		</a>
		<a href="/events" 
		   class="hover:opacity-75 p-4 {$page.url.pathname === '/events' ? 'border-b-2 border-slate-600' : ''}"
		   aria-current={$page.url.pathname === '/events' ? 'page' : undefined}>
			Events
		</a>
		<a href="/membership" 
		   class="hover:opacity-75 p-4 {$page.url.pathname === '/membership' ? 'border-b-2 border-slate-600' : ''}"
		   aria-current={$page.url.pathname === '/membership' ? 'page' : undefined}>
			Membership
		</a>
		<a href="/team" 
		   class="hover:opacity-75 p-4 {$page.url.pathname === '/team' ? 'border-b-2 border-slate-600' : ''}"
		   aria-current={$page.url.pathname === '/team' ? 'page' : undefined}>
			Our Team
		</a>
	</div>
	
	<!-- Mobile Menu Button -->
	<div class="lg:hidden flex items-center space-x-2">
		<button
			aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={isMenuOpen}
			aria-controls="mobile-menu"
			class="flex items-center p-4 focus:outline-none"
			onclick={toggleMenu}
		>
			<span class="mr-2 text-2xl">Menu</span>
			{#if isMenuOpen}
				<X class="w-6 h-6" aria-hidden="true" />
			{:else}
				<ChevronDown class="w-6 h-6" aria-hidden="true" />
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
	<div class="absolute top-20 left-0 w-full bg-white dark:bg-[#121212] text-gray-800 dark:text-gray-200 lg:hidden z-10 flex flex-col items-center space-y-4 py-6 shadow-lg"
	     id="mobile-menu"
	     role="navigation"
	     aria-label="Mobile menu">
		<a href="/course" 
		   class="hover:opacity-75 p-4 text-lg w-full text-center {$page.url.pathname === '/course' ? 'border-b-2 border-slate-600' : ''}" 
		   onclick={closeMenu}
		   aria-current={$page.url.pathname === '/course' ? 'page' : undefined}>
			Course
		</a>
		<a href="/rates" 
		   class="hover:opacity-75 p-4 text-lg w-full text-center {$page.url.pathname === '/rates' ? 'border-b-2 border-slate-600' : ''}" 
		   onclick={closeMenu}
		   aria-current={$page.url.pathname === '/rates' ? 'page' : undefined}>
			Rates
		</a>
		<a href="/events" 
		   class="hover:opacity-75 p-4 text-lg w-full text-center {$page.url.pathname === '/events' ? 'border-b-2 border-slate-600' : ''}" 
		   onclick={closeMenu}
		   aria-current={$page.url.pathname === '/events' ? 'page' : undefined}>
			Events
		</a>
		<a href="/membership" 
		   class="hover:opacity-75 p-4 text-lg w-full text-center {$page.url.pathname === '/membership' ? 'border-b-2 border-slate-600' : ''}" 
		   onclick={closeMenu}
		   aria-current={$page.url.pathname === '/membership' ? 'page' : undefined}>
			Membership
		</a>
		<a href="/team" 
		   class="hover:opacity-75 p-4 text-lg w-full text-center {$page.url.pathname === '/team' ? 'border-b-2 border-slate-600' : ''}" 
		   onclick={closeMenu}
		   aria-current={$page.url.pathname === '/team' ? 'page' : undefined}>
			Our Team
		</a>
	</div>
{/if}