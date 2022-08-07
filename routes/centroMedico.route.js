import {
  list,
  create,
  findOne,
  update,
  destroy,
} from "../controllers/centroMedico.controller.js";

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
   * /centros-medicos:
   *  get:
   *      summary: Webservice para obtener la lista de centros medicos.
   *      tags: [Centros Medicos]
   *      security:
   *          - ApiKeyAuth: []
   *      responses:
   *          '200':
   *              description: ok
   *
   */
  app.get("/centros-medicos", list);

  /**
   * @swagger
   * /centros-medicos:
   *  post:
   *      summary: Webservice para crear centro medico.
   *      tags: [Centros Medicos]
   *      security:
   *          - ApiKeyAuth: []
   *      requestBody:
   *          required: true
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/CentroMedico'
   *      responses:
   *          "200":
   *            description: Centro medico creado.
   *            content:
   *               application/json:
   *                schema:
   *                  $ref: '#/components/schemas/CentroMedico'
   */
  app.post("/centros-medicos", create);

  /**
   * @swagger
   * /centros-medicos/{id}:
   *  get:
   *      summary: Webservice para obtener un solo centro médico.
   *      tags: [Centros Medicos]
   *      security:
   *          - ApiKeyAuth: []
   *      responses:
   *          '200':
   *              description: ok
   *
   */
  app.get("/centros-medicos/:id", findOne);

  /**
   * @swagger
   * /centros-medicos/{id}:
   *   put:
   *      summary: Webservice para editar/actualizar centro medico.
   *      tags: [Centros Medicos]
   *      security:
   *          - ApiKeyAuth: []
   *      requestBody:
   *          required: true
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/CentroMedico'
   *      parameters:
   *          - in: path
   *            name: id
   *            schema:
   *              type: integer
   *              required: true
   *              description: El ID del centro medico a editar
   *      responses:
   *          "200":
   *            description: Centro medico editado exitosamente.
   */
  app.put("/centros-medicos/:id", update);

  /**
   * @swagger
   * /centros-medicos/{id}:
   *   delete:
   *      summary: Webservice para eliminar caso.
   *      tags: [Centros Medicos]
   *      security:
   *          - ApiKeyAuth: []
   *      parameters:
   *          - in: path
   *            name: id
   *            schema:
   *              type: integer
   *              required: true
   *              description: El ID del centro medico a eliminar
   *      responses:
   *          "200":
   *            description: Centro medico eliminado exitosamente.
   */
  app.delete("/centros-medicos/:id", destroy);
};
