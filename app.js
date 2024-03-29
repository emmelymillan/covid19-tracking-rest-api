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
import user from "./routes/usuario.routes.js";
import auth from "./routes/auth.routes.js";
import estadisticas from "./routes/estadisticas.route.js";

import { createServer } from "http"; // CORE MODULE, USED TO CREATE THE HTTP SERVER
const server = createServer(app); // CREATE HTTP SERVER USING APP
const port = process.env.PORT || "3000"; // INITIALIZE DEFAULT PORT OR PORT FROM ENVIRONMENT VARIABLE

// import logger from "morgan"; // TERMINAL LOGGER: SHOWS THE ROUTE AND STATUS CODE FOR EVERY REQUEST

// app.use(logger("dev")); // USE MORGAN
app.use(urlencoded({ extended: true })); // PARSE application/x-www-form-urlencoded
app.use(json()); // PARSE application/json

// CORS
// const corsOptions = {
//   origin: "http://localhost:3001",
//   optionsSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE'
  ],

  allowedHeaders: [
    '*',
  ],
};
app.use(cors(corsOpts));

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
estadisticas(app);

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
// app.listen(port);
server.listen(port);
console.log("Server listening on port " + port);

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err.stack);
});

// DB.sequelize.sync({ force: false }).then(() => {
//   console.log("Drop and Resync Db");
//   // Comentar linea de abajo despues de ejecutar una vez Y COLOCAR VALOR DE FORCE EN false
//   // initial();
// });

DB.sequelize.sync();

import DB from "./models/index.js";

const Role = DB.role;
const TipoCentroMedico = DB.tipoCentroMedico;
const Sintoma = DB.sintoma;
const Paciente = DB.paciente;
const CentroMedico = DB.centroMedico;
const Medico = DB.medico;
const Caso = DB.caso;
const Balance = DB.balance;

async function initial() {
  Role.create({
    nombre: "ADMINISTRADOR",
    description: null,
  });

  Role.create({
    nombre: "COORDINADOR",
    descripcion: null,
  });

  Role.create({
    nombre: "MEDICO",
    descripcion: null,
  });

  TipoCentroMedico.create({
    nombre: "Clínica",
  });
  TipoCentroMedico.create({
    nombre: "Hospital",
  });

  Medico.create({
    nombres: "Emmely Daniela",
    apellidos: "Millan Aguilera",
    tipo_documento: "V",
    nro_documento: "267123872",
    correo: "emmely@gmail.com",
    clave: "123456",
  });

  CentroMedico.create({
    nombre: "Centro médico de prueba",
  });

  Sintoma.create({ nombre: "Fiebre" });
  Sintoma.create({ nombre: "Tos" });
  Sintoma.create({ nombre: "Cansancio" });
  Sintoma.create({ nombre: "Pérdida del gusto o el olfato" });
  Sintoma.create({ nombre: "Congestión nasal" });
  Sintoma.create({ nombre: "Dolor de garganta" });
  Sintoma.create({ nombre: "Dolor de cabeza" });
  Sintoma.create({ nombre: "Dolores musculares o articulares" });
  Sintoma.create({ nombre: "Nauseas o vómitos" });
  Sintoma.create({ nombre: "Diarrea" });
  Sintoma.create({ nombre: "Escalofríos" });
  Sintoma.create({ nombre: "Vértigo" });
  Sintoma.create({
    nombre:
      "Erupción en la piel o decoloración de los dedos de las manos o pies",
  });
  Sintoma.create({ nombre: "Ojos rojos o irritados" });
  Sintoma.create({ nombre: "Dificultad para respirar o falta de aire" });
  Sintoma.create({ nombre: "Pérdida del habla o la movilidad, o confusión" });
  Sintoma.create({ nombre: "Temperatura alta (por encima de los 38°C)" });
  Sintoma.create({ nombre: "Dolor en el pecho" });

  generarCasos();
}

async function generarCasos() {
  await Balance.create({ total: 0, recuperados: 0, fallecidos: 0 });

  for (let index = 0; index < 10000; index++) {
    const paciente = await Paciente.create({
      nombres: "Paciente-" + index,
      apellidos: "Apellido-" + index,
      tipo_documento: "V",
      nro_documento: "26-" + index,
      fecha_nacimiento: "1998-07-31T20:43:07.945Z",
      genero:
        Math.floor(Math.random() * 100) % 2 === 0 ? "Femenino" : "Masculino",
      nro_telefono: "23423423432",
    });

    const recuperadoFlag = Math.floor(Math.random() * 100) + 1 >= 10;
    const fallecidoFlag = Math.floor(Math.random() * 100) % 7 < 2;

    if (recuperadoFlag && !fallecidoFlag) {
      Balance.increment({ total: 1, recuperados: 1 }, { where: { id: 1 } });
    } else if (!recuperadoFlag && fallecidoFlag) {
      Balance.increment({ total: 1, fallecidos: 1 }, { where: { id: 1 } });
    } else {
      Balance.increment({ total: 1 }, { where: { id: 1 } });
    }

    Caso.create({
      estado: true,
      fecha_ingreso: randomDate(new Date(2022, 0, 1), new Date()),
      fecha_recuperacion:
        recuperadoFlag && !fallecidoFlag
          ? randomDate(new Date(2022, 0, 1), new Date())
          : null,
      fecha_fallecimiento:
        !recuperadoFlag && fallecidoFlag
          ? randomDate(new Date(2022, 0, 1), new Date())
          : null,
      fk_medico: 1,
      fk_paciente: paciente.id,
      fk_centro_medico: 1,
    });
  }
}

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export default app;
