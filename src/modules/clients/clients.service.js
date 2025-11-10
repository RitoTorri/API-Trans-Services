import ModelClients from "./clients.model.js"
const model = new ModelClients();

class ServiceClients {
    constructor() { }

    async addClient(client) {
        try {
            // Validar que no exista un cliente con ese contacto
            const existContact = await model.getClientByContact(client.contact);
            if (existContact) throw new Error("The contact already exists.");

            // Validar que no exista un cliente con ese rif
            const existRif = await model.getClientByRif(client.rif);
            if (existRif) throw new Error("The rif already exists.");

            return await model.addClient(client);
        } catch (error) { throw error; }
    }

    async getClients(filter) {
        try {
            return await model.getClients(filter);
        } catch (error) { throw error; }
    }

    async updateClient(client) {
        try {
            // Validar que exista el cliente
            const existClient = await model.getClientById(client.id);
            if (!existClient) throw new Error('Client not found.');

            // Validar que no exista un cliente con ese contacto
            if (client.contact) {
                const existContact = await model.getClientByContact(client.contact);
                if (existContact) throw new Error("The contact already exists.");
            }

            // Validar que no exista un cliente con ese rif
            if (client.rif) {
                const existRif = await model.getClientByRif(client.rif);
                if (existRif) throw new Error("The rif already exists.");
            }

            const id = client.id;
            delete client.id;

            return await model.updateClient(id, client);
        } catch (error) { throw error; }
    }
}

export default ServiceClients;