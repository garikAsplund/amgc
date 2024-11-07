<script lang="ts">
	import FacebookSvg from './svgs/FacebookSVG.svelte';
	import InstagramSvg from './svgs/InstagramSVG.svelte';
	import MapsSvg from './svgs/MapsSVG.svelte';
</script>

<div class="flex items-center justify-center space-x-4 ">
    <FacebookSvg />
    <InstagramSvg />
    <div class="hidden md:block"><MapsSvg /></div>
</div>