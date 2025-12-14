// src/modules/vehicleModel/vehicleModel.controller.js

import vehicleModelService from './vehicle_model.service.js';
import responses from '../../shared/utils/responses.js';

class VehicleModelController {
    constructor() {
        this.vehicleModelService = vehicleModelService;
        // Bind para asegurar que 'this' funcione correctamente en las rutas
        this.listAllModels = this.listAllModels.bind(this);
        this.createModel = this.createModel.bind(this);
        this.updateModel = this.updateModel.bind(this);
        this.deleteModel = this.deleteModel.bind(this);
    }

    // 1. GET /vehicle-models
    async listAllModels(req, res) {
        try {
            const models = await this.vehicleModelService.getModelList();

            if (models.length === 0) {
                return responses.ItemNotFound(res, "No hay modelos de vehículos registrados.");
            }

            return responses.QuerySuccess(res, models);
        } catch (error) {
            console.error('Error al listar modelos:', error);
            return responses.ErrorInternal(res, "Error interno al obtener la lista de modelos.");
        }
    }

    // 2. POST /vehicle-models
    async createModel(req, res) {
        const modelData = req.body;
        try {
            const newModel = await this.vehicleModelService.registerNewModel(modelData);

            return responses.ItemCreated(res, {
                model: newModel,
                message: 'Modelo de vehículo registrado exitosamente.'
            });
        } catch (error) {
            if (error.message === "MODEL_NAME_ALREADY_EXISTS") {
                return responses.ResConflict(res, {
                    error: 'MODEL_NAME_ALREADY_EXISTS',
                    message: `El nombre del modelo '${modelData.name}' ya existe.`
                });
            }
            console.error('Error al crear modelo:', error);
            return responses.ErrorInternal(res, "Error desconocido al registrar el modelo.");
        }
    }

    // 3. PUT /vehicle-models/:id
    async updateModel(req, res) {
        const id = req.params.id;
        const updateData = req.body;

        try {
            const updatedModel = await this.vehicleModelService.updateModelDetails(id, updateData);

            return responses.QuerySuccess(res, {
                model: updatedModel,
                message: 'Modelo de vehículo actualizado exitosamente.'
            });

        } catch (error) {
            if (error.message === "MODEL_NOT_FOUND") {
                return responses.ItemNotFound(res, "No se encontró el modelo para actualizar.");
            }
            if (error.message === "MODEL_NAME_ALREADY_EXISTS") {
                return responses.ResConflict(res, {
                    error: 'MODEL_NAME_ALREADY_EXISTS',
                    message: `El nombre del modelo '${updateData.name}' ya existe.`
                });
            }
            console.error('Error al actualizar modelo:', error);
            return responses.ErrorInternal(res, "Error inesperado al actualizar el modelo.");
        }
    }

    // 4. DELETE /vehicle-models/:id
    async deleteModel(req, res) {
        const id = req.params.id;
        try {
            await this.vehicleModelService.deleteModel(id);

            return responses.QuerySuccess(res, {
                message: 'Modelo de vehículo eliminado exitosamente.'
            });
        } catch (error) {
            if (error.message === "MODEL_NOT_FOUND") {
                return responses.ItemNotFound(res, "No se encontró el modelo para eliminar.");
            }
            if (error.message === "MODEL_IN_USE") {
                return responses.ResConflict(res, {
                    error: 'MODEL_IN_USE',
                    message: "No se puede eliminar el modelo porque está asignado a uno o más vehículos."
                });
            }
            console.error('Error al eliminar modelo:', error);
            return responses.ErrorInternal(res, "Error inesperado al eliminar el modelo.");
        }
    }
}

export default new VehicleModelController();