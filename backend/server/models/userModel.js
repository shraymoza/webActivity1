import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        name:     { type: String, required: true },
        email:    { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

// Hash password before save
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Helper for login
userSchema.methods.matchPassword = function (pwd) {
    return bcrypt.compare(pwd, this.password);
};

export default mongoose.model('User', userSchema);
