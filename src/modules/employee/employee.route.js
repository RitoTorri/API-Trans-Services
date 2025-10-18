// imports
import express from 'express';
import ControllerEmployee from './employee.controller.js';
import middlewares from './employee.middleware.js';

// variables e instancias
const router = express.Router();
const controller = new ControllerEmployee();

/*
    :active: true o false, buscas solo los empleados activos o inactivos
    :filter: all, ci, name, busca solo los empleados con ci, nombre o todos
    /employees/search/:active/:filter
*/
router.get('/employees/search/:active/:filter', middlewares.middlewareGetEmployee, controller.getAllEmployees);

// crear un empleado
router.post('/employee', middlewares.middlewareCreateEmployee, controller.createEmployee);

// eliminar un empleado
//router.delete('/emmployee/:id');

// actualizar un empleado
//router.patch('/employee/:id');

export default router;