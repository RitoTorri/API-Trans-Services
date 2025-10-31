import bcrypt from 'bcrypt'
import Token from '../../shared/utils/token.access.js'
import AuthModel from './auth.model.js'
const authModel = new AuthModel()

class AuthService {
    constructor() { }

    async login(object) {
        try {
            // Verificar si el usuario existe
            const result = await authModel.login(object)
            if (!result) throw new Error('User not found.')

            // Verificar si la contraseña es correcta
            const validationPassword = await bcrypt.compare(object.password, result.password)
            if (!validationPassword) throw new Error('Password not valid.')

            // Generar el token
            const token = await Token.genToken(result)
            delete result.password

            return { token: token, user: result }
        } catch (error) { throw error }
    }
}

export default AuthService