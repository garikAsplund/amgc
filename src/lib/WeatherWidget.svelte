<script lang="ts">
	type WeatherData = {
		temp: number;
		icon: string;
		loading: boolean;
	};

	let weather = $state<WeatherData>({
		temp: 0,
		icon: 'sunny',
		loading: true
	});

	const LATITUDE = '34.94';
	const LONGITUDE = '-119.80';
	const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

	$effect(() => {
		const fetchWeather = async () => {
			try {
				const response = await fetch(
					`https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=imperial`
				);
				const data = await response.json();

				weather = {
					temp: Math.round(data.main.temp),
					icon: data.weather[0].icon,
					loading: false
				};
			} catch (error) {
				console.error('Failed to fetch weather:', error);
				weather = {
					...weather,
					loading: true
				};
			}
		};

		fetchWeather();
	});
</script>

<a
	href="https://www.google.com/search?q=new+cuyama+weather&sourceid=chrome&ie=UTF-8"
	target="_blank"
	rel="noopener"
	class="hover:opacity-75"
>
	<div class="flex items-center gap-2 p-2">
		{#if weather.loading === false}
			<img
				src={`/weather/${weather.icon}@2x.png`}
				alt="Weather icon"
				class="w-8 h-8 -m-2 saturate-0"
			/>
			<span class="text-white opacity-80">{weather.temp}°</span>
		{/if}
	</div></a
>
