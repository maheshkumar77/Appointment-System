import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: Date,
    status: { type: String, enum: ['scheduled', 'missed', 'rescheduled'], default: 'scheduled' },
    rescheduledTo: Date,
    conflict: { type: Boolean, default: false }  // Flag for conflict resolution
});

export default mongoose.model('Appointment', appointmentSchema);
