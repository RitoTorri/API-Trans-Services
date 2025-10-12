// import
import express from "express";
import morgan from "morgan";
import cors from "cors";

// import routes

// initializations
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

// routers
const urlApiBase = '/api/trans/services';

// ejemplo de ruta -> app.use(urlApiBase, router);

export default app;