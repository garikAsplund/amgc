<script>
	const tournaments = [
		{
			month: 'June',
			events: [
				{
					date: 'Saturday, June 8th',
					name: 'Ron Layton Memorial Scramble',
					time: '9:00 a.m. shotgun start',
					price: '$75.00 per person',
					details: 'Registration Deadline is 6:00 p.m. June 7th'
				},
				{
					date: 'Saturday, June 22',
					name: 'AMGC Triple Six Tournament',
					details: '2 Person team: 6 holes Best Ball, 6 holes Scramble, 6 holes Chapman'
				}
			]
		},
		{
			month: 'July',
			events: [
				{
					date: 'Monday, July 15',
					name: 'Eastside Seniors Golf Association Tournament'
				},
				{
					date: 'Saturday, July 20th',
					name: 'Two-Person Best Ball Tournament',
					time: '8:30 a.m. shotgun start',
					price: '$60/per team',
					details: '$20 optional deuce, KP,s, & skins pot'
				},
				{
					date: 'Friday July 26th',
					name: 'Helping Hearts Tournament',
					time: '9:00 a.m. shotgun start',
					price: '$85/Person',
					details: '4-person Scramble'
				}
			]
		},
		{
			month: 'August',
			events: [
				{
					date: 'Tuesday, August 6th',
					name: "Gail Beck Ladies' Invitational",
					time: '9:00 a.m. shotgun start'
				},
				{
					date: 'Saturday, August 10th',
					name: 'JAIP Tournament'
				},
				{
					date: 'Saturday/Sunday, August 31st & September 1st',
					name: 'Rat Race'
				}
			]
		},
		{
			month: 'September',
			events: [
				{
					date: 'Saturday, September 14th',
					name: 'Lions Golf Tournament',
					time: '9:00 a.m. shotgun start'
				}
			]
		},
		{
			month: 'October',
			events: [
				{
					date: 'Monday, October 14th',
					name: 'Firefighters Tournament',
					time: '10:30 a.m. shotgun start'
				}
			]
		}
	];
</script>

<div class="mx-auto max-w-2xl px-4 py-8">
	<h1 class="mb-8 text-3xl font-bold text-center dark:text-gray-300">2024 Tournaments</h1>

	<div class="mb-8 border-l-4 border-red-500 bg-red-100 p-4">
		<p class="mt-2 font-bold">GOLF COURSE IS CLOSED TO OPEN PLAY ON DAYS OF TOURNAMENTS.</p>
	</div>

	{#each tournaments as month}
		<div class="mb-12">
			<h2 class="mb-4 text-2xl font-semibold  dark:text-gray-300">{month.month}</h2>
			<div class="space-y-6">
				{#each month.events as event}
					<div class="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
						<div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
							<div>
								<h3 class="text-xl font-bold text-gray-900">{event.name}</h3>
								<p class="mt-1 font-semibold text-gray-600">{event.date}</p>
								{#if event.time}
									<p class="mt-1 text-gray-600">{event.time}</p>
								{/if}
								{#if event.price}
									<p class="mt-1 text-gray-700">{event.price}</p>
								{/if}
								{#if event.details}
									<p class="mt-2 text-gray-600">{event.details}</p>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	/* Add any additional custom styles here */
</style>
