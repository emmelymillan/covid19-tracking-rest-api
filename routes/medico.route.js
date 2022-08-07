import {
  list,
  create,
  update,
  destroy,
  findOne,
} from "../controllers/medico.controller.js";
import verifySignUp from "../middleware/verifySignUp.js";

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
   * /medicos:
   *  get:
   *      summary: Webservice para obtener la lista de medicos.
   *      tags: [Medicos]
   *      security:
   *          - ApiKeyAuth: []
   *      responses:
   *          '200':
   *              description: ok
   *
   */
  app.get("/medicos", list);

  /**
   * @swagger
   * /medicos:
   *  post:
   *      summary: Webservice para crear medico.
   *      tags: [Medicos]
   *      security:
   *          - ApiKeyAuth: []
   *      requestBody:
   *          required: true
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Medico'
   *      responses:
   *          "200":
   *            description: Medico creado.
   *            content:
   *               application/json:
   *                schema:
   *                  $ref: '#/components/schemas/Medico'
   */
  app.post("/medicos", [verifySignUp.checkDuplicateUsernameOrEmail], create);

  /**
   * @swagger
   * /medicos/{id}:
   *  get:
   *      summary: Webservice para obtener un solo medico.
   *      tags: [Medicos]
   *      security:
   *          - ApiKeyAuth: []
   *      responses:
   *          '200':
   *              description: ok
   *
   */
  app.get("/medicos/:id", findOne);

  /**
   * @swagger
   * /medicos/{id}:
   *   put:
   *      summary: Webservice para editar/actualizar medico.
   *      tags: [Medicos]
   *      security:
   *          - ApiKeyAuth: []
   *      requestBody:
   *          required: true
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Medico'
   *      parameters:
   *          - in: path
   *            name: id
   *            schema:
   *              type: integer
   *              required: true
   *              description: El ID del medico a editar
   *      responses:
   *          "200":
   *            description: Medico editado exitosamente.
   */
  app.put("/medicos/:id", update);

  /**
   * @swagger
   * /medicos/{id}:
   *   delete:
   *      summary: Webservice para eliminar medico.
   *      tags: [Medicos]
   *      security:
   *          - ApiKeyAuth: []
   *      parameters:
   *          - in: path
   *            name: id
   *            schema:
   *              type: integer
   *              required: true
   *              description: El ID del medico a eliminar
   *      responses:
   *          "200":
   *            description: Medico eliminado exitosamente.
   */
  app.delete("/medicos/:id", destroy);
};
