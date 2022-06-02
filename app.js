import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
import { join } from "path";
import pkg from "body-parser";
const { urlencoded, json } = pkg;
import usuario from "./routes/usuarioRoutes.js";
import roles from "./routes/roleRoutes.js";
import tipoCentroMedico from "./routes/tipoCentroMedicoRoutes.js";
import centroMedico from "./routes/centroMedicoRoutes.js";
import medico from "./routes/medicoRoutes.js";
import paciente from "./routes/pacienteRoutes.js";
import sintoma from "./routes/sintomaRoutes.js";
import caso from "./routes/casoRoutes.js";
import permiso from "./routes/permisoRoutes.js";

import { createServer } from "http"; // CORE MODULE, USED TO CREATE THE HTTP SERVER
const server = createServer(app); // CREATE HTTP SERVER USING APP
const port = process.env.PORT || "3000"; // INITIALIZE DEFAULT PORT OR PORT FROM ENVIRONMENT VARIABLE

import logger from "morgan"; // TERMINAL LOGGER: SHOWS THE ROUTE AND STATUS CODE FOR EVERY REQUEST

// // VIEW ENGINE SETUP
// app.set("views", join(__dirname, "views"));
// app.set("view engine", "ejs");

// USE STATIC FILES (CSS, JS, IMAGES)
// app.use(static(join(__dirname, 'public')));

app.use(logger("dev")); // USE MORGAN
app.use(urlencoded({ extended: false })); // PARSE application/x-www-form-urlencoded
app.use(json()); // PARSE application/json

// CORS
app.all("/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// SECURITY
app.disable("x-powered-by");

// RUTAS
usuario(app);
roles(app);
tipoCentroMedico(app);
centroMedico(app);
medico(app);
paciente(app);
sintoma(app);
caso(app);
permiso(app);

app.set("port", port);
server.listen(port);
console.log("Server listening on port " + port);

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err.stack);
});

export default app;
