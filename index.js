import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; 
import appointmentRoutes from './routes/appointmentRoutes.js';  // Note the extension .js when importing

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); 
app.use('/api/appointments', appointmentRoutes);
const port=process.env.PORT || 7000;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => console.log(`http://localhost:${port}`));
    })
    .catch(err => console.log(err));
