import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    phoneNumber: String,  // For SMS notification
    role: { type: String, enum: ['patient', 'doctor'], required: true }
});

export default mongoose.model('User', userSchema);
