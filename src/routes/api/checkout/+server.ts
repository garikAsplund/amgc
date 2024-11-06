import { json } from "@sveltejs/kit";
import Stripe from "stripe";

const stripe = new Stripe(import.meta.env.VITE_STRIPE_PRIVATE_KEY);

export async function POST({ request }) {
    const { priceId, mode } = await request.json();

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price: priceId,
                quantity: 1,
            }
        ],
        mode,
        success_url: `${import.meta.env.VITE_BASE_URL}/checkout/success`,
        cancel_url: `${import.meta.env.VITE_BASE_URL}/checkout/failure`,
    });

    return json({ sessionId: session.id });
}
