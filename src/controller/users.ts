import { Request, Response } from 'express';

import {UserService} from '../services/users';
import { getPaginationParams } from "../resolvers/pagination";
import { isValidUserId } from '../validations/userValidations';
import { sendSuccess, sendError } from '../utils/responses'; 

const userService = new UserService();

export class UserController {
    static async getAllUsers(req: Request, res: Response) {
        try {
            const { page, limit } = getPaginationParams(req.query);

            const users = await userService.getUsers(page, limit);
            sendSuccess(res, { currentPage: page, users });
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            sendError(res, 'Error interno del servidor', 500);
        }
    }

    static async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!isValidUserId(id)) {
                return sendError(res, 'ID de usuario no válido', 400);
            }

            const user = await userService.getUserById(id);
            if (!user) {
                return sendError(res, 'Usuario no encontrado', 404);
            }

            sendSuccess(res, user);
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            sendError(res, 'Error interno del servidor', 500);
        }
    }

    static async getUsersByCity(req: Request, res: Response) {
        try {
            const { ciudad } = req.params;

            if (!ciudad) {
                return sendError(res, 'Se requiere una ciudad', 400);
            }

            const users = await userService.getUserByCity(ciudad);
            if (users.length === 0) {
                return sendError(res, 'No se encontraron usuarios para esta ciudad', 404);
            }

            sendSuccess(res, users);
        } catch (error) {
            console.error('Error al obtener usuarios por ciudad:', error);
            sendError(res, 'Error interno del servidor', 500);
        }
    }

    static async register(req: Request, res: Response) {
        try {
            const userData = req.body;

            const existingUser = await userService.getUserByEmail(userData.email);
            if (existingUser) {
                return sendError(res, 'Ya existe un usuario con ese email', 409);
            }

            const user = await userService.createUser(userData);
            sendSuccess(res, user, 'Usuario registrado con éxito', 201);
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            sendError(res, 'Error interno del servidor', 500);
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updates = req.body;

            if (!Object.keys(updates).length) {
                return sendError(res, 'No se proporcionaron datos para actualizar', 400);
            }

            const updatedUser = await userService.updateUserById(id, updates);
            if (!updatedUser) {
                return sendError(res, 'Usuario no encontrado', 404);
            }

            sendSuccess(res, updatedUser, 'Usuario actualizado con éxito');
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            sendError(res, 'Error interno del servidor', 500);
        }
    }

    static async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!isValidUserId(id)) {
                return sendError(res, 'ID de usuario no válido', 400);
            }

            const deletedUser = await userService.deleteUserById(id);
            if (!deletedUser) {
                return sendError(res, 'Usuario no encontrado', 404);
            }

            sendSuccess(res, null, `El usuario ${deletedUser.nombre} ha sido eliminado exitosamente`);
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            sendError(res, 'Error interno del servidor', 500);
        }
    }
}