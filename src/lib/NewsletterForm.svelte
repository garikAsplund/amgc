<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_RECAPTCHA_SITE_KEY } from '$env/static/public';

	onMount(() => {
		const script = document.createElement('script');
		script.src = `https://www.google.com/recaptcha/enterprise.js?render=${PUBLIC_RECAPTCHA_SITE_KEY}`;
		script.async = true;
		script.defer = true;
		script.onload = setup;
		document.head.appendChild(script);
	});

	function setup() {
		const form = document.getElementById('captchaForm');

		form?.addEventListener('submit', async (e) => {
			e.preventDefault();
			const token = await grecaptcha.enterprise.execute(PUBLIC_RECAPTCHA_SITE_KEY, {
				action: 'submit'
			});
			console.log('token before send:', token);
			const hidden = document.getElementById('recaptcha-field') as HTMLInputElement;
			hidden.value = token;
			form.submit(); // plain HTML submit
		});
	}
</script>

<form id="captchaForm" method="POST">
	<input type="hidden" name="g-recaptcha-response" id="recaptcha-field" />
	<input name="email" type="email" required placeholder="email" />
	<button type="submit">Send</button>
</form>
