// const express = require("express");
// const bodyParser = require("body-parser");
// const db = require("./queries");
// const app = express();
// const port = 3000;

// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.get("/municipios", db.getMunicipios);

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

import dotenv from "dotenv";
dotenv.config();

import express from "express"; // BRING IN EXPRESS
const app = express(); // INITILIZE APP
import { join } from "path";
import pkg from "body-parser";
const { urlencoded, json } = pkg;
import users from "./routes/userRoutes.js"; // USER ROUTES
import roles from "./routes/roleRoutes.js"; // ROLES ROUTES
import tipoCentroMedico from "./routes/tipoCentroMedicoRoutes.js"; // TCM ROUTES
import centroMedico from "./routes/centroMedicoRoutes.js"; // CM ROUTES
import medico from "./routes/medicoRoutes.js"; // CM ROUTES

import { createServer } from "http"; // CORE MODULE, USED TO CREATE THE HTTP SERVER
const server = createServer(app); // CREATE HTTP SERVER USING APP
const port = process.env.PORT || "3000"; // INITIALIZE DEFAULT PORT OR PORT FROM ENVIRONMENT VARIABLE

import logger from "morgan"; // TERMINAL LOGGER: SHOWS THE ROUTE AND STATUS CODE FOR EVERY REQUEST

// // VIEW ENGINE SETUP
// app.set("views", join(__dirname, "views"));
// app.set("view engine", "ejs");

app.use(logger("dev")); // USE MORGAN
app.use(urlencoded({ extended: false })); // PARSE application/x-www-form-urlencoded
app.use(json()); // PARSE application/json

// USE STATIC FILES (CSS, JS, IMAGES)
// app.use(static(join(__dirname, 'public')));

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

// ROUTES
users(app); // USERS ROUTES
roles(app); // ROLES ROUTES
tipoCentroMedico(app); // TCM ROUTES
centroMedico(app); // CM ROUTES
medico(app); // MEDICOS ROUTES


/*
 * START SERVER
 */

// SET THE PORT
app.set("port", port);

// LISTEN ON SPECIFIED PORT
server.listen(port);

// LOG WHICH PORT THE SERVER IS RUNNING ON
console.log("Server listening on port " + port);

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err.stack);
});

// EXPORT APP
export default app;
