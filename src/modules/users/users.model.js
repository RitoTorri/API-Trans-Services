// importacion del cliente de prisma
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

import Employee from '../employee/employee.model.js'
const employee = new Employee()

// variable del prisma para las consultas
const prisma = new PrismaClient()

const createUser = async (object) => {
    try {
        // Validar que el empleado exista
        const employeeExist = await employee.getEmployeeById(object.employee_id)
        if (!employeeExist) throw new Error('El empleado no existe')

        // Validar que el username no este en uso
        const userName = await prisma.users.findFirst({
            where: { username: object.username }
        })
        if (userName) throw new Error('Ya existe un usuario con ese nombre');

        // Validar que el id de empleado no este en uso
        const idEmployee = await prisma.users.findFirst({
            where: { employee_id: object.employee_id }
        })
        if (idEmployee) throw new Error('Ya existe un usuario con ese id de empleado');

        // Encriptacion + Agregacion del user
        const passwordHash = await bcrypt.hash(object.password, 10)
        const result = await prisma.users.create({
            data: {
                employee_id: object.employee_id,
                username: object.username,
                password: passwordHash,
                rol: object.rol
            }
        })
        return result
    } catch (error) { throw error; }
}

/*
    Puede recibir
    id: el user que modificara
    Se puede modfiicar esto del registro de la tabla users
    {
        employee_id: 1,
        username: 'JesusCortez',
        password: '12345',
        rol: 'administrador'
    }
*/
const UpdateUser = async (id, object) => {
    try {
        let passwordHash;

        // Validar que exista el registro
        const existUser = await prisma.users.findFirst({ where: { id: id } })
        if (!existUser) throw new Error('El usuario no existe')

        // Validar que el username no este en uso
        if (object.username) {
            const ExistUserName = await prisma.users.findFirst({
                where: { username: object.username }
            })
            if (ExistUserName) throw new Error('Ya existe un usuario con ese nombre');
        }

        if (object.employee_id) {
            // Validar que el empleado exista
            const employeeExist = await employee.getEmployeeById(object.employee_id)
            if (!employeeExist) throw new Error('El empleado no existe')

            const idEmployee = await prisma.users.findFirst({
                where: { employee_id: object.employee_id }
            })
            if (idEmployee) throw new Error('Ya existe un usuario con ese id de empleado');
        }

        if (object.password) {
            passwordHash = await bcrypt.hash(object.password, 10)
        }

        object.password = passwordHash
        const result = await prisma.users.update({
            where: { id: id },
            data: object
        })
        return result
    } catch (error) { throw error }
}

const deleteUser = async (id) => {
    try {
        // Valida que exista el registro
        const exist = await prisma.users.findFirst({ where: { id: id } })
        if (!exist) throw new Error('El usuario no existe')

        const result = await prisma.users.delete({ where: { id: id } })
        return result
    } catch (error) { throw error }
}

/*console.log(await createUser({
    employee_id: 1,
    username: 'Admin',
    password: 'Admin',
    rol: 'administrador'
}))*/

//Eliminar usuario
//console.log(await deleteUser(6))


/*console.log(await UpdateUser(1, {
    password: '12345',
}))*/
