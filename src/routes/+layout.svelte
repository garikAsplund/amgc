<script lang="ts">
	import Footer from '$lib/Footer.svelte';
	import Nav from '$lib/Nav.svelte';
	import '../app.css';
	import { page } from '$app/stores';

	let { children } = $props();
</script>

<div class="flex h-full min-h-screen w-full flex-col">
	<Nav />
	<div class="instet-0 relative w-full flex-grow overflow-hidden {$page.url.pathname === '/' ? '' : 'dark:bg-[#121212]'}">
		{@render children()}
	</div>
	<Footer />
</div>
