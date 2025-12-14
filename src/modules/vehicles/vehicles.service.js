import vehiclesModel from './vehicles.model.js';
import { Prisma } from '@prisma/client';
class vehiclesServices{
    constructor(){
        this.vehiclesModel = vehiclesModel;
    }

    async registerNewVehicle(vehicleData) {
        try {
            // 1. Llamar al Modelo para crear el vehículo
            return await this.vehiclesModel.createVehicle(vehicleData);
        } catch (error) {
            // 2. Manejo específico del error de Placa Duplicada (P2002)
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // El código P2002 es el código estándar de Prisma para la violación de una restricción UNIQUE
                if (error.code === 'P2002' && error.meta?.target.includes('license_plate')) {
                    // Lanzar un error específico que el Controlador pueda manejar
                    throw new Error("LICENSE_PLATE_ALREADY_EXISTS");
                }
            }
            
            throw error;
        }
    }

    async getVehicleList() {
        try {
            
            const result = await this.vehiclesModel.findAllVehicles();
            
            
            if (!result || result.length === 0) {
                 return []; 
            }
            return result;

        } catch (error) {
            throw error;
        }
    }

    async getVehicleDetailsByPlate(licensePlate) {
        try {
            const vehicle = await this.vehiclesModel.findVehicleByPlate(licensePlate);

            
            if (!vehicle) {
                
                throw new Error("VEHICLE_NOT_FOUND");
            }

            
            return vehicle;
        } catch (error) {
            
            throw error;
        }
    }

    async updateVehicleDetails(licensePlate, updateData) {
        try {
            
            const updatedVehicle = await this.vehiclesModel.updateVehicleByPlate(licensePlate, updateData);
            return updatedVehicle;
        } catch (error) {
        
            if (error.code === 'P2025') {
                throw new Error("VEHICLE_NOT_FOUND");
            }
            throw error;
        }
    }

    async deleteVehicleByPlate(licensePlate) {
        try {
            
            const deletedVehicle = await this.vehiclesModel.deleteVehicleByPlate(licensePlate);
            return deletedVehicle;
        } catch (error) {
            
            if (error.code === 'P2025') {
                throw new Error("VEHICLE_NOT_FOUND");
            }
            throw error;
        }
    }

    async reactivateVehicle(license_plate) {
        try {
            // Intenta reactivar el vehículo
            const vehicle = await this.vehiclesModel.reactivateByPlate(license_plate);
            return vehicle;

        } catch (error) {
            // P2025 es el código de error de Prisma si no encuentra el registro
            if (error.code === 'P2025') {
                
                // Verificamos si existe pero está activo (error de semántica)
                const existingVehicle = await this.vehiclesModel.findByPlate(license_plate);
                
                if (!existingVehicle) {
                    // Si no existe en absoluto
                    throw new Error("VEHICLE_NOT_FOUND");
                }

                if (existingVehicle.is_active === true) {
                    // Si existe pero ya está activo
                    throw new Error("VEHICLE_ALREADY_ACTIVE");
                }
            }

            // Si es otro error de Prisma o error desconocido, lo lanzamos
            throw error;
        }
    }

    async findAvailableByDate(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        try {
            // 1. Delegar la consulta compleja al Model
            const availableVehicles = await this.vehiclesModel.findAvailableVehiclesByDate(start, end);

            // 2. Formatear la respuesta
            return availableVehicles.map(vehicle => ({
                id: vehicle.id,
                license_plate: vehicle.license_plate,
                model: vehicle.vehicle_model.name,
                driver: {
                    id: vehicle.employees.id,
                    name: `${vehicle.employees.name} ${vehicle.employees.lastname}`,
                    employee_code: vehicle.employees.ci, 
                },
            }));

        } catch (error) {
            console.error("Error en findAvailableByDate (Service):", error);
            // Relanzar un error genérico para el Controller
            throw new Error("Error al consultar la disponibilidad de vehículos.");
        }
    }
}

export default new vehiclesServices();