import {z} from 'zod';

export const UserZodSchema = z.object({
    nombre: z.string(),
    email: z.string(),
    edad: z.number().optional(),
    direccion: z.object({
        calle: z.string(),
        ciudad: z.string(),
        pais: z.string(),
        codigo_postal: z.string(),
    })
})