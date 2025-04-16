<script>
    import { tournaments } from "$lib/tournaments";
</script>

<section class="w-full h-full p-8">
	<div class="max-w-2xl mx-auto space-y-8">
		<h2 class="text-3xl font-serif text-center dark:text-gray-200">2024 Tournaments</h2>

		<!-- <div class="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 p-4">
			<p class="font-medium dark:text-gray-200">GOLF COURSE IS CLOSED TO OPEN PLAY ON DAYS OF TOURNAMENTS.</p>
		</div> -->

		{#each tournaments as month}
			<div class="space-y-6">
				<h3 class="text-2xl font-medium border-b pb-1 dark:text-gray-300 border-neutral-300 dark:border-neutral-600">
					{month.month}
				</h3>
				
				<div class="space-y-4">
					{#each month.events as event}
						<div class="rounded-lg bg-white dark:bg-gray-800/50 p-6 shadow-md transition-shadow hover:shadow-lg">
							<div class="space-y-2">
								<h4 class="text-lg font-medium dark:text-gray-100">{event.name}</h4>
								<p class="font-medium text-neutral-600 dark:text-gray-400">{event.date}</p>
								
								{#if event.time}
									<p class="text-neutral-600 dark:text-gray-400">{event.time}</p>
								{/if}
								
								{#if event.price}
									<p class="text-neutral-700 dark:text-gray-300">{event.price}</p>
								{/if}
								
								{#if event.details}
									<p class="text-neutral-600 dark:text-gray-400 mt-2 text-sm">{event.details}</p>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>

