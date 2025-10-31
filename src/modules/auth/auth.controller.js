import response from '../../shared/utils/responses.js'; // importaciones de utilidades

// importaciones de clases
import AuthServices from './auth.service.js';
const authServices = new AuthServices();

class ControllerAuth {
    constructor() { }

    async login(req, res) {
        try {
            // Destructurar los datos de la petición y crear el objeto
            const { username, password } = req.body
            const object = { username: username, password: password }

            const result = await authServices.login(object)
            return response.QuerySuccess(res, result)

        } catch (error) {
            if (error.message === 'User not found.' || error.message === 'Password not valid.') {
                return response.ItemNotFound(res, "Password incorrect or username not exist.")
            }
            return response.ErrorInternal(res, "Error Internal Server");
        }
    }
}

export default ControllerAuth;