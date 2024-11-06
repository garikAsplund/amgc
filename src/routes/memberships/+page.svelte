<script lang="ts">
	import { loadStripe } from '@stripe/stripe-js';
import { enhance } from '$app/forms';
  
    let selectedMembership = null;
    let handicapFee = 45;
    let cartShedRental = 300;
    let trailFee = 150;
    let rangeBallsFee = 150;
    let personalDonation = 0;
  
    const membershipOptions = [
      {
        value: 'family',
        label: 'Family Membership',
        fee: 775
      },
      {
        value: 'new-family',
        label: 'New Family Membership',
        fee: 675
      },
      {
        value: 'single',
        label: 'Single Membership',
        fee: 550
      },
      {
        value: 'new-single',
        label: 'New Single Membership',
        fee: 450
      },
      {
        value: 'student',
        label: 'Student Membership',
        fee: 100
      },
      {
        value: 'youth',
        label: 'Youth Membership',
        fee: 50
      }
    ];
  
    let totalFee = $derived(
        (selectedMembership ? membershipOptions.find(option => option.value === selectedMembership).fee : 0) +
        handicapFee +
        (selectedMembership === 'family' || selectedMembership === 'new-family' ? rangeBallsFee : 0) +
        (cartShedRental > 0 ? cartShedRental : 0) +
        (trailFee > 0 ? trailFee : 0) +
        personalDonation
    );
  
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

<form method="POST" use:enhance={onclick}>
	<div class="mx-auto max-w-md">
		<h2 class="mb-4 text-2xl font-bold">Alpine Meadows Golf Association 2024 Membership</h2>

		<div class="mb-4">
			<p class="mb-2 font-medium">Membership Type:</p>
			<div class="grid grid-cols-2 gap-2">
				{#each membershipOptions as option}
					<label
						for={option.value}
						class="flex cursor-pointer items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 hover:bg-gray-100 {selectedMembership ===
						option.value
							? 'bg-blue-500 text-white'
							: ''}"
					>
						<span>{option.label}</span>
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

		<div class="mb-4">
			<p class="mb-2 font-medium">Additional Options:</p>
			<div class="space-y-2">
				<div class="flex items-center justify-between">
					<label for="handicap-fee" class="block">Handicap Fee (per person)</label>
					<input
						type="number"
						id="handicap-fee"
						name="handicap-fee"
						bind:value={handicapFee}
						class="w-20 rounded-md border px-2 py-1"
					/>
				</div>
				{#if selectedMembership === 'family' || selectedMembership === 'new-family'}
					<div class="flex items-center justify-between">
						<label for="range-balls-fee" class="block">Range Balls (Family)</label>
						<button
							type="button"
							class="w-20 rounded-md border border-gray-300 bg-white px-4 py-2 hover:bg-gray-100"
							on:click={() => (rangeBallsFee = rangeBallsFee === 150 ? 200 : 150)}
						>
							${rangeBallsFee}
						</button>
					</div>
				{/if}
				<div class="flex items-center justify-between">
					<label for="cart-shed-rental" class="block">Cart Shed Rental (Includes Trail Fee)</label>
					<button
						type="button"
						class="w-20 rounded-md border border-gray-300 bg-white px-4 py-2 hover:bg-gray-100"
						on:click={() => (cartShedRental = cartShedRental === 300 ? 400 : 300)}
					>
						${cartShedRental}
					</button>
				</div>
				<div class="flex items-center justify-between">
					<label for="trail-fee" class="block">Trail Fee Only (No cart shed/ANNUAL)</label>
					<button
						type="button"
						class="w-20 rounded-md border border-gray-300 bg-white px-4 py-2 hover:bg-gray-100"
						on:click={() => (trailFee = trailFee === 150 ? 0 : 150)}
					>
						${trailFee}
					</button>
				</div>
				<div class="flex items-center justify-between">
					<label for="personal-donation" class="block">Personal Donation</label>
					<input
						type="number"
						id="personal-donation"
						name="personal-donation"
						bind:value={personalDonation}
						class="w-20 rounded-md border px-2 py-1"
					/>
				</div>
			</div>
		</div>

		<div class="mb-4">
			<p class="mb-2 font-medium">Total Fee: ${totalFee.toFixed(2)}</p>
		</div>

		<button
			type="submit"
			class="w-full rounded-md bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600"
		>
			Submit Membership Application
		</button>
	</div>
</form>
