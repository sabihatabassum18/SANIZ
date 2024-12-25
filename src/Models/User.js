import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        generatedImages: { type: [String], default: [] }, // List of image links
        token: { type: Number, default: 10 }, // Default token count
        subscription: {
            type: {
                type: String,
                enum: ['trial', 'premium'],
                default: 'trial',
            },
            subscription_id: { type: String, default: null }, // External subscription ID
        },
    },
    { timestamps: true }
);

// Encrypt password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Match user password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
