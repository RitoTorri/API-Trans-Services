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
                id_employee: object.id_employee,
                user_name: object.user_name,
                password: passwordHash,
            }
        })
        return result
    } catch (error) { throw error }
}

/* 
Primer usuario creado
createUser({
    id_employee: 1,
    user_name: 'JesusCortez',
    password: '12345'
}) 
*/