import {
  list,
  findOne,
  create,
  update,
  destroy,
} from "../controllers/sintoma.controller.js";

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
   * /sintomas:
   *  get:
   *      summary: Webservice para obtener la lista de sintomas.
   *      tags: [Sintomas]
   *      security:
   *          - ApiKeyAuth: []
   *      responses:
   *          '200':
   *              description: ok
   *
   */
  app.get("/sintomas", list);

  /**
   * @swagger
   * /sintomas/{id}:
   *  get:
   *      summary: Webservice para obtener un solo sintoma.
   *      tags: [Sintomas]
   *      security:
   *          - ApiKeyAuth: []
   *      parameters:
   *          - in: path
   *            name: id
   *            schema:
   *              type: integer
   *              required: true
   *              description: El ID del Sintoma a buscar
   *      responses:
   *          '200':
   *              description: ok
   *
   */
  app.get("/sintomas/:id", findOne);

  /**
   * @swagger
   * /sintomas:
   *  post:
   *      summary: Webservice para crear un síntoma.
   *      tags: [Sintomas]
   *      security:
   *          - ApiKeyAuth: []
   *      requestBody:
   *          required: true
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Sintoma'
   *      responses:
   *          "200":
   *            description: Sintoma creado.
   *            content:
   *               application/json:
   *                schema:
   *                  $ref: '#/components/schemas/Sintoma'
   */
  app.post("/sintomas", create);

  /**
   * @swagger
   * /sintomas/{id}:
   *   put:
   *      summary: Webservice para editar/actualizar sintoma.
   *      tags: [Sintomas]
   *      security:
   *          - ApiKeyAuth: []
   *      requestBody:
   *          required: true
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Sintoma'
   *      parameters:
   *          - in: path
   *            name: id
   *            schema:
   *              type: integer
   *              required: true
   *              description: El ID del Sintoma a editar
   *      responses:
   *          "200":
   *            description: Sintoma editado exitosamente.
   */
  app.put("/sintomas/:id", update);

  /**
   * @swagger
   * /simtomas/{id}:
   *   delete:
   *      summary: Webservice para eliminar un síntoma.
   *      tags: [Sintomas]
   *      security:
   *          - ApiKeyAuth: []
   *      parameters:
   *          - in: path
   *            name: id
   *            schema:
   *              type: integer
   *              required: true
   *              description: El ID del síntoma a eliminar
   *      responses:
   *          "200":
   *            description: Síntoma eliminado exitosamente.
   */
  app.delete("/sintomas/:id", destroy);
};
