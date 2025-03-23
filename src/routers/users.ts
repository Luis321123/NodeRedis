import express from 'express';
import { UserController } from '../controller/users';
import { UserService } from '../services/users';

export default (router: express.Router) => {
    const userController = new UserController();

    // Rutas de usuarios
    router.get('/users', UserController.getAllUsers.bind(userController));
    router.get('/users/:id', UserController.getUserById.bind(userController));
    router.get('/users/ciudad/:ciudad', UserController.getUsersByCity.bind(userController));
    router.delete('/users/:id', UserController.deleteUser.bind(userController));

    // Rutas de autenticación
    router.post('/auth/register', UserController.register.bind(userController));
    router.put('/auth/update/:id', UserController.update.bind(userController));
};