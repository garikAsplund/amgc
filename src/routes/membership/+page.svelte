<script lang="ts">
	import { loadStripe } from '@stripe/stripe-js';
	import { enhance } from '$app/forms';

	let selectedMembership = $state<string | null>(null); // `null` by default
	let personalDonation = $state<number>(0);
	let handicapQty = $state<number>(0);

	const membershipOptions = [
		{
			value: 'family',
			label: 'Family',
			description:
				'One or two adults and their dependent children ages 22 or younger who are living at home or are full-time students.',
			fee: 775
		},
		{
			value: 'new-family',
			label: 'New Family',
			description:
				'A Family who has not been a member of Alpine Meadows Golf Club for the past two consecutive years.',
			fee: 675
		},
		{
			value: 'single',
			label: 'Single',
			description:
				'A single individual age 18 or older who does not qualify for a Student Membership',
			fee: 550
		},
		{
			value: 'new-single',
			label: 'New Single',
			description:
				'An Individual who has not been a member of Alpine Meadows Golf Club for the past two consecutive years.',
			fee: 450
		},
		{
			value: 'student',
			label: 'Student',
			description:
				'A full-time student 14 and up to 22 years of age with Student I.D., and a resident of Wallowa County.',
			fee: 100
		},
		{
			value: 'youth',
			label: 'Youth',
			description: 'A youth who is 13 years and younger and a resident of Wallowa County.',
			fee: 50
		}
	];

	const additionalOptions = [
		{
			label: 'Handicap Fee',
			alt: '$45 per person',
			type: 'quantity',
			fee: 45,
			onIncrement: () => {
				if (handicapQty < 10) {
					handicapQty++;
					additionalFee += 45;
				}
			},
			onDecrement: () => {
				if (handicapQty > 0) {
					handicapQty = Math.max(0, handicapQty - 1);
					additionalFee > 0 ? (additionalFee -= 45) : 0;
				}
			}
		},
		{
			label: 'Range Balls',
			alt: 'Family',
			type: 'toggle',
			fee: 200
		},
		{
			label: 'Range Balls',
			alt: 'Individual',
			type: 'toggle',
			fee: 150
		},
		{
			label: 'Cart Shed Rental',
			alt: 'Member',
			type: 'toggle',
			fee: 300
		},
		{
			label: 'Cart Shed Rental',
			alt: 'Non-Member',
			type: 'toggle',
			fee: 400
		},
		{
			label: 'Trail Fee Only',
			type: 'toggle',
			fee: 150
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
		const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

		const response = await fetch('api/checkout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				priceId: 'price_1QIBg1Ixxan7cBV5DeK14CYA',
				mode: 'payment'
			})
		});

		const { sessionId } = await response.json();

		await stripe?.redirectToCheckout({ sessionId });
	}
</script>

<!-- <button {onclick}>Buy Single Membership</button> -->

<form method="POST" use:enhance={onclick} class="mx-auto max-w-3xl py-8">
	<h2 class="mb-8 text-center text-2xl font-bold">Alpine Meadows Golf Association Memberships</h2>

	<div class="mb-8">
		<p class="mb-4 text-center font-bold">Select Membership Type:</p>
		<div class="flex justify-center">
			<div class="grid max-w-3xl grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
				{#each membershipOptions as option}
					<label
						for={option.value}
						class="flex cursor-pointer items-start justify-between rounded-md border border-gray-300 px-4 py-2 {selectedMembership ===
						option.value
							? 'bg-green-800 text-white hover:bg-green-900'
							: 'hover:bg-gray-100'}"
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
									: 'text-gray-600'}"
							>
								{option.description}
							</p>
						</div>
						<input
							type="radio"
							id={option.value}
							name="membership-type"
							value={option.value}
							bind:group={selectedMembership}
							class="hidden"
						/>
					</label>
				{/each}
			</div>
		</div>
	</div>

	<div class="mb-4">
		<div class="mb-4 flex flex-col items-center">
			<p class="mb-2 text-center font-bold">Additional Options:</p>
			<div class="flex justify-center">
				<div class="grid max-w-3xl grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
					{#each additionalOptions as option, index}
						{#if option.type === 'quantity'}
							<!-- Quantity Selector -->
							<div
								class="flex items-start justify-between rounded-md border {handicapQty > 0
									? 'border-2 border-green-800'
									: 'border-gray-300'} bg-white px-4 py-2"
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
									${(handicapQty * option.fee).toFixed(2)}
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
										? 'bg-green-800 text-white hover:bg-green-900'
										: 'bg-white hover:bg-gray-100'}"
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
			<div class=" my-8 w-fit rounded-md border border-gray-300 bg-white px-4 py-2">
				<label for="personal-donation" class="pr-4 font-medium">{donation.label}</label>
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
					pattern="\d(1, 4)"
					class="w-20 rounded-md border px-2 py-1 text-right placeholder-gray-400 focus:border-2 focus:border-green-700 focus:outline-none"
					placeholder="$0.00"
					inputmode="numeric"
				/>
			</div>
		</div>

		<div class="flex justify-end pt-4">
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
			disabled={isSubmitDisabled}
			class="w-full rounded-md bg-green-700 px-4 py-3 font-medium text-white shadow-lg transition-all hover:bg-green-600 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
		>
			Pay Now ${totalFee.toFixed(2)}
		</button>
	</div>
</form>
