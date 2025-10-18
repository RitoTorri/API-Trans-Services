import responses from '../utils/responses.js';

const authorization = (allowedRoles) => {
    return (req, res, next) => {
        // Verificar si el usuario tiene alguno de los roles permitidos
        if (allowedRoles.includes(req.user.rol)) next(); // Usuario autorizado
        else responses.ErrorAuthorization(res, "You don't have permission to access this resource.");
    }
}

export default authorization;