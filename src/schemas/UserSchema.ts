import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  edad: { type: Number, required: false },
  fecha_creacion: { type: Date, default: Date.now },
  direccion: {
    calle: { type: String, required: true },
    ciudad: { type: String, required: true },
    pais: { type: String, required: true },
    codigo_postal: { type: String, required: true },
  },
});

export default UserSchema;