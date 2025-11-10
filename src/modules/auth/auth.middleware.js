import response from '../../shared/utils/responses.js';
import validator from '../../shared/utils/format.data.js';

const validateLogin = (req, res, next) => {
    const { username, password } = req.body; // Obtener los datos de la petición
    let details = []; // Array para almacenar los errores

    if (!username || !password) {
        return response.BadRequest(res, 'The email and password are required and cannot be empty.');
    }

    if (validator.formatTextInvalid(username)) details.push('The username is invalid.');

    if (validator.formatPasswordInvalid(password)) details.push('The password is invalid.');

    if (details.length > 0) return response.ParametersInvalid(res, details);
    next();
}

export default validateLogin;