<script lang="ts">
	import Footer from '$lib/Footer.svelte';
	import Nav from '$lib/Nav.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div class="w-full h-full flex flex-col min-h-screen">

<Nav />
<div class="flex-grow relative w-full instet-0 overflow-hidden">
{@render children()}
</div>
<Footer />

</div>