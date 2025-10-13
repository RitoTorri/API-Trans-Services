import bcrypt from 'bcrypt'
import Token from '../../shared/utils/token.access.js'
import AuthModel from './auth.model.js'
const authModel = new AuthModel()

class AuthService {
    constructor() { }

    async login(object) {
        try {
            const result = await authModel.login(object)

            if (!result || result === null) throw new Error('User not found.')

            const validationPassword = await bcrypt.compare(object.password, result.password)
            if (!validationPassword) throw new Error('Password not valid.')

            const token = await Token.genToken(result)
            return token
        } catch (error) { throw error }
    }
}

export default AuthService