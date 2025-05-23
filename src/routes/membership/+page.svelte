<script lang="ts">
	import { loadStripe } from '@stripe/stripe-js';
	import { enhance } from '$app/forms';

	let selectedMembership = $state<string | null>(null); // `null` by default
	let personalDonation = $state<number>(0);
	let handicapQty = $state<number>(0);
	let isSubmitting: boolean = $state(false);

	const membershipOptions = [
		{
			value: 'family',
			label: 'Family',
			description:
				'One or two adults and their dependent children ages 22 or younger who are living at home or are full-time students.',
			fee: 798
		},
		{
			value: 'new-family',
			label: 'New Family',
			description:
				'A Family who has not been a member of Alpine Meadows Golf Club for the past two consecutive years.',
			fee: 677
		},
		{
			value: 'single',
			label: 'Single',
			description:
				'A single individual age 18 or older who does not qualify for a Student Membership',
			fee: 567
		},
		{
			value: 'new-single',
			label: 'New Single',
			description:
				'An Individual who has not been a member of Alpine Meadows Golf Club for the past two consecutive years.',
			fee: 464
		},
		{
			value: 'student',
			label: 'Student',
			description:
				'A full-time student 14 and up to 22 years of age with Student I.D., and a resident of Wallowa County.',
			fee: 103
		},
		{
			value: 'youth',
			label: 'Youth',
			description: 'A youth who is 13 years and younger and a resident of Wallowa County.',
			fee: 52
		}
	];

	const additionalOptions = [
		{
			label: 'Handicap Fee',
			alt: '$46 per person',
			type: 'quantity',
			fee: 46,
			onIncrement: () => {
				if (handicapQty < 10) {
					handicapQty++;
					additionalFee += 46;
				}
			},
			onDecrement: () => {
				if (handicapQty > 0) {
					handicapQty = Math.max(0, handicapQty - 1);
					additionalFee > 0 ? (additionalFee -= 46) : 0;
				}
			}
		},
		{
			label: 'Range Balls',
			alt: 'Family',
			type: 'toggle',
			fee: 206
		},
		{
			label: 'Range Balls',
			alt: 'Individual',
			type: 'toggle',
			fee: 155
		},
		{
			label: 'Cart Shed Rental',
			alt: 'Member',
			type: 'toggle',
			fee: 309
		},
		{
			label: 'Cart Shed Rental',
			alt: 'Non-Member',
			type: 'toggle',
			fee: 515
		},
		{
			label: 'Trail Fee Only',
			type: 'toggle',
			fee: 155
		}
	];

	const selectedOptions = $state<boolean[]>(new Array(additionalOptions.length).fill(false));

	const donation = {
		label: 'Personal Donation',
		type: 'input',
		onInput: (e) => {
			personalDonation = Number(e.target.value);
		}
	};

	let membershipFee = $derived(
		membershipOptions.find((option) => option.value === selectedMembership)?.fee || 0
	);

	let additionalFee = $state<number>(0);

	let totalFee = $derived<number>(membershipFee + additionalFee + personalDonation);

	let isSubmitDisabled = $derived<boolean>(totalFee === 0);

	async function onclick() {
		try {
			isSubmitting = true;

			const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

			const cartData = {
				selectedMembership,
				membershipOptions,
				selectedOptions,
				additionalOptions,
				personalDonation,
				handicapQty
			};

			const response = await fetch('api/checkout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(cartData)
			});

			const { sessionId } = await response.json();

			await stripe?.redirectToCheckout({ sessionId });
		} catch (error) {
			console.error('Error submitting form:', error);
			isSubmitting = false;
		}
	}
</script>

<!-- <button {onclick}>Buy Single Membership</button> -->

<form method="POST" use:enhance={onclick} class="mx-auto max-w-3xl py-8 px-8">
	<h2 class="mb-8 text-center text-2xl font-bold dark:text-gray-300">
		Alpine Meadows Golf Association Memberships
	</h2>

	<div class="mb-8">
		<p class="mb-4 text-center font-bold dark:text-gray-400">Select Membership Type:</p>
		<div class="flex justify-center">
			<div class="grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{#each membershipOptions as option}
					<label
						for={option.value}
						class="flex cursor-pointer items-start justify-between rounded-md border border-gray-300 px-4 py-2 {selectedMembership ===
						option.value
							? 'bg-green-800 text-white hover:bg-green-900 dark:bg-gray-500 dark:hover:bg-gray-400'
							: 'hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800'}"
					>
						<div>
							<div class="flex w-full items-center">
								<h3 class="font-medium">{option.label}</h3>
								<span
									class="{selectedMembership === option.value
										? 'text-gray-200'
										: 'text-gray-400'} pl-2 pt-0.5 text-sm">${option.fee}</span
								>
							</div>
							<p
								class="pl-2 pt-1 text-sm {selectedMembership === option.value
									? 'text-gray-200'
									: 'text-gray-600 dark:text-gray-400'}"
							>
								{option.description}
							</p>
						</div>
						<input
							type="checkbox"
							id={option.value}
							name="membership-type"
							checked={selectedMembership === option.value}
							onchange={() => {
								selectedMembership = selectedMembership === option.value ? null : option.value;
							}}
							class="hidden"
						/>
					</label>
				{/each}
			</div>
		</div>
	</div>

	<div class="mb-4">
		<div class="mb-4 flex flex-col items-center">
			<p class="mb-2 text-center font-bold dark:text-gray-400">Additional Options:</p>
			<div class="flex justify-center">
				<div class="grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{#each additionalOptions as option, index}
						{#if option.type === 'quantity'}
							<!-- Quantity Selector -->
							<div
								class="flex items-start justify-between rounded-md border {handicapQty > 0
									? 'border-2 border-green-800 dark:border-green-400'
									: 'border-gray-300'} bg-white px-4 py-2 dark:bg-gray-900 dark:text-gray-300"
							>
								<div>
									<h3 class="font-medium">{option.label}</h3>
									<p class="pl-2 text-sm font-light text-gray-400">{option.alt}</p>
									<div class="flex justify-end">
										<div class="mt-2 flex items-center">
											<button
												type="button"
												class="h-6 w-6 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
												onclick={option.onDecrement}
											>
												-
											</button>
											<span class="mx-3">{handicapQty}</span>
											<button
												type="button"
												class="h-6 w-6 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
												onclick={option.onIncrement}
											>
												+
											</button>
										</div>
									</div>
								</div>
								<p class="text-sm font-light text-gray-400">
									${handicapQty * option.fee}
								</p>
							</div>
						{:else if option.type === 'toggle'}
							<!-- Toggle Button (Custom Toggle) -->
							<div class="flex justify-center">
								<input
									type="checkbox"
									id="option-{index}"
									checked={selectedOptions[index]}
									class="hidden"
									onchange={() => {
										selectedOptions[index] = !selectedOptions[index];
										if (selectedOptions[index]) {
											additionalFee += option.fee;
										} else {
											additionalFee -= option.fee;
										}
									}}
								/>
								<label
									for="option-{index}"
									class="flex w-full cursor-pointer items-start justify-between rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-100 {selectedOptions[
										index
									]
										? 'bg-green-800 text-white hover:bg-green-900 dark:bg-gray-500  dark:hover:bg-gray-400'
										: 'bg-white hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800'}"
								>
									<div>
										<h3 class="pr-4 font-medium">{option.label}</h3>
										<p
											class="pl-2 text-sm font-light {selectedOptions[index]
												? 'text-gray-200'
												: 'text-gray-400'}"
										>
											{option.alt}
										</p>
									</div>
									<span
										class="{selectedOptions[index]
											? 'text-gray-200'
											: 'text-gray-400'} pt-1 text-sm font-light">${option.fee}</span
									>
								</label>
							</div>
						{/if}
					{/each}
				</div>
			</div>

			<!-- Input Field -->
			<div
				class="my-8 w-fit rounded-md border border-gray-300 {personalDonation === 0
					? ''
					: 'border-2 border-green-800 dark:border-green-400'} bg-white px-4 py-2 dark:bg-gray-900"
			>
				<label for="personal-donation" class="pr-4 font-medium dark:text-gray-300"
					>{donation.label}</label
				>
				<div
					class="relative inline-flex items-center before:absolute before:left-2 before:text-gray-500 before:content-['$']"
				>
					<input
						type="text"
						id="personal-donation"
						name="personal-donation"
						bind:value={donation.value}
						oninput={(event) => {
							event.target.value = event.target.value.replace(/\D/g, '');
							donation.onInput(event);
						}}
						maxlength="4"
						class="w-20 rounded-md border py-1 pl-6 pr-2 text-right placeholder-gray-400 focus:border-2 focus:border-green-700 focus:outline-none dark:bg-gray-800 dark:text-gray-300 dark:focus:border-green-400"
						placeholder="0"
						inputmode="numeric"
					/>
				</div>
			</div>
		</div>

		<div class="flex justify-end pt-4 dark:text-gray-300">
			<div class="mb-4 w-full max-w-xs">
				<div class="mb-2 flex justify-between">
					<p class="font-light">Memberships:</p>
					<p class="font-light">${membershipFee.toFixed(2)}</p>
				</div>
				<div class="mb-2 flex justify-between">
					<p class="font-light">Additional options:</p>
					<p class="font-light">${(totalFee - membershipFee).toFixed(2)}</p>
				</div>
				<hr class="pb-2" />
				<div class="mb-2 flex justify-between">
					<p class="font-medium">Total Fee:</p>
					<p class="font-medium">${totalFee.toFixed(2)}</p>
				</div>
			</div>
		</div>

		<button
			type="submit"
			{onclick}
			disabled={isSubmitDisabled || isSubmitting}
			class="w-full rounded-md bg-green-700 dark:bg-green-700/80 px-4 py-3 font-medium text-white shadow-lg transition-all hover:bg-green-600 dark:hover:bg-green-600/40 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none dark:disabled:bg-gray-600"
		>
			{isSubmitting ? 'Please wait...' : 'Pay Now'}
		</button>
	</div>
</form>
