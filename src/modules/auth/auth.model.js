// Importaciones de clases
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class AuthModel {
    constructor() { }

    async login(object) {
        try {
            const result = await prisma.users.findFirst({
                where: { username: object.username },
                select: { id: true, username: true, rol: true, password: true }
            })
            return result
        } catch (error) { throw error }
    }
}

export default AuthModel