import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URL;
export const connectDB = async () => {
    try {
        console.log('Conectando a MongoDB...');
        await mongoose.connect(MONGODB_URI)
        .then(() => {
            console.log('Conectado a MongoDB');
        })
        .catch((error) => {
            console.error('Error al conectar a MongoDB:', error);
        });
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
    }
};