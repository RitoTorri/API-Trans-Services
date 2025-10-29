// importacion del cliente de prisma
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

// variable del prisma para las consultas
const prisma = new PrismaClient()

const createUser = async (object) => {
    try {
        const passwordHash = await bcrypt.hash(object.password, 10)

        const result = await prisma.users.create({
            data: {
                employee_id: object.employee_id,
                username: object.username,
                password: passwordHash,
                rol: object.rol
            }
        })
        return result
    } catch (error) { throw error }
}


createUser({
    employee_id: 1,
    username: 'JesusCortez',
    password: '12345',
    rol: 'administrador'
}) 