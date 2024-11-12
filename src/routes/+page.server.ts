import { superValidate, message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { schema } from '$lib/schema';

// Move interface definitions to the top
interface WeatherData {
  temp: number;
  emoji: string;
  loading: boolean;
}

interface WeatherCache {
  data: WeatherData;
  timestamp: number;
}

// Define types for locals
declare module '@sveltejs/kit' {
  interface Locals {
    weatherCache?: WeatherCache;
  }
}

const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

const defaultWeather: WeatherData = {
  temp: 0,
  emoji: '☀️',
  loading: true,
};

const weatherEmojis: Record<string, string> = {
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

async function fetchWeatherData(): Promise<WeatherData> {
  const LATITUDE = '45.43';
  const LONGITUDE = '-117.28';
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  if (!API_KEY) {
    console.error('Weather API key is not defined');
    return defaultWeather;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=imperial`,
      { cache: 'no-store' }  // Ensure fresh data
    );

    if (!response.ok) {
      throw new Error(`Weather API returned ${response.status}`);
    }

    const data = await response.json();
    
    return {
      temp: Math.round(data.main.temp),
      emoji: weatherEmojis[data.weather[0].icon] || '❓',
      loading: false
    };
  } catch (error) {
    console.error('Failed to fetch weather:', error);
    return {
      temp: 0,
      emoji: '❌',
      loading: false
    };
  }
}

export const load = (async ({ locals }) => {
  try {
    const form = await superValidate(zod(schema));
    
    // Check cache
	const cachedWeather = locals.weatherCache as WeatherCache | undefined;
    if (cachedWeather && Date.now() - cachedWeather.timestamp < CACHE_DURATION) {
		console.log('Returning cached weather:', cachedWeather.data);
		return {
			weather: cachedWeather.data
		};
	}

	console.log('Cache miss or expired, fetching fresh data...');
	const weather = await fetchWeatherData();
	
	// Cache the new weather data
	locals.weatherCache = {
		data: weather,
		timestamp: Date.now()
	};

	console.log('Returning fresh weather data:', weather);

    return {
      weather,
      form
    };
  } catch (error) {
    console.error('Error in load function:', error);
    return {
      weather: defaultWeather,
      form: await superValidate(zod(schema))
    };
  }
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request, fetch }) => {
    const form = await superValidate(request, zod(schema));
    
    if (!form.valid) {
      return fail(400, { form });
    }
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form.data)  // Use form.data instead of form
      });

      if (!response.ok) {
        const errorData = await response.json();
        return message(form, `Error sending email: ${errorData.error}`);
      }

      return message(form, 'Email sent successfully');
    } catch (error) {
      return message(form, `Error sending email: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
} satisfies Actions;