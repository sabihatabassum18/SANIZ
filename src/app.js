import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import morgan from 'morgan';
import stripe from 'stripe';
import errorHandler from './middleware/errorMiddleware.js';

import userRoutes from './Routes/user.routes.js'
import imageRoutes from './Routes/image.routes.js'

import User from './Models/User.js';


configDotenv();

const app = express();

// Middleware
app.use(cors());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

app.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
    let event = request.body;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
        // Get the signature sent by Stripe
        const signature = request.headers['stripe-signature'];
        try {
            event = stripe.webhooks.constructEvent(
                request.body,
                signature,
                endpointSecret
            );
        } catch (err) {
            console.log(`⚠️  Webhook signature verification failed.`, err.message);
            return response.sendStatus(400);
        }
    }

    // const event = req.body;

    // Handle the event types you are interested in
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log('Payment successful, session ID:', session.id);
            // get the email from the session and fulfill the order
            const customerEmail = session.customer_details.email;
            const amount = session.currency_conversion.amount_total / 100;
            console.log(customerEmail, amount);

            // Find the user by email
            const user = await User.findOne({ email: customerEmail });
            console.log(user)
            // Update the user's credit token balance
            if (user) {
                if (amount < 10) {
                    user.token += 300;
                } else {
                    user.token += 3000;
                }
                await user.save();
            }


            // Perform actions like fulfilling the order
            break;

        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('Payment succeeded, paymentIntent ID:', paymentIntent.id);
            // Perform actions like updating your database
            break;

        case 'invoice.payment_failed':
            const invoice = event.data.object;
            console.log('Invoice payment failed, invoice ID:', invoice.id);
            // Perform actions like sending a notification to the customer
            break;

        // Add more cases for other events you want to listen to
        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    // Acknowledge receipt of the event by returning a 200 response
    response.status(200).send('Event received');
});

app.use(express.json());

// Routes
app.use('/api/users', express.json(), userRoutes);
app.use('/api', express.json(), imageRoutes);

// Error Handler Middleware
app.use(errorHandler);

// log every request to the console
app.use(morgan('tiny'));


export default app;
