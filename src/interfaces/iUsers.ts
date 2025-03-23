import { Document } from 'mongoose';

export interface IUser extends Document {
  nombre: string;
  email: string;
  edad?: number;
  fecha_creacion: Date;
  direccion: {
    calle: string;
    ciudad: string;
    pais: string;
    codigo_postal: string;
  };
}