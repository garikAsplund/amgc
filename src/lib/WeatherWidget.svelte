<script lang="ts">
	type WeatherData = {
		temp: number;
		emoji: string;
		loading: boolean;
	};
	
	// Use $props() for Svelte 5 props with default values
	let { weather = {
		temp: 0,
		emoji: '☀️',
		loading: true
	} } = $props<{ weather?: WeatherData }>();
	</script>
	
	<a
		href="https://www.google.com/search?q=enterprise+or+weather"
		target="_blank"
		rel="noopener"
		class="hover:opacity-75"
	>
		<div class="flex items-center gap-2 p-2">
			{#if weather.loading === false}
				<span class="text-2xl">{weather.emoji}</span>
				<span class="opacity-80">{weather.temp}°</span>
			{/if}
		</div>
	</a>