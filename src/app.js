// import
import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cors from "cors";

// import routes
import authRoute from "./modules/auth/auth.route.js";
import employeeRoute from "./modules/employee/employee.route.js";
import employeeContactsRoute from "./modules/employee_contacts/employee.contacts.route.js";
import payrollsRoute from "./modules/payrolls/payrolls.route.js";

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
app.use(urlApiBase, employeeContactsRoute);
app.use(urlApiBase, payrollsRoute);

export default app;