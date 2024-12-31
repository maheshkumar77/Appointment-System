import Appointment from '../models/Appointment.js';
import User from '../models/User.js';
import nodemailer from 'nodemailer';
import twilio from 'twilio';

const gracePeriod = 15; // minutes

// Function to check missed appointments
export const checkMissedAppointments = async () => {
    const now = new Date();
    const appointments = await Appointment.find({ status: 'scheduled' });
    
    appointments.forEach(async (appointment) => {
        const appointmentTime = new Date(appointment.date);
        if (now - appointmentTime >= gracePeriod * 60 * 1000) {
            appointment.status = 'missed';
            await appointment.save();

            // Notify the patient via email/SMS about the missed appointment
            const patient = await User.findById(appointment.patientId);
            sendMissedAppointmentNotification(patient);
        }
    });
};

// Function to send missed appointment notifications via email/SMS
const sendMissedAppointmentNotification = (patient) => {
    // Email via Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: patient.email,
        subject: 'Missed Appointment',
        text: 'You missed your scheduled appointment. Please reschedule as soon as possible.',
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    // SMS via Twilio
    const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

    client.messages.create({
        body: 'You missed your appointment. Please reschedule.',
        from: process.env.TWILIO_PHONE_NUMBER,
        to: patient.phoneNumber,
    })
    .then((message) => console.log(message.sid));
};

// Function to find available slots for rescheduling
export const findAvailableSlots = async (doctorId, date) => {
    const existingAppointments = await Appointment.find({
        doctorId,
        date: { $gte: new Date(date), $lt: new Date(new Date(date).setHours(23, 59, 59)) },
    });

    let availableSlots = [];
    for (let hour = 9; hour < 17; hour++) { // Assuming working hours from 9 AM to 5 PM
        const slot = new Date(date);
        slot.setHours(hour, 0, 0);
        
        if (!existingAppointments.some((appt) => appt.date.getTime() === slot.getTime())) {
            availableSlots.push(slot);
        }
    }
    return availableSlots;
};

// Reschedule an appointment
export const rescheduleAppointment = async (appointmentId, newDate) => {
    const appointment = await Appointment.findById(appointmentId);
    if (appointment.status === 'missed') {
        appointment.status = 'rescheduled';
        appointment.rescheduledTo = newDate;

        const doctor = await User.findById(appointment.doctorId);
        const patient = await User.findById(appointment.patientId);

        // Notify the patient via email/SMS
        sendRescheduleNotification(patient, doctor, newDate);

        await appointment.save();
        return appointment;
    } else {
        throw new Error('Cannot reschedule an appointment that is not missed');
    }
};

// Send reschedule notification
const sendRescheduleNotification = (patient, doctor, newDate) => {
    // Notification logic (similar to missed appointment)
    const message = `Your appointment with Dr. ${doctor.name} has been rescheduled to ${newDate}.`;
    sendNotification(patient, message);
};

// Common notification sender
const sendNotification = (patient, message) => {
    // Send Email and SMS (same as above)
};
