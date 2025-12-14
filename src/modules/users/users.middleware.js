import response from '../../shared/utils/responses.js'; // importaciones de utilidades
import validators from '../../shared/utils/format.data.js';

const addUserMiddleware = (req, res, next) => {
    const { username, password, rol } = req.body;
    let errors = [];

    if (!username || !password || !rol) {
        return response.BadRequest(res, 'Missing parameters. Please send username, password and rol.');
    }

    if (validators.formatUserNameInvalid(username)) {
        errors.push('Invalid username Only letters, numbers and spaces are allowed.');
    }

    if (validators.formatTextInvalid(password)) {
        errors.push('Invalid password.');
    }

    if (validators.formatNamesInvalid(rol)) {
        errors.push('Invalid rol. Only letters and spaces are allowed.');
    }

    if (rol !== "SuperUsuario" && rol !== "Administrador" && rol !== "Invitado") {
        errors.push('Invalid rol. Only SuperUsuario, Administrador or Invitado are allowed.');
    }

    if (errors.length > 0) return response.BadRequest(res, errors);
    next();
}

const deleteUserMiddleware = (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return response.BadRequest(res, 'Missing parameters. Please send id.');
    }
    if (validators.formatNumberInvalid(id)) {
        return response.BadRequest(res, 'Invalid id. Only numbers are allowed.');
    }
    next();
}

const updateUserMiddleware = (req, res, next) => {
    const { id } = req.params;
    const { username, password, rol } = req.body;
    let errors = [];

    if (!id) {
        return response.BadRequest(res, 'Missing parameters. Please send id.');
    }

    if (!username && !rol && !password) {
        return response.BadRequest(res, 'Missing parameters. Please send username or rol.');
    }

    if (validators.formatNumberInvalid(id)) {
        errors.push('Invalid id. Only numbers are allowed.');
    }

    if (username) {
        if (validators.formatUserNameInvalid(username)) {
            errors.push('Invalid username. Only letters, numbers and spaces are allowed.');
        }
    }

    if (password) {
        if (validators.formatTextInvalid(password)) {
            errors.push('Invalid password.');
        }
    }

    if (rol) {
        if (validators.formatNamesInvalid(rol)) {
            errors.push('Invalid rol. Only letters and spaces are allowed.');
        }

        if (rol !== "SuperUsuario" && rol !== "Administrador" && rol !== "Invitado") {
            errors.push('Invalid rol. Only SuperUsuario, Administrador or Invitado are allowed.');
        }
    }

    if (errors.length > 0) return response.BadRequest(res, errors);
    next();
}

export default { addUserMiddleware, deleteUserMiddleware, updateUserMiddleware };