<script>
	import { Phone, Mail, MapPin, Clock } from 'lucide-svelte';
	import Socials from '$lib/Socials.svelte';
</script>

<footer class="relative bottom-0 mt-auto w-full border-t dark:border-gray-700 bg-slate-100 dark:bg-[#121212]">
	<div class="mx-auto max-w-6xl px-4 py-12">
		<div class="grid grid-cols-1 gap-12 pl-8 text-neutral-600 md:grid-cols-3 dark:text-neutral-400">

			<!-- Contact with integrated socials -->
			<div class="order-3 space-y-4 md:order-1">
				<h3 class="text-lg font-medium text-neutral-900 dark:text-neutral-300">Contact</h3>
				<div class="space-y-3">
					<a
						href="tel:541-426-3246"
						class="flex items-center gap-2 transition-colors hover:text-neutral-900 md:hidden dark:hover:text-neutral-300"
					>
						<Phone size={18} />
						<span>(541) 426-3246</span>
					</a>
					<div class="hidden items-center gap-2 transition-colors md:flex">
						<Phone size={18} />
						<span>(541) 426-3246</span>
					</div>
					<div class="flex items-center gap-2 transition-colors">
						<Mail size={18} />
						<span>golfalpinemeadows@gmail.com</span>
					</div>
					
					<!-- Social Media Icons (only visible on mobile) -->
					<div class="md:hidden pt-4 flex justify-center pr-8">
						<Socials />
					</div>
				</div>
			</div>
			
			<!-- Location -->
			<div class="order-2 space-y-4 md:order-2">
				<h3 class="text-lg font-medium text-neutral-900 dark:text-neutral-300">Location</h3>
				<a
					href="https://maps.google.com/?q=66098+Golf+Course+Rd+Enterprise+OR+97828"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-start gap-2 transition-colors hover:text-neutral-900 dark:hover:text-neutral-300"
				>
					<MapPin size={18} class="mt-1 flex-shrink-0" />
					<span>
						66098 Golf Course Rd<br />
						Enterprise, OR 97828
					</span>
				</a>
			</div>
			
			<!-- Hours -->
			<div class="order-1 space-y-4 md:order-3">
				<h3 class="text-lg font-medium text-neutral-900 dark:text-neutral-300">Hours</h3>
				<div class="flex items-start gap-2">
					<Clock size={18} class="mt-1 flex-shrink-0" />
					<div>
						<p>Open 7 days a week</p>
						<p>April 15th - October 15th</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</footer>