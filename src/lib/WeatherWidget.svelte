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

	const LATITUDE = '45.43';
	const LONGITUDE = '-117.28';
	const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

	const weatherEmojis = {
		'01d': '☀️', // clear sky day
		'01n': '🌙', // clear sky night
		'02d': '⛅', // few clouds day
		'02n': '☁️', // few clouds night
		'03d': '☁️', // scattered clouds day
		'03n': '☁️', // scattered clouds night
		'04d': '☁️', // broken clouds day
		'04n': '☁️', // broken clouds night
		'09d': '🌧️', // shower rain day
		'09n': '🌧️', // shower rain night
		'10d': '🌦️', // rain day
		'10n': '🌧️', // rain night
		'11d': '⛈️', // thunderstorm day
		'11n': '⛈️', // thunderstorm night
		'13d': '❄️', // snow day
		'13n': '❄️', // snow night
		'50d': '🌁', // misty day
		'50n': '🌁' // misty night
	};

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
	href="https://www.google.com/search?q=enterprise+or+weather&sourceid=chrome&ie=UTF-8"
	target="_blank"
	rel="noopener"
	class="hover:opacity-75"
>
	<div class="flex items-center gap-2 p-2">
		{#if weather.loading === false}
			<span className="text-2xl">{weatherEmojis[weather.icon]}</span>
		{/if}
		<span class="text-black opacity-80">{weather.temp}°</span>
	</div></a
>
