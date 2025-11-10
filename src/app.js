// import
import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import swagger from 'swagger-ui-express';
import { createRequire } from 'module'; // ← Importa createRequire
import cors from "cors";

// Importa swagger.json
const require = createRequire(import.meta.url);
const swaggerSpec = require('../docs/swagger.json'); // ← Así funciona

// import routes
import authRoute from "./modules/auth/auth.route.js";
import employeeRoute from "./modules/employee/employee.route.js";
import typeRoutes from './modules/types_of_vehicles/types_of_vehicles.route.js';

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
app.use(`${urlApiBase}/docs`, swagger.serve, swagger.setup(swaggerSpec)); // swagger
app.use(urlApiBase, authRoute);
app.use(urlApiBase, employeeRoute);
app.use(urlApiBase, typeRoutes);

export default app;