import path from 'path'
import { fileURLToPath } from 'url'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../../../.env') })

const genToken = async (result) => {
    const token = jwt.sign({
        id: result.id,
        username: result.user_name,
    }, process.env.SECRET_KEY, { expiresIn: '3h' })
    return token
}

const verifyToken = (authorization) => {
    try {
        const parts = authorization.split(' ')
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            throw new Error('Format is invalid')
        }

        const token = parts[1]
        if (!token) throw new Error('The token is invalid.')

        const decoded = jwt.verify(token, process.env.TOKEN_ACCESS)
        return decoded

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Token has expired')
        }
        if (error.name === 'JsonWebTokenError') {
            throw new Error('Invalid token')
        }
        throw error
    }
}

export default { genToken, verifyToken }