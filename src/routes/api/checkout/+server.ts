// src/routes/api/checkout/+server.ts
import { json } from '@sveltejs/kit';
import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.VITE_STRIPE_PRIVATE_KEY);

// Define a type for the cart items
type CartItem = {
    name: string;
    amount: number;
    quantity?: number;
};

export const POST = async ({ request }) => {
    try {
        const data = await request.json();
        const { items, totalAmount } = formatCartItems(data);
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items,
            mode: 'payment',
            success_url: `${import.meta.env.VITE_BASE_URL}/checkout/success`,
            cancel_url: `${import.meta.env.VITE_BASE_URL}/checkout/failure`,
        });

        return json({ sessionId: session.id });
    } catch (error) {
        console.error('Stripe session creation error:', error);
        return json({ error: 'Failed to create checkout session' }, { status: 500 });
    }
};

function formatCartItems(data: {
    selectedMembership: string | null;
    membershipOptions: any[];
    selectedOptions: boolean[];
    additionalOptions: any[];
    personalDonation: number;
    handicapQty: number;
}) {
    const items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    let totalAmount = 0;

    // Add membership if selected
    if (data.selectedMembership) {
        const membership = data.membershipOptions.find(opt => opt.value === data.selectedMembership);
        if (membership) {
            items.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `${membership.label} Membership`,
                        description: membership.description
                    },
                    unit_amount: membership.fee * 100 // Convert to cents
                },
                quantity: 1
            });
            totalAmount += membership.fee;
        }
    }

    // Add additional options
    data.selectedOptions.forEach((selected, index) => {
        if (selected) {
            const option = data.additionalOptions[index];
            items.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `${option.label}${option.alt ? ` - ${option.alt}` : ''}`
                    },
                    unit_amount: option.fee * 100
                },
                quantity: 1
            });
            totalAmount += option.fee;
        }
    });

    // Add handicap fee if quantity > 0
    if (data.handicapQty > 0) {
        items.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Handicap Fee'
                },
                unit_amount: 4500 // $45.00 in cents
            },
            quantity: data.handicapQty
        });
        totalAmount += 45 * data.handicapQty;
    }

    // Add donation if any
    if (data.personalDonation > 0) {
        items.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Personal Donation'
                },
                unit_amount: data.personalDonation * 100
            },
            quantity: 1
        });
        totalAmount += data.personalDonation;
    }

    return { items, totalAmount };
}