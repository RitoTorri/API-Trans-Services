import types_of_vehicles from './types_of_vehicles.model.js';

class typesServices {
    constructor(){
        this.types_of_vehicles = types_of_vehicles;
    }

    /**
     * Obtiene todos los tipos de vehículos.
     */
    async getTypes() {
        try {
            // Lógica de negocio: ninguna, solo llama al modelo
            const types = await this.types_of_vehicles.findAllTypes();
            
            // Lógica de negocio: Manejo de resultado vacío
            if (types.length === 0) {
                // Lanza un error para que el controlador lo capture
                throw new Error('vehicle types not found.'); 
            }
            
            return types;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Obtiene un tipo por su ID.
     */
    async getTypeByName(typeName) {
        try {
            // 1. Validar que el nombre no sea nulo o una cadena vacía
            if (!typeName) {
                throw new Error('Type name not provided.');
            }
            
            // 2. Llamar al método del Modelo que busca por type_name
            // ¡Asegúrate de que 'this.types_of_vehicles.findTypeByName' apunte a la nueva función!
            const type = await this.types_of_vehicles.findTypeByName(typeName);

            // 3. Verificar si Prisma encontró el registro
            if (!type) {
                // Se lanza un error que será capturado por el Controlador
                throw new Error('vehicle type not found.'); 
            }
            
            return type;
        } catch (error) {
            throw error;
        }
    }

    async registerNewType(typeData) {
        try {
            const { type_name } = typeData;

            // Lógica de negocio: Validar campos obligatorios
            if (!type_name || type_name.trim() === '') {
                throw new Error("Type name is required.");
            }
            
            // El modelo se encargará de la unicidad gracias a Prisma.

            const newType = await this.types_of_vehicles.createType(typeData);
            return newType;
        } catch (error) {
            // Aquí puedes capturar errores específicos de la DB (ej. duplicidad)
            if (error.code === 'P2002') { // P2002 es el código de error de unicidad en Prisma
                throw new Error("El nombre de tipo ya existe (duplicado).");
            }
            throw error;
        }
    }

    /**
     * Actualiza un tipo de vehículo.
     */
    async updateType(typeId, dataToUpdate) {
        try {
            // 1. Lógica de Negocio: Verificar que el registro exista antes de actualizar
            const existingType = await this.types_of_vehicles.findTypeById(typeId);
            if (!existingType) {
                throw new Error('vehicle type not found.');
            }
            
            // 2. Llamar al modelo para actualizar
            const updatedType = await this.types_of_vehicles.updateType(typeId, dataToUpdate);
            return updatedType;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Elimina un tipo de vehículo.
     */
    async removeType(typeId) {
        try {
            // 1. Lógica de Negocio: Verificar que el registro exista antes de eliminar
            const existingType = await this.types_of_vehicles.findTypeById(typeId);
            if (!existingType) {
                throw new Error('vehicle type not found.');
            }

            // 2. Llamar al modelo para eliminar
            const deletedType = await this.types_of_vehicles.deleteType(typeId);
            return deletedType;
        } catch (error) {
            // Manejo de error de dependencia (ej. si el tipo está asignado a un vehículo)
            if (error.code === 'P2003') { // P2003 es el código de error de clave foránea en Prisma
                 throw new Error("No se puede eliminar (dependencia): El tipo tiene vehículos asociados.");
            }
            throw error;
        }
    }


}

// Exporta la clase para que el Controller pueda instanciarla
export default typesServices;