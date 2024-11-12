import { superValidate, message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { schema } from '$lib/schema';

const CACHE_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds
let cachedWeatherData: any = null;
let lastFetched = 0;

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(schema));
	const now = Date.now();
  
  if (cachedWeatherData && (now - lastFetched) < CACHE_TIME) {
    return { weather: cachedWeatherData, form };
  }

  const LATITUDE = '45.43';
  const LONGITUDE = '-117.28';
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=imperial`
    );
	  const data = await response.json();

    cachedWeatherData = {
      temp: Math.round(data.main.temp),
      icon: data.weather[0].icon
    };
    lastFetched = now;

    return { weather: cachedWeatherData, form };
  } catch (error) {
    console.error('Failed to fetch weather:', error);
    return { weather: null, form };
  }
};

export const actions = {
    default: async ({ request, fetch }) => {
		const form = await superValidate(request, zod(schema));
		console.log(form);

		if (!form.valid) {
			return fail(400, { form });
		} else {
			const response = await fetch('/api/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(form)
			});

			if (response.ok) {
				return message(form, 'Email sent successfully');
			} else {
				const errorData = await response.json();
				return message(form, `Error sending email: ${errorData.error}`);
			}
		}
	}
} satisfies Actions;