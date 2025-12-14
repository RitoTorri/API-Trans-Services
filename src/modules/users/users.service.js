import bcrypt from 'bcrypt'
import ModelUsers from './users.model.js';
const model = new ModelUsers();

class ServiceUsers {
    constructor() { }

    async addUser(object) {
        try {
            // validar que el username no exista
            const userName = await model.getUserByUserName(object.username);
            if (userName) throw new Error('Already exist username.');

            // encriptar la contraseña
            const passwordHash = await bcrypt.hash(object.password, 10);
            object.password = passwordHash;

            // agregar el usuario
            return await model.addUser(object);
        } catch (error) { throw error; }
    }

    async getUsers(user) {
        try {
            return await model.getUsers(user);
        } catch (error) { throw error; }
    }

    async deleteUser(id, currentUser) {
        try {
            if (id === currentUser.id) throw new Error("You can not delete yourself."); // validar que el usuario no sea el mismo

            // validar que exista el usuario
            const user = await model.getUserById(id);
            if (!user) throw new Error('User not found.');

            return await model.deleteUser(id);
        } catch (error) { throw error; }
    }

    async updateUser(user, currentUser) {
        try {
            if (user.id === currentUser.id) throw new Error("You can not update yourself."); // validar que el usuario no sea el mismo

            // validar que exista el usuario
            const existUser = await model.getUserById(user.id);
            if (!existUser) throw new Error('User not found.');

            // Validar que el nuevo username no exista
            if (user.username) {
                const userName = await model.getUserByUserName(user.username);
                if (userName) throw new Error('Already exist username.');
            }

            if (user.password) {
                // encriptar la contraseña
                const passwordHash = await bcrypt.hash(user.password, 10);
                user.password = passwordHash;
            }

            const id = user.id;
            delete user.id;

            // actualizar el usuario
            return await model.updateUser(id, user);
        } catch (error) { throw error; }
    }
}

export default ServiceUsers;