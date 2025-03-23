import express from 'express';
import { Request, Response } from 'express';

import {createUser, getUserByEmail,updateUserById, deleteUserById, getUserById, getUserByDirect} from '../services/users'; 
import  UserModel  from '../models/users';
import { getPaginationParams } from "../resolvers/pagination";
import { validateUser, validateUserUpdate, isValidUserId } from '../validations/userValidations';
import { sendSuccess, sendError, sendValidationError } from '../utils/responses'; 

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const { page, limit } = getPaginationParams(req.query);

        const pageNumber = Math.max(Number(page) || 1, 1);
        const limitNumber = Math.max(Number(limit) || 10, 1);
        const skip = (pageNumber - 1) * limitNumber;

        const [users] = await Promise.all([
            UserModel.find().skip(skip).limit(limitNumber)]);

        return res.status(200).json({
            currentPage: pageNumber,
            users
        });
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};
export const getUserByAnId = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if (!isValidUserId(id)) {
            return res.status(400).json({ message: "ID de usuario no válido." });
        }

        const user = await getUserById(id);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};

export const getUsersByCity = async (req: Request, res: Response) => {
    try {
        const { ciudad } = req.params;

        if (!ciudad) {
            return res.status(400).json({ message: 'Se requiere una ciudad' });
        }

        const users = await getUserByDirect(ciudad);

        if (users.length === 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios para esta ciudad' });
        }

        return res.status(200).json(users);
    } catch (error) {
        console.error('Error al obtener usuarios por ciudad:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const errors = validateUser(req.body);

        if (errors.length > 0) {
            return sendValidationError(res, errors);
        }

        const { email, nombre, edad, direccion } = req.body;

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return sendError(res, 'Ya existe un usuario con ese email', 409);
        }

        const user = await createUser({
            email,
            nombre,
            edad: edad || null,
            fecha_creacion: new Date(),
            direccion,
        });

        sendSuccess(res, user, 'Usuario registrado con éxito', 201);
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        sendError(res);
    }
};

export const update = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!Object.keys(updates).length) {
            return res.status(400).json({ message: "No se proporcionaron datos para actualizar." });
        }

        const existingUser = await getUserById(id);
        if (!existingUser) {
            return res.status(404).json({ message: "El usuario no existe." });
        }

        const errores = validateUserUpdate(updates);
        if (errores.length > 0) {
            return res.status(400).json({
                message: "Errores de validación",
                errors: errores
            });
        }

        const updatedUser = await updateUserById(id, updates);

        return res.status(200).json({ message: "Usuario actualizado con éxito", user: updatedUser });
        
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};
    export const deleteUser = async (req: express.Request, res: express.Response) => {
        try {
            const { id } = req.params;
    
            if (!isValidUserId(id)) {
                return res.status(400).json({ message: "ID de usuario no válido." });
            }
    
            const deletedUser = await deleteUserById(id);
    
            if (!deletedUser) {
                return res.status(404).json({ message: "Usuario no encontrado." });
            }
    
            return res.status(200).json({
                message: `El usuario ${deletedUser.nombre} ha sido eliminado exitosamente.`,
            });
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    };