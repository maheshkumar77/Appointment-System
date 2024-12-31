import express from 'express';
import { createUser, getAllUsers, getUserById, updateUser } from '../controllers/userController.js';

const router = express.Router();

// Route to create a new user (patient or doctor)
router.post('/create', createUser);

// Route to get all users
router.get('/', getAllUsers);

// Route to get a single user by ID
router.get('/:userId', getUserById);

// Route to update user details
router.put('/:userId', updateUser);

export default router;
