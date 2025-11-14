// imports
import { PrismaClient } from '@prisma/client';
import e from 'express';

// variables e instancias
const prisma = new PrismaClient();

class ModelEmployee {
    constructor() { }

    // Método para consultar todos los empleados
    async getAllEmployees(data, idMyself) {
        try {
            // si el filtro es "all" devolver todos los empleados
            if (data.filterSearch === 'all') return await prisma.employees.findMany({
                where: {
                    is_active: data.is_active,
                },
                orderBy: { id: 'asc' },
                include: {
                    employee_contacts: true
                }
            });

            // devuelve los empleados que cumplen con los filtros
            return await prisma.employees.findMany({
                where: {
                    ...data,
                },
                orderBy: { id: 'asc' },
                include: {
                    employee_contacts: {
                        where: { is_active: data.is_active },
                    }
                }
            });
        } catch (error) { throw error; }
    }

    // Método para crear un empleado
    async createEmployee(employee, contacts) {
        try {
            const addResult = await prisma.$transaction(async (e) => { // transaccion 

                const employeeResult = await e.employees.create({ // crear empleado
                    data: employee
                });

                // crear contactos
                const contacsModify = contacts.map(contact => ({
                    ...contact,
                    employee_id: employeeResult.id
                }));

                const contactsResult = await e.employee_contacts.createMany({ // crear contactos
                    data: contacsModify
                });

                return {
                    employeeResult,
                    contacts_result: {
                        message: "Contacts created successfully.",
                        data: contactsResult
                    }
                };
            });

            return addResult;
        } catch (error) { throw error; }
    }

    // Método para eliminar un empleado
    async deleteEmployee(object) {
        try {
            return await prisma.employees.update({
                where: { id: object.id },
                data: { is_active: false }
            });
        } catch (error) { throw error; }
    }

    // Método para actualizar un empleado
    async updateEmployee(object, idEmployee) {
        try {
            return await prisma.employees.update({
                where: { id: idEmployee },
                data: object
            });
        } catch (error) { throw error; }
    }

    // Método para restaurar un empleado
    async restoreEmployee(id) {
        try {
            return await prisma.employees.update({
                where: { id: id },
                data: { is_active: true }
            });
        } catch (error) { throw error; }
    }

    // Método para consultar un empleado por su id
    async getEmployeeById(id) {
        try {
            return await prisma.employees.findFirst({
                where: { id: id, is_active: true }
            });
        } catch (error) { throw error; }
    }

    async getEmployeedDeletedById(id) {
        try {
            return await prisma.employees.findFirst({
                where: { id: id, is_active: false }
            });
        } catch (error) { throw error; }
    }

    async getEmployeeByCi(ci) {
        try {
            return await prisma.employees.findFirst({
                where: { ci: ci, is_active: true }
            });
        } catch (error) { throw error; }
    }
}

export default ModelEmployee;