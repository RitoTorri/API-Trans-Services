import response from '../../shared/utils/responses.js';
import validator from '../../shared/utils/format.data.js';

const validateLogin = (req, res, next) => {
    const { username, password } = req.body;
    let error = false;
    let details = [];

    if (!username || !password) {
        return response.BadRequest(res, 'The email and password are required and cannot be empty.');
    }

    if (validator.formatTextInvalid(username)) {
        error = true;
        details.push('The username is invalid.');
    }

    if (validator.formatPasswordInvalid(password)) {
        error = true;
        details.push('The password is invalid.');
    }

    if (error) return response.ParametersInvalid(res, details);
    next();
}

export default validateLogin;