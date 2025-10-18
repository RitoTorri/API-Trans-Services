// imports
import ModelEmployee from './employee.model.js';

// variables e instancias
const model = new ModelEmployee();

class ServiceEmployee {
    constructor() { }

    async getAllEmployees(data) {
        try {
            // debugger
            console.log("Estamos en el servicio");
            console.log(data);

            return await model.getAllEmployees(data);
        } catch (error) { throw error; }
    }

    async createEmployee(object) {
        try {
            // debugger
            console.log("Estamos en el servicio");
            console.log(object);

            const exist = await model.getAllEmployees({ ci: object.ci });
            console.log(exist);
            if (exist.length > 0) throw new Error('Employee exists ci.');

            return await model.createEmployee(object);
        } catch (error) { throw error; }
    }
}

export default ServiceEmployee;