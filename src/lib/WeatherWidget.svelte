<script lang="ts">
	import { page } from '$app/stores';

	const weatherEmojis = {
		'01d': '☀️',
		'01n': '🌙',
		'02d': '⛅',
		'02n': '☁️',
		'03d': '☁️',
		'03n': '☁️',
		'04d': '☁️',
		'04n': '☁️',
		'09d': '🌧️',
		'09n': '🌧️',
		'10d': '🌦️',
		'10n': '🌧️',
		'11d': '⛈️',
		'11n': '⛈️',
		'13d': '❄️',
		'13n': '❄️',
		'50d': '🌁',
		'50n': '🌁'
	};
</script>

<a
	href="https://www.google.com/search?q=enterprise+or+weather&sourceid=chrome&ie=UTF-8"
	target="_blank"
	rel="noopener"
	class="flex items-center gap-2 p-2 hover:opacity-75"
>
	{#if $page.data.weather}
		<span class="text-2xl">{weatherEmojis[$page.data.weather.icon]}</span>
		<span class=" opacity-80">{$page.data.weather.temp}°</span>
	{/if}
</a>
