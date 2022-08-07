import { list, findOne, create } from "../controllers/paciente.controller.js";

export default (app) => {
  app.use((req, res, next) => {
    const allowedOrigins = [
      "http://127.0.0.1:3001",
      "http://localhost:3000",
      "http://127.0.0.1:9000",
      "https://covid19-tracking-em.herokuapp.com",
    ];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
    //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PUT, POST, DELETE, OPTIONS"
    );
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    res.append("Access-Control-Expose-Headers", "Content-Range");
    res.append("Content-Range", 5);
    next();
  });

  /**
   * @swagger
   * /pacientes:
   *  get:
   *      summary: Webservice para obtener la lista de paciente.
   *      tags: [Pacientes]
   *      security:
   *          - ApiKeyAuth: []
   *      responses:
   *          '200':
   *              description: ok
   *
   */
  app.get("/pacientes", list);

  /**
   * @swagger
   * /pacientes:
   *  post:
   *      summary: Webservice para crear pacientes.
   *      tags: [Pacientes]
   *      security:
   *          - ApiKeyAuth: []
   *      requestBody:
   *          required: true
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Paciente'
   *      responses:
   *          "200":
   *            description: Paciente creado.
   *            content:
   *               application/json:
   *                schema:
   *                  $ref: '#/components/schemas/Paciente'
   */
  app.post("/pacientes", create);

  /**
   * @swagger
   * /pacientes/{id}:
   *  get:
   *      summary: Webservice para obtener un solo paciente.
   *      tags: [Pacientes]
   *      security:
   *          - ApiKeyAuth: []
   *      parameters:
   *          - in: path
   *            name: id
   *            schema:
   *              type: integer
   *              required: true
   *              description: El ID del paciente a editar
   *      responses:
   *          '200':
   *              description: ok
   *
   */
  app.get("/pacientes/:id", findOne);
};
