import responses from '../../shared/utils/responses.js' // imports de utilidades
import ServiceClients from "./clients.service.js";

// variables
const service = new ServiceClients();

class ControllerClients {
    constructor() { }

    async addClient(req, res) {
        try {
            const client = {
                rif: req.body.rif,
                name: req.body.name,
                contact: req.body.contact,
                address: req.body.address
            }

            const result = await service.addClient(client);
            return responses.ItemCreated(res, result);

        } catch (error) {
            if (error.message === 'Client already exists with this rif.') {
                return responses.ResConflict(res, "Client already exists with this rif.");
            }
            if (error.message === 'Client already exists with this contact.') {
                return responses.ResConflict(res, "Client already exists with this contact.");
            }
            return responses.ErrorInternal(res, error.message);
        }
    }

    async getClients(req, res) {
        try {
            const clients = await service.getClients(req.filter);
            return responses.QuerySuccess(res, clients);

        } catch (error) {
            return responses.ErrorInternal(res, error.message);
        }
    }

    async updateClient(req, res) {
        try {
            let client = { id: parseInt(req.params.id) };

            if (req.body.rif) client.rif = req.body.rif;
            if (req.body.name) client.name = req.body.name;
            if (req.body.contact) client.contact = req.body.contact;
            if (req.body.address) client.address = req.body.address;

            const result = await service.updateClient(client);
            return responses.ItemCreated(res, result);

        } catch (error) {
            if (error.message === 'Client not found.') {
                return responses.ItemNotFound(res, "Not exist client with this id.");
            }

            if (error.message === 'The rif already exists.') {
                return responses.ResConflict(res, "Client already exists with this rif.");
            }
            if (error.message === 'The contact already exists.') {
                return responses.ResConflict(res, "Client already exists with this contact.");
            }
            return responses.ErrorInternal(res, error.message);
        }
    }
}

export default ControllerClients;