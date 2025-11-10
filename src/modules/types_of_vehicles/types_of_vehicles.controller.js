import  response from '../../shared/utils/responses.js';
import typesServices from './types_of_vehicles.service.js';

const typeServiceInstance = new typesServices();

class ControllerType {
    constructor () {}

    async listAll(req, res) {
        try {
            const result = await typeServiceInstance.getTypes();
            return response.QuerySuccess(res, result);
        } catch (error) {
            if (error.message === 'vehicle not found.' || error.message === 'information not valid.') {
                            return response.ItemNotFound(res, "types of vehicles not exist.")
                        }
                        return response.ErrorInternal(res, "Error Internal Server");
        }
    }

    async getTypeById(req, res) {
        try {
            const { typeId } = req.params;
            const result = await typeServiceInstance.getTypeById(typeId);
            return response.QuerySuccess(res, result);
        } catch (error) {
            if (error.message.includes('not found')) {
                return response.ItemNotFound(res, "Tipo de vehículo no encontrado.");
            }
            return response.ErrorInternal(res, "Error interno del servidor.");
        }
    }

    async create(req, res) {
        try {
            const { type_name, description } = req.body;
            const typeData = { type_name: type_name, description: description };

            const result = await typeServiceInstance.registerNewType(typeData);

            return response.QuerySuccess(res, { message: "Tipo creado con éxito.", data: result }, 201);

        } catch (error) {
            
            if (error.message.includes('duplicado')) {
                return response.ItemNotFound(res, "El nombre de tipo ya existe.");
            }
            return response.ErrorInternal(res, "Error interno del servidor al crear.");
        }
    }

    async update(req, res) {
        try {
            const { typeId } = req.params;
            const dataToUpdate = req.body;

            const result = await typeServiceInstance.updateType(typeId, dataToUpdate);
            
            return response.QuerySuccess(res, { message: "Tipo actualizado con éxito.", data: result });

        } catch (error) {
            if (error.message.includes('not found')) {
                return response.ItemNotFound(res, "Tipo de vehículo a actualizar no encontrado.");
            }
            return response.ErrorInternal(res, "Error interno del servidor.");
        }
    }

    async delete(req, res) {
        try {
            const { typeId } = req.params;
            
            await typeServiceInstance.removeType(typeId);
            
            // Respuesta 200 sin contenido de datos o con un mensaje simple
            return response.QuerySuccess(res, { message: "Tipo de vehículo eliminado con éxito." });
        } catch (error) {
            if (error.message.includes('dependencia')) {
                return response.ErrorInternal(res, "No se puede eliminar: el tipo tiene vehículos asociados.");
            }
            if (error.message.includes('not found')) {
                return response.ItemNotFound(res, "Tipo de vehículo a eliminar no encontrado.");
            }
            return response.ErrorInternal(res, "Error interno del servidor.");
        }
    }
}
export default ControllerType;