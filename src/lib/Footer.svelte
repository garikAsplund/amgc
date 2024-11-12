<script>
	import { Phone, Mail, MapPin, Map, Clock } from 'lucide-svelte';
	import Socials from '$lib/Socials.svelte';
	import LogoSvg from './svgs/LogoSVG.svelte';
	import LogoDark from './svgs/LogoDark.svelte';
</script>

<footer
	class="relative bottom-0 mt-auto w-full border-t bg-slate-100 dark:border-gray-700 dark:bg-[#121212]"
>
	<div class="mx-auto max-w-7xl px-4 py-12">
		<div
			class="grid grid-cols-1 justify-evenly gap-12 pl-8 text-neutral-600 md:grid-cols-3 lg:grid-cols-4 dark:text-neutral-400"
		>
			<!-- Logo -->
			<a href="/" aria-label="Return to homepage" class="hover:opacity-80 w-fit h-fit hidden lg:block">
				<div class="hidden pt-4 lg:block dark:hidden">
					<LogoSvg />
				</div>
				<div class="hidden pt-4 lg:dark:block">
					<LogoDark />
				</div>
			</a>
			<!-- Contact with integrated socials -->
			<div class="order-1 space-y-4">
				<h3 class="text-lg font-medium text-neutral-900 dark:text-neutral-300">Contact</h3>
				<div class="space-y-4">
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
					<div class="flex flex-shrink-0 items-center gap-2 transition-colors">
						<Mail size={18} class="mt-1 flex-shrink-0" />
						<span>golfalpinemeadows@gmail.com</span>
					</div>
				</div>
			</div>

			<!-- Location -->
			<!-- <div class="order-2 space-y-4 md:order-2">
				<h3 class="text-lg font-medium text-neutral-900 dark:text-neutral-300">Location</h3>
				
			</div> -->

			<!-- Hours -->
			<div class="order-2 space-y-4">
				<h3 class="text-lg font-medium text-neutral-900 dark:text-neutral-300">Hours</h3>
				<div class="flex flex-col items-start">
					<div class="flex gap-2">
						<Clock size={18} class="mt-1 flex-shrink-0" />
						<span>
							<p>Open 7 days a week</p>
							<p>April 15th - October 15th</p>
						</span>
					</div>
					<div class="pl-8 pt-4 text-center text-sm">
						<p>Apr-May: 9 a.m. - 6 p.m.</p>
						<p>Jun-Aug: 7 a.m. - 7 p.m.</p>
						<p>Sep-Oct: 8 a.m. - 6 p.m.</p>
					</div>
				</div>
			</div>

			<!-- Links -->
			<div class="order-3 w-fit space-y-4">
				<h3 class="text-lg font-medium text-neutral-900 dark:text-neutral-300">Links</h3>
				<div class="flex flex-col space-y-1">
					<a
						href="/course"
						class="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300"
						>Course</a
					>
					<a
						href="/rates"
						class="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300"
						>Rates</a
					>
					<a
						href="/events"
						class="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300"
						>Events</a
					>
					<a
						href="/tournaments"
						class="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300"
						>Tournaments</a
					>
					<a
						href="/membership"
						class="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300"
						>Membership</a
					>
					<a
						href="/team"
						class="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300"
						>Our Team</a
					>
				</div>
			</div>
		</div>
		<div class="pt-8 dark:text-neutral-300">
			<Socials />
		</div>
	</div>
</footer>
