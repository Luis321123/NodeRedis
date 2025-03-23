import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import router from './routers';

dotenv.config();

const app = express();

app.use(express.json()); 


const PORT = process.env.PORT

const startServer = async () => {
    try {
        await connectDB(); 
        
        const server = http.createServer(app);
        server.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
        
    } catch (error) {
        console.error(' Error al iniciar el servidor:', error);
        process.exit(1); 
    }
};
app.use('/', router());

startServer();