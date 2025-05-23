import nodemailer from 'nodemailer';

export async function POST({ request }) {
	const formData = await request.json();
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		auth: {
			user: import.meta.env.VITE_EMAIL_USER,
			pass: import.meta.env.VITE_EMAIL_PASSWORD
		}
	});

	const { fullName, email } = formData.data;

	// Email to the business
	const businessMailOptions = {
		from: 'garik.asplund@gmail.com',
		to: 'garik.asplund@gmail.com, sallybfarms@eoni.com', // golfalpinemeadows@gmail.com
		subject: 'New Subscriber to Newsletter',
		html: `
            <h2>Newsletter Subscriber</h2>
            <p>Name: ${fullName}</p>
            <p>Email: ${email}</p>
        `
	};

	// Email to the customer
	const customerMailOptions = {
		from: 'garik.asplund@gmail.com',
		to: email,
		subject: 'Welcome to the Alpine Meadows Golf Course Newsletter',
		html: `
            <h2>Thank you for joining our newsletter!</h2>
            <p>We'll send you our next update when it's ready.</p>
        `
	};

	try {
		await transporter.sendMail(businessMailOptions);
		await transporter.sendMail(customerMailOptions);
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		console.error('Error sending email:', error);
		return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
	}
}
