<script lang="ts">
	import Footer from '$lib/Footer.svelte';
	import Nav from '$lib/Nav.svelte';
	import '../app.css';
	import { page } from '$app/state';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children } = $props();
</script>

<div class="flex h-full min-h-screen w-full flex-col">
	<Nav />
	<div
		class="relative inset-0 w-full flex-grow overflow-hidden overflow-x-hidden
		{page.url.pathname === '/' ? '' : 'dark:bg-[#121212]'}"
	>
		<!-- Wrapper for children to ensure they stay within viewport on mobile -->
		<div class="h-full w-full overflow-hidden">
			{@render children()}
		</div>
	</div>
	<Footer />
</div>
