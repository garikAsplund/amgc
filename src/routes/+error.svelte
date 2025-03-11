<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="relative flex h-full w-full flex-col items-center justify-center space-y-8">
	<h1 class="mt-16 text-3xl text-black/70 dark:text-gray-400">
		{page.status}: {page.error?.message}
	</h1>
    <a href="/" aria-label="Return home" class="hover:underline hover:underline-offset-4 dark:text-gray-300">Return home</a>
	<enhanced:img src="/static/404.jpg" class="mb-16 max-w-4xl" alt="Page not found" />
</div>
