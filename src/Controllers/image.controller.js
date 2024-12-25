import { generateImage } from '../lib/generateImage.js';
import asyncHandler from '../lib/asyncHandler.js';
import User from '../Models/User.js';

// @desc Generate an image based on a prompt
// @route POST /api/image-generation
// @access Private
export const imageGeneration = asyncHandler(async (req, res) => {
    const { prompt } = req.body;

    // Validate the prompt input
    if (!prompt) {
        res.status(400);
        throw new Error('Prompt is required.');
    }

    // Check if the user has enough tokens
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found.');
    }

    if (user.token < 10) {
        res.status(400);
        throw new Error('Insufficient tokens. Please purchase more tokens.');
    }

    // Generate the image URL
    const imageUrl = await generateImage(prompt);

    if (!imageUrl) {
        res.status(500);
        throw new Error('Image generation failed.');
    }

    // Deduct 10 tokens from the user's account
    user.token -= 10;

    // Add the image link to the user's generatedImages array
    user.generatedImages.push(imageUrl);

    // Save the user data with the updated token count
    await user.save();

    // Respond with the image link
    res.status(200).json({
        status: 'success',
        message: 'Image generated successfully.',
        data: {
            imageUrl,
        },
    });
});
