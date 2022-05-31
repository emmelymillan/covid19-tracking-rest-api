import { getUsers, createUser, updateUser, deleteUser } from '../controllers/userController.js';

export default (app) => {
    app.get('/user', getUsers);
    app.post('user/new', createUser);
    app.put('/user/update/:id', updateUser);
    app.delete('/user/delete/:id', deleteUser);
}