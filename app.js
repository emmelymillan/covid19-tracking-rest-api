import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
import cors from "cors";
import pkg from "body-parser";
const { urlencoded, json } = pkg;
import roles from "./routes/role.route.js";
import tipoCentroMedico from "./routes/tipoCentroMedico.route.js";
import centroMedico from "./routes/centroMedico.route.js";
import medico from "./routes/medico.route.js";
import paciente from "./routes/paciente.route.js";
import sintoma from "./routes/sintoma.route.js";
import caso from "./routes/caso.route.js";
import permiso from "./routes/permiso.route.js";
import user from "./routes/usuario.routes.js";
import auth from "./routes/auth.routes.js";

import { createServer } from "http"; // CORE MODULE, USED TO CREATE THE HTTP SERVER
const server = createServer(app); // CREATE HTTP SERVER USING APP
const port = process.env.PORT || "3000"; // INITIALIZE DEFAULT PORT OR PORT FROM ENVIRONMENT VARIABLE

import logger from "morgan"; // TERMINAL LOGGER: SHOWS THE ROUTE AND STATUS CODE FOR EVERY REQUEST

app.use(logger("dev")); // USE MORGAN
app.use(urlencoded({ extended: true })); // PARSE application/x-www-form-urlencoded
app.use(json()); // PARSE application/json

// CORS
const corsOptions = {
  origin: "http://localhost:3001",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// SECURITY
app.disable("x-powered-by");
app.set("Access-Control-Expose-Headers", "Content-Range");

// RUTAS
roles(app);
tipoCentroMedico(app);
centroMedico(app);
medico(app);
paciente(app);
sintoma(app);
caso(app);
permiso(app);

// RUTAS DE LOGIN Y TEST
auth(app);
user(app);

// Para la documentación del API
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Covid-19 Tracking REST API",
      version: "0.1.0",
      description: "REST API para mi tesis",
      contact: {
        name: "Emmely Millán",
        email: "edmillan.16@est.ucab.edu.ve",
      },
    },
  },
  apis: ["./routes/*.js "],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// ************************************************** //

app.set("port", port);
server.listen(port);
console.log("Server listening on port " + port);

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err.stack);
});

/*
  initial() function helps us to create 3 rows in database.
  In development, you may need to drop existing tables and re-sync database. 
  So you can use force: true as code above.

  For production, just insert these rows manually and use sync() without parameters 
  to avoid dropping data: 

  DB.sequelize.sync();
*/

DB.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
  initial();
});

import DB from "./models/index.js";

const Role = DB.role;
const TipoCentroMedico = DB.tipoCentroMedico;

function initial() {
  Role.create({
    nombre: "USER",
    description: null,
  });

  Role.create({
    nombre: "MODERATOR",
    descripcion: null,
  });

  Role.create({
    nombre: "ADMIN",
    descripcion: null,
  });

  TipoCentroMedico.create({
    nombre: "Clínica",
  });
  TipoCentroMedico.create({
    nombre: "Hospital",
  });
}

export default app;
