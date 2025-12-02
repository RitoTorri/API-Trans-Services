import repairsService from './repairs.service.js'; 
import responses from '../../shared/utils/responses.js'; 

class RepairsController {
    constructor() {
        this.repairsService = repairsService;
    }

    // 1. REGISTRAR / AGREGAR (POST /registerRepair)
    async registerRepair(req, res) {
        try {
            const repairData = req.body;
            
            const newRepair = await this.repairsService.registerNewRepair(repairData);
            
            return responses.ItemCreated(res, newRepair, "Reparación registrada exitosamente.");
        
        } catch (error) {
            console.error("Error al registrar reparación:", error.message);

            // Manejo de errores específicos desde el servicio
            if (error.message === "VEHICLE_NOT_FOUND_OR_INACTIVE") {
                return responses.ItemNotFound(res, "El vehículo especificado no fue encontrado o está inactivo.");
            }
            if (error.message === "VEHICLE_ID_INVALID") {
                return responses.BadRequest(res, { message: "El ID de vehículo proporcionado es inválido." });
            }

            return responses.ErrorInternal(res, "Error interno del servidor al registrar la reparación.");
        }
    }
    
    // 2. CONSULTAR TODO (GET /findAll)
    async listAll(req, res) {
    try {
        const repairs = await this.repairsService.getRepairsList();

        if (repairs.length === 0) {
             return responses.ItemNotFound(res, "No hay reparaciones registradas.");
        }
        
        // **LÍNEA CORREGIDA**
        return responses.QuerySuccess(res, repairs, 'Lista de reparaciones recuperada exitosamente.');
        
    } catch (error) {
        console.error("Error al obtener lista de reparaciones:", error);
        // ... (Error interno permanece igual)
    }
}
    
    // 3. CONSULTAR POR FECHA (GET /findByDateRange?startDate=...&endDate=...)
    async getRepairsByDateRange(req, res) {
        try {
            // Las fechas vienen de query params y están validadas por el middleware
            const { startDate, endDate } = req.query; 

            const repairs = await this.repairsService.getRepairsByDateRange(startDate, endDate);

            if (repairs.length === 0) {
                 return responses.ItemNotFound(res, "No se encontraron reparaciones en el rango de fechas especificado.");
            }
            
            return responses.QuerySuccess(res, repairs, 'Reparaciones encontradas por rango de fechas.');
        } catch (error) {
            console.error("Error al consultar reparaciones por fecha:", error);
            // El middleware y el servicio manejan la mayoría de errores, aquí solo queda el error interno.
            return responses.ErrorInternal(res, "Error interno del servidor al buscar por fecha.");
        }
    }
    
    // 4. EDITAR / ACTUALIZAR (PUT /updateRepair/:repairId)
    async updateRepairDetails(req, res) {
        try {
            const { repairId } = req.params; // Viene validado y parseado por middleware
            const updateData = req.body;

            const updatedRepair = await this.repairsService.updateRepairDetails(repairId, updateData);
            
            return responses.QuerySuccess(res, updatedRepair, "Reparación actualizada exitosamente.");

        } catch (error) {
            console.error("Error al actualizar reparación:", error.message);
            if (error.message === "REPAIR_NOT_FOUND") {
                return responses.ItemNotFound(res, "La reparación a actualizar no fue encontrada.");
            }
            return responses.ErrorInternal(res, "Error interno del servidor al actualizar la reparación.");
        }
    }
}

export default new RepairsController();