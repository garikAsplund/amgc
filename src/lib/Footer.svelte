<script>
	import { Phone, Mail, MapPin, Clock } from 'lucide-svelte';
</script>

<footer class="border-t bg-slate-100 bottom-0 mt-auto relative w-full">
	<div class="mx-auto max-w-6xl px-4 py-12">
		<div class="grid grid-cols-1 gap-12 text-neutral-600 md:grid-cols-3 pl-8">
			<!-- Contact -->
			<div class="space-y-4 order-3 md:order-1">
				<h3 class="text-lg font-medium text-neutral-900">Contact</h3>
				<div class="space-y-3">
					<a
						href="tel:541-426-3246"
						class="flex items-center gap-2 transition-colors hover:text-neutral-900 md:hidden"
					>
						<Phone size={18} />
						<span>(541) 426-3246</span>
					</a>
					<div class="hidden items-center gap-2 transition-colors hover:text-neutral-900 md:flex">
						<Phone size={18} />
						<span>(541) 426-3246</span>
					</div>

					<Mail size={18} />
					<span>golfalpinemeadows@gmail.com</span>
				</div>
			</div>

			<!-- Location -->
			<div class="space-y-4 order-2 md:order-2">
				<h3 class="text-lg font-medium text-neutral-900">Location</h3>
				<a
					href="https://maps.google.com/?q=66098+Golf+Course+Rd+Enterprise+OR+97828"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-start gap-2 transition-colors hover:text-neutral-900"
				>
					<MapPin size={18} class="mt-1 flex-shrink-0" />
					<span>
						66098 Golf Course Rd<br />
						Enterprise, OR 97828
					</span>
				</a>
			</div>

			<!-- Hours -->
			<div class="space-y-4 order-1 md:order-3">
				<h3 class="text-lg font-medium text-neutral-900">Hours</h3>
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
