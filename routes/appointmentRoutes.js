import express from 'express';
import { checkMissedAppointments, findAvailableSlots, rescheduleAppointment } from '../controllers/appointmentController.js';

const router = express.Router();

// Route to check missed appointments
router.get('/check-missed', checkMissedAppointments);

// Route to find available slots for rescheduling
router.get('/find-slots/:doctorId/:date', findAvailableSlots);

// Route to reschedule appointment
router.post('/reschedule/:appointmentId', rescheduleAppointment);

export default router;
