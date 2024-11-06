<script lang="ts">
	const weeklyEvents = [
		{ day: 'Tuesday', event: "Ladies' Day" },
		{ day: 'Wednesday', event: '$10 Open Skins Night', time: '5:00 pm' }
	];

    const stats = [
    { label: "Season", value: "April 15 - October 15", isWide: true },
    { label: "Holes", value: "9" },
    { label: "Par", value: "72" },
    { label: "Area", value: "43 acres" }
  ];
</script>

<article class="mx-auto max-w-4xl space-y-16 px-4 py-12">
	<!-- Introduction -->
	<section>
		<h1 class="mb-6 text-3xl font-bold">Alpine Meadows Golf Course</h1>
		<p class="mb-8 text-lg text-gray-700">
			Nestled in Enterprise, Oregon, Alpine Meadows offers a scenic 9-hole course where Trout Creek
			meanders through challenging fairways. Perfect for both competitive players and those seeking
			a leisurely round.
		</p>

        <enhanced:img src="/static/pano.jpg" alt="Scorecard front" class="w-full mb-8" />

		<div class="mb-8 grid gap-6" style="grid-template-columns: 2fr repeat(3, 1fr)">
            {#each stats as { label, value, isWide }}
              <div class="rounded-lg bg-gray-50 p-4">
                <div class="text-sm text-gray-600">{label}</div>
                <div class="text-xl font-semibold">
                  {value}
                </div>
              </div>
            {/each}
          </div>
	</section>

	<div class="mb-8 grid gap-6 md:grid-cols-2">
		<enhanced:img src="/static/scorecard-front.gif" alt="Scorecard front" class="w-full" />
		<enhanced:img src="/static/scorecard-back.gif" alt="Scorecard back" class="w-full" />
	</div>

	<!-- Weekly Events -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Weekly Events</h2>
		<div class="space-y-2">
			{#each weeklyEvents as { day, event, time }}
				<div class="flex items-center gap-4">
					<span class="w-24 font-medium">{day}</span>
					<span>{event} {time ? `at ${time}` : ''}</span>
				</div>
			{/each}
		</div>
		<p class="mt-2 text-sm text-gray-600">Course remains open to the public during events</p>
	</section>

	<!-- History -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">A Rich History</h2>
		<div class="space-y-6">
			<p class="text-gray-700">
				Founded in 1917 by Enterprise Country Club members, our course began as a 43-acre vision to
				bring golf to Wallowa County. In a time when golf was expanding beyond its exclusive roots,
				local pioneers established the club with $5,000 in capital stock, offering shares at $25
				each. The investment by early community members helped transform this "ideal" golfing terrain into the course we
				know today.
			</p>
			<div class="rounded-lg bg-blue-50 p-6">
				<h3 class="mb-2 text-xl font-medium">The Midnight Bomber Landing</h3>
				<p class="text-gray-700">
					On a foggy night in 1944, our course became an impromptu airfield when a B-24 Liberator
					bomber lost its way during a training mission from Walla Walla. With their radio dead and
					visibility near zero, the crew of ten found themselves circling the unfamiliar Wallowa
					Valley. The community rallied together, with hundreds of cars lining up along the course
					to create a makeshift runway with their headlights. At 1:00 AM, the pilot successfully
					landed the massive four-engine bomber in what locals called a "miraculous landing" through
					the narrow gorge. The crew emerged unharmed, and weeks later, the bomber successfully took
					off from the same field. We commemorate this remarkable event with our annual Bomber
					Tournament, established in 2016.
				</p>
			</div>
		</div>
	</section>

	<!-- Facilities -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Practice Facilities</h2>
		<ul class="list-inside list-disc space-y-2 text-gray-700">
			<li>Driving Range</li>
			<li>Putting Green</li>
			<li>Chipping Area</li>
			<li>Clubhouse Bar</li>
		</ul>
	</section>
</article>
