// Imports
import { PrismaClient } from '@prisma/client'

// variable del prisma para las consultas
const prisma = new PrismaClient()

class AuthModel {
    constructor() { }

    async login(object) {
        try {
            const result = await prisma.users.findFirst({
                where: { username: object.username },
                select: { id: true, username: true, password: true }
            })
            return result
        } catch (error) { throw error }
    }
}

export default AuthModel