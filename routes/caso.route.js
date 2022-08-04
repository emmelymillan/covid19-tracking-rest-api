import {
  create,
  deleteCaso,
  list,
  findOne,
  update,
} from "../controllers/caso.controller.js";

export default (app) => {
  app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", ["*"]);
    res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.append("Access-Control-Allow-Headers", "Content-Type");
    res.append("Access-Control-Expose-Headers", "Content-Range");
    res.append("Content-Range", 5);
    next();
  });

  /**
   * @swagger
   * /casos:
   *  get:
   *      summary: Webservice para obtener la lista de casos.
   *      tags: [Casos]
   *      security:
   *          - ApiKeyAuth: []
   *      parameters:
   *            name: sort
   *            schema:
   *              type: array
   *              required: true
   *              description: orden
   *      responses:
   *          '200':
   *              description: ok
   *
   */
  app.get("/casos", list);

  /**
   * @swagger
   * /casos:
   *  post:
   *      summary: Webservice para crear caso.
   *      tags: [Casos]
   *      security:
   *          - ApiKeyAuth: []
   *      requestBody:
   *          required: true
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Caso'
   *      responses:
   *          "200":
   *            description: Caso creado.
   *            content:
   *               application/json:
   *                schema:
   *                  $ref: '#/components/schemas/Caso'
   */
  app.post("/casos", create);

  /**
   * @swagger
   * /casos/{id}:
   *  get:
   *      summary: Webservice para obtener un solo caso.
   *      tags: [Casos]
   *      security:
   *          - ApiKeyAuth: []
   *      parameters:
   *          - in: path
   *            name: id
   *            schema:
   *              type: integer
   *              required: true
   *              description: El ID del caso a editar
   *      responses:
   *          '200':
   *              description: ok
   *
   */
  app.get("/casos/:id", findOne);

  /**
   * @swagger
   * /casos/{id}:
   *   put:
   *      summary: Webservice para editar/actualizar caso.
   *      tags: [Casos]
   *      security:
   *          - ApiKeyAuth: []
   *      requestBody:
   *          required: true
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Caso'
   *      parameters:
   *          - in: path
   *            name: id
   *            schema:
   *              type: integer
   *              required: true
   *              description: El ID del caso a editar
   *      responses:
   *          "200":
   *            description: Caso editado exitosamente.
   */
  app.put("/casos/:id", update);

  /**
   * @swagger
   * /caso/delete/{id}:
   *   delete:
   *      summary: Webservice para eliminar caso.
   *      tags: [Casos]
   *      security:
   *          - ApiKeyAuth: []
   *      parameters:
   *          - in: path
   *            name: id
   *            schema:
   *              type: integer
   *              required: true
   *              description: El ID del caso a eliminar
   *      responses:
   *          "200":
   *            description: Caso eliminado exitosamente.
   */
  app.delete("/caso/delete/:id", deleteCaso);
};
