import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class TaxParametersModel {
    constructor() { }

    async getTaxParameters() {
        try {
            return await prisma.tax_parameters.findMany();
        } catch (error) { throw error; }
    }
}

export default TaxParametersModel;