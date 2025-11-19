// import
import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cors from "cors";

// import routes
import authRoute from "./modules/auth/auth.route.js";
import employeeRoute from "./modules/employee/employee.route.js";
import typeRoutes from './modules/types_of_vehicles/types_of_vehicles.route.js';
import employeeContactsRoute from "./modules/employee_contacts/employee.contacts.route.js";
import payrollsRoute from "./modules/payrolls/payrolls.route.js";
import clientsRoute from "./modules/clients/clients.route.js";
import usersRoute from "./modules/users/users.route.js";
import servicesRoute from "./modules/services/services.route.js";
import vehicleRoute from "./modules/vehicles/vehicles.route.js";


// initializations
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// limit requests
const globalLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 60,
    message: {
        status: 429,
        error: 'Too many requests from this IP. Please try again in 5 minutes.',
        headers: {
            'Retry-After': 300
        }
    }
})

// routers
const urlApiBase = '/api/trans/services';

// ejemplo de ruta -> app.use(urlApiBase, router);
app.use(globalLimiter);
app.use(urlApiBase, authRoute);
app.use(urlApiBase, employeeRoute);
app.use(urlApiBase, typeRoutes);
app.use(urlApiBase, employeeContactsRoute);
app.use(urlApiBase, payrollsRoute);
app.use(urlApiBase, clientsRoute);
app.use(urlApiBase, usersRoute);
app.use(urlApiBase, servicesRoute);
app.use(urlApiBase, vehicleRoute);

export default app;