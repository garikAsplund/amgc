<script lang="ts">
	interface BoardMember {
		position: string;
		name: string;
	}

	const executiveBoard: BoardMember[] = [
		{ position: 'President', name: 'Ryan Dragoo' },
		{ position: 'Vice President', name: 'Joshua Nash' }
	];

	const boardMembers: string[] = [
		'Bill Williams',
		'Brad Stephens',
		'Donna McCadden',
		'Curtis Martin',
		'Marc Christman'
	];

	const staff: BoardMember[] = [
		{ position: 'Golf Course Superintendent', name: 'Greg Oveson' },
		{ position: 'Secretary', name: 'Beth Hough' },
		{ position: 'Clubhouse Manager/Head Golf Professional', name: 'Scott Marcum' }
	];
</script>

<section class="h-full w-full p-8">
	<div class="mx-auto max-w-md space-y-8">
		<h2 class="text-center font-serif text-2xl dark:text-gray-200">Board & Staff</h2>

		<!-- Executive Board -->
		<div class="space-y-3">
			<h3
				class="border-b border-neutral-300 pb-1 text-lg font-medium dark:border-neutral-600 dark:text-gray-300"
			>
				Executive Board
			</h3>
			<div class="grid gap-2">
				{#each executiveBoard as { position, name }}
					<div class="flex items-center justify-between">
						<span class="font-medium dark:text-gray-100">{name}</span>
						<span class="text-sm text-neutral-600 dark:text-gray-400">{position}</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- Board Members -->
		<div class="space-y-3">
			<h3
				class="border-b border-neutral-300 pb-1 text-lg font-medium dark:border-neutral-600 dark:text-gray-300"
			>
				Board Members
			</h3>
			<div class="grid gap-2">
				{#each boardMembers as name}
					<div class="font-medium dark:text-gray-100">{name}</div>
				{/each}
			</div>
		</div>

		<!-- Staff -->
		<div class="space-y-3">
			<h3
				class="border-b border-neutral-300 pb-1 text-lg font-medium dark:border-neutral-600 dark:text-gray-300"
			>
				Staff
			</h3>
			<div class="grid gap-2">
				{#each staff as { position, name }}
					<div class="flex items-center justify-between">
						<span class="font-medium dark:text-gray-100">{name}</span>
						<span class="text-sm text-neutral-600 dark:text-gray-400">{position}</span>
					</div>
				{/each}
			</div>
		</div>
		<div class="mt-16 flex w-full justify-center">
			<a href="/bylaws/2025.pdf" target="_blank" rel="noopener noreferrer" class=" dark:text-gray-300 underline underline-offset-4 hover:opacity-75 transition-all duration-300">Read our bylaws</a>
		</div>
	</div>
</section>
