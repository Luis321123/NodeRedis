import express from 'express';

import { register, update,getAllUsers, deleteUser, getUserByAnId, getUsersByCity} from '../controller/users';

export default (router: express.Router) => {
    router.get('/users',getAllUsers),
    router.get('/users/:id', getUserByAnId),
    router.get('/users/ciudad/:ciudad', getUsersByCity);
    router.delete('/users/:id',deleteUser);
    router.post('/auth/register', register);
    router.put('/auth/update/:id', update);
}