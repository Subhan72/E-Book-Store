import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    address: { type: String, required: false }
});

export default mongoose.model('Customer', customerSchema);
