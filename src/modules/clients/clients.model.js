import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class ModelClients {
    constructor() { }

    // CRU
    async addClient(client) {
        try {
            return await prisma.clients.create({
                data: client
            });
        } catch (error) { throw error; }
    }

    async getClients(filter) {
        try {
            return await prisma.clients.findMany({
                where: filter
            });
        } catch (error) { throw error; }
    }

    async updateClient(id, client) {
        try {
            return await prisma.clients.update({
                where: { id: id },
                data: client
            });
        } catch (error) { throw error; }
    }

    // gets
    async getClientByRif(rif) {
        try {
            return await prisma.clients.findFirst({
                where: { rif: rif }
            });
        } catch (error) { throw error; }
    }

    async getClientByContact(contact) {
        try {
            return await prisma.clients.findFirst({
                where: { contact: contact }
            });
        } catch (error) { throw error; }
    }

    async getClientById(id) {
        try {
            return await prisma.clients.findFirst({
                where: { id: id }
            });
        } catch (error) { throw error; }
    }
}

export default ModelClients;