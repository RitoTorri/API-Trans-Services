// import
import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cors from "cors";


// import routes
import authRoute from "./modules/auth/auth.route.js";
import employeeRoute from "./modules/employee/employee.route.js";
import employeeContactsRoute from "./modules/employee_contacts/employee.contacts.route.js";
<<<<<<< Updated upstream
=======
import payrollsRoute from "./modules/payrolls/payrolls.route.js";
import clientsRoute from "./modules/clients/clients.route.js";
import usersRoute from "./modules/users/users.route.js";
import providerRoute from './modules/provider/provider.route.js';
import providerContactsRoute from './modules/provider_contacts/provider.contacts.route.js';
import providerInvoicesRoute from './modules/provider_invoices/provider.invoices.route.js';

>>>>>>> Stashed changes

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
<<<<<<< Updated upstream

=======
app.use(urlApiBase, payrollsRoute);
app.use(urlApiBase, clientsRoute);
app.use(urlApiBase, usersRoute);
app.use(urlApiBase, providerRoute);
app.use(urlApiBase, providerContactsRoute);
app.use(urlApiBase, providerInvoicesRoute);
>>>>>>> Stashed changes

export default app;