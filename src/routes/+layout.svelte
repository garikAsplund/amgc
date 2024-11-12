<script lang="ts">
	import Footer from '$lib/Footer.svelte';
	import Nav from '$lib/Nav.svelte';
	import '../app.css';
	import { page } from '$app/stores';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	let { children } = $props();
</script>

<div class="flex h-full min-h-screen w-full flex-col ">
	<Nav />
	<div
		class="inset-0 relative w-full flex-grow overflow-hidden overflow-x-hidden
		{$page.url.pathname === '/' ? '' : 'dark:bg-[#121212]'}"
	>
		<!-- Wrapper for children to ensure they stay within viewport on mobile -->
		<div class="w-full h-full overflow-hidden">
			{@render children()}
		</div>
	</div>
	<Footer />
</div>
