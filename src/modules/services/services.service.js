import ServicesModel from "./services.model";
const model = new ServicesModel();

// Importacion de clientes
import ClienteServices from "../clients/clients.service.js";
const clienteModel = new ClienteServices();

class ServicesService {
    constructor() { }

    async addService(service) {
        try {
            // Validar si existe un cliente con ese rif

        } catch (error) { throw error; }
    }
}

export default ServicesService;