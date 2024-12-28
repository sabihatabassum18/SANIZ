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
app.use(express.json());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api', imageRoutes);

// Error Handler
app.use(errorHandler);

// log every request to the console
app.use(morgan('tiny'));

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

app.post('/webhook', async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        // Verify the webhook signature and construct the event
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook error: ${err.message}`);
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
    res.status(200).send('Event received');
});

export default app;
