import responses from '../utils/responses.js';

const authorization = (allowedRoles) => {
    return (req, res, next) => {
        // Verificar si el usuario tiene alguno de los roles permitidos
        if (allowedRoles.map(role => role.toLowerCase()).includes(req.user.rol.toLowerCase())) next(); // Usuario autorizado
        else responses.ErrorAuthorization(res, "You don't have permission to access this resource.");
    }
}

export default authorization;