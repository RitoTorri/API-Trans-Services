import responses from '../../shared/utils/responses.js';
import response from '../../shared/utils/responses.js'; // importaciones de utilidades
import UsersServices from './users.service.js';
const service = new UsersServices();

class ControllerUsers {
    constructor() { }

    async addUser(req, res) {
        try {
            const user = {
                username: req.body.username,
                password: req.body.password,
                rol: req.body.rol
            };

            const result = await service.addUser(user);
            return response.QuerySuccess(res, result);
        } catch (error) {
            if (error.message === 'Already exist username.') {
                return response.ResConflict(res, "ERROR. Already exist a user with that username.");
            }
            return response.ErrorInternal(res, error.message);
        }
    }

    async getUsers(req, res) {
        try {
            const result = await service.getUsers(req.user);
            return response.QuerySuccess(res, result);
        } catch (error) {
            return response.ErrorInternal(res, error.message);
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;

            const result = await service.deleteUser(parseInt(id), req.user);
            return response.QuerySuccess(res, { message: "User deleted successfully.", result: result });

        } catch (error) {
            if (error.message === 'You can not delete yourself.') {
                return responses.ResConflict(res, "ERROR. You can not delete yourself.");
            }

            if (error.message === 'User not found.') {
                return response.ItemNotFound(res, "ERROR. User not found with that id.");
            }
            console.log(error)
            return response.ErrorInternal(res, error.message);
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { username, rol } = req.body;

            const user = { id: parseInt(id), }

            if (username) user.username = username;
            if (rol) user.rol = rol;

            const result = await service.updateUser(user, req.user);
            return response.QuerySuccess(res, { message: "User updated successfully.", result: result });

        } catch (error) {
            if (error.message === 'You can not update yourself.') {
                return responses.ResConflict(res, "ERROR. You can not update yourself.");
            }

            if (error.message === 'User not found.') {
                return response.ItemNotFound(res, "ERROR. User not found with that id.");
            }

            if (error.message === 'Already exist username.') {
                return response.ResConflict(res, "ERROR. Already exist a user with that username.");
            }

            return response.ErrorInternal(res, error.message);
        }
    }
}

export default ControllerUsers;
