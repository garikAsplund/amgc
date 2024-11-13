<script lang="ts">
	import LogoSvg from '$lib/svgs/LogoSVG.svelte';
	import LogoDark from '$lib/svgs/LogoDark.svelte';
	import WeatherWidget from '$lib/WeatherWidget.svelte';
	import { page } from '$app/stores';
	import { ChevronDown, X } from 'lucide-svelte';

	let isMenuOpen = $state(false);
	let lastScrollY = $state(0);
	let isNavbarVisible = $state(true);
	let hasScrolled = $state(false);
	let isNavigating = $state(false);

	$effect(() => {
		$page.url.pathname;
		isNavbarVisible = true;
		hasScrolled = false;
		isNavigating = true;
		setTimeout(() => {
			isNavigating = false;
		}, 0);
	});

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}

	function handleScroll(event: Event) {
		hasScrolled = true;
		const currentScrollY = window.scrollY;

		if (hasScrolled) {
			if (currentScrollY > lastScrollY && currentScrollY > 100) {
				isNavbarVisible = false;
			} else if (currentScrollY < lastScrollY || currentScrollY < 100) {
				isNavbarVisible = true;
			}
		}

		lastScrollY = currentScrollY;
	}
</script>

<svelte:window on:scroll={handleScroll} />

<div class="fixed left-0 right-0 top-0 -z-20 h-48 bg-white dark:bg-[#121212]"></div>

<nav
	class="sticky top-0 z-10 flex w-full flex-col {isNavbarVisible
		? 'translate-y-0'
		: '-translate-y-full'} bg-white py-4 font-serif font-light text-gray-800 {isNavigating
		? 'transition-none'
		: 'transition-transform duration-1000 ease-in-out'} md:px-8 dark:bg-[#121212] dark:text-gray-200"
	id="nav"
	aria-label="Main navigation"
>
	<div class="flex w-full items-center justify-between">
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
				href="/tournaments"
				class="p-4 hover:opacity-75 {$page.url.pathname === '/tournaments'
					? 'border-b-2 border-slate-600'
					: ''}"
				aria-current={$page.url.pathname === '/tournaments' ? 'page' : undefined}
			>
				Tournaments
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
		</div>
	</div>
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
				class="w-full p-4 text-center text-lg hover:opacity-75"
				onclick={closeMenu}
				aria-current={$page.url.pathname === '/course' ? 'page' : undefined}
			>
				<span
					class={$page.url.pathname === '/course' ? 'inline-block border-b-2 border-slate-600' : ''}
				>
					Course
				</span>
			</a>
			<a
				href="/rates"
				class="w-full p-4 text-center text-lg hover:opacity-75"
				onclick={closeMenu}
				aria-current={$page.url.pathname === '/rates' ? 'page' : undefined}
			>
				<span
					class={$page.url.pathname === '/rates' ? 'inline-block border-b-2 border-slate-600' : ''}
				>
					Rates
				</span>
			</a>
			<a
				href="/events"
				class="w-full p-4 text-center text-lg hover:opacity-75"
				onclick={closeMenu}
				aria-current={$page.url.pathname === '/events' ? 'page' : undefined}
			>
				<span
					class={$page.url.pathname === '/events' ? 'inline-block border-b-2 border-slate-600' : ''}
				>
					Events
				</span>
			</a>
			<a
				href="/tournaments"
				class="w-full p-4 text-center text-lg hover:opacity-75"
				onclick={closeMenu}
				aria-current={$page.url.pathname === '/tournaments' ? 'page' : undefined}
			>
				<span
					class={$page.url.pathname === '/tournaments'
						? 'inline-block border-b-2 border-slate-600'
						: ''}
				>
					Tournaments
				</span>
			</a>
			<a
				href="/membership"
				class="w-full p-4 text-center text-lg hover:opacity-75"
				onclick={closeMenu}
				aria-current={$page.url.pathname === '/membership' ? 'page' : undefined}
			>
				<span
					class={$page.url.pathname === '/membership'
						? 'inline-block border-b-2 border-slate-600'
						: ''}
				>
					Membership
				</span>
			</a>
			<a
				href="/team"
				class="w-full p-4 text-center text-lg hover:opacity-75"
				onclick={closeMenu}
				aria-current={$page.url.pathname === '/team' ? 'page' : undefined}
			>
				<span
					class={$page.url.pathname === '/team' ? 'inline-block border-b-2 border-slate-600' : ''}
				>
					Our Team
				</span>
			</a>
		</div>
	{/if}
</nav>
