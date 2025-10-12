import response from '../utils/responses.js'
import Token from '../utils/token.access.js'

const validateTokenAccess = async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) return response.BadRequest(res, 'The token authentication is required.')

    try {
        const decoded = await Token.verifyToken(authorization)
        req.user = decoded
        next()

    } catch (error) {
        if (error.message === 'Format is invalid') {
            return response.ErrorAuthorization(res, 'The token is invalid. It must be a Bearer token.')
        }
        if (error.message === 'The token is invalid.') {
            return response.ErrorAuthorization(res, 'The token is required.')
        }
        if (error.message === 'Token has expired') {
            return response.ErrorAuthorization(res, 'The token has expired.')
        }
        if (error.message === 'Invalid token') {
            return response.ErrorAuthorization(res, 'The token is invalid.')
        }
        return response.ErrorAuthorization(res, error.message)
    }
}

export default validateTokenAccess