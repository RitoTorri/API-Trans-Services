// imports
import response from '../../shared/utils/responses.js';
import AuthServices from './auth.service.js';

// instacias
const authServices = new AuthServices();

class ControllerAuth {
    constructor() { }

    async login(req, res) {
        try {
            const { username, password } = req.body
            const object = { username: username, password: password }

            const result = await authServices.login(object)
            return response.QuerySuccess(res, { message: "Login successful.", token: result })

        } catch (error) {
            if (error.message === 'User not found.' || error.message === 'Password not valid.') {
                return response.ItemNotFound(res, "Password incorrect or username not exist.")
            }
            return response.ErrorInternal(res, error.message)
        }
    }
}

export default ControllerAuth;