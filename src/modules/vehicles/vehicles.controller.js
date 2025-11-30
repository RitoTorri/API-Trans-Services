import vehiclesService from './vehicles.service.js'; 
import responses from '../../shared/utils/responses.js';


class vehiclesController {
    constructor() {
        this.vehiclesService = vehiclesService;
        this.createVehicle = this.createVehicle.bind(this);
        this.getVehicleByPlate = this.getVehicleByPlate.bind(this);
        this.updateVehicle = this.updateVehicle.bind(this); 
        this.deleteVehicle = this.deleteVehicle.bind(this);
        this.listAll = this.listAll.bind(this);
       
    }

    
    async createVehicle(req, res) {
        const vehicleData = req.body;

        try {
            
            const newVehicle = await this.vehiclesService.registerNewVehicle(vehicleData);

            return responses.ItemCreated(res, { 
                vehicle: newVehicle,
                message: 'Vehículo registrado exitosamente.' 
            });

        } catch (error) {
            
            if (error.message === "LICENSE_PLATE_ALREADY_EXISTS") {
                return responses.ResConflict(res, {
                    error: 'LICENSE_PLATE_ALREADY_EXISTS',
                    message: 'La placa ingresada ya está registrada en el sistema.'
                });
            }

            
            console.error('Error al crear el vehículo:', error);
            return responses.ErrorInternal(res, {
                error: error.message || 'Error desconocido al registrar el vehículo.'
            });
        }
    }

    async listAll(req, res) {
        try {
            const result = await this.vehiclesService.getVehicleList();
            
            if (result.length === 0) {
                return responses.ItemNotFound(res, "No hay vehículos registrados.");
            }
            
            return responses.QuerySuccess(res, result);
        } catch (error) {
            console.error("Error al listar todos los vehículos:", error);
            return responses.ErrorInternal(res, "Error interno del servidor al obtener la lista de vehículos.");
        }
    }

    async getVehicleByPlate(req, res) {
        
        const { license_plate } = req.params; 

        try {
           
            const vehicleDetails = await this.vehiclesService.getVehicleDetailsByPlate(license_plate);

            
            return responses.QuerySuccess(res, { 
                vehicle: vehicleDetails,
                message: 'Detalles del vehículo obtenidos exitosamente.'
            });

        } catch (error) {
            
           
            if (error.message === "VEHICLE_NOT_FOUND") {
                return responses.ItemNotFound(res, { 
                    error: 'VEHICLE_NOT_FOUND',
                    message: `No se encontró ningún vehículo con la placa ${license_plate}.`
                });
            }

           
            console.error('Error al obtener el vehículo por placa:', error);
            return responses.ErrorInternal(res, {
                error: error.message || 'Ocurrió un error inesperado al buscar el vehículo.'
            });
        }
    }

    async updateVehicle(req, res) {
        const { license_plate } = req.params;
        const updateData = req.body;

        try {
            const updatedVehicle = await this.vehiclesService.updateVehicleDetails(license_plate, updateData);

            return responses.QuerySuccess(res, {
                vehicle: updatedVehicle,
                message: 'Vehículo actualizado exitosamente.'
            });

        } catch (error) {
            if (error.message === "VEHICLE_NOT_FOUND") {
                return responses.ItemNotFound(res, { 
                    error: 'VEHICLE_NOT_FOUND',
                    message: `No se encontró el vehículo con la placa ${license_plate} para actualizar.`
                });
            }
            
            console.error('Error al actualizar el vehículo:', error);
            return responses.ErrorInternal(res, { error: error.message || 'Error inesperado.' });
        }
    }

    async deleteVehicle(req, res) {
        const { license_plate } = req.params;

        try {
            await this.vehiclesService.deleteVehicleByPlate(license_plate);

            return responses.QuerySuccess(res, {
                message: `El vehículo con placa ${license_plate} ha sido desactivado exitosamente.`,
                is_active: false
            });

        } catch (error) {
            if (error.message === "VEHICLE_NOT_FOUND") {
                return responses.ItemNotFound(res, { 
                    error: 'VEHICLE_NOT_FOUND',
                    message: `No se encontró el vehículo con la placa ${license_plate} para eliminar.`
                });
            }
            console.error('Error al eliminar el vehículo:', error);
            return responses.ErrorInternal(res, { error: error.message || 'Error inesperado.' });
        }
    }

}

export default  new vehiclesController();