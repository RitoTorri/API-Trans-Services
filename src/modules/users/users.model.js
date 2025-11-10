// importacion del cliente de prisma
import { PrismaClient } from '@prisma/client'

// variable del prisma para las consultas
const prisma = new PrismaClient()

class ModelUsers {
    constructor() { }

    async addUser(object) {
        try {
            const result = await prisma.users.create({
                data: object,
                select: { id: true, username: true, rol: true }
            })
            return result;
        } catch (error) { throw error; }
    }

    async getUsers(user) {
        try {
            return await prisma.users.findMany({
                where: {
                    id: { not: user.id },
                },
                select: { id: true, username: true, rol: true, created_at: true }
            });
        } catch (error) { throw error; }
    }

    async deleteUser(id) {
        try {
            return await prisma.users.delete({
                where: { id: id }
            })
        } catch (error) { throw error; }
    }

    async updateUser(id, object) {
        try {
            return await prisma.users.update({
                where: { id: id },
                data: object,
                select: { id: true, username: true, rol: true, created_at: true }
            })
        } catch (error) { throw error; }
    }

    // GETS
    async getUserByUserName(username) {
        try {
            const result = await prisma.users.findFirst({
                where: { username: username }
            })
            return result;
        } catch (error) { throw error; }
    }

    async getUserById(id) {
        try {
            const result = await prisma.users.findFirst({
                where: { id: id }
            })
            return result;
        } catch (error) { throw error; }
    }
}

export default ModelUsers;