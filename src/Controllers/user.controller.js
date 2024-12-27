import User from '../Models/User.js';
import asyncHandler from '../lib/asyncHandler.js'
import generateToken from '../lib//jwtToken.js';
import apiResponse from '../lib/apiResponse.js';

// @desc Register a new user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Create the user
    const user = await User.create({ name, email, password });

    if (user) {
        res.status(201).json(
            apiResponse('success', 'User registered successfully', {
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            })
        );
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc Authenticate user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json(
            apiResponse('success', 'User authenticated successfully', {
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
                creditToken: user.token,
                subscriptionType: user.subscription.type,
            })
        );
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});


// @desc Get user profile       
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.json(req.user);
});


export { registerUser, authUser, getUserProfile };
