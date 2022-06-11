import {
  getCasos,
  createCaso,
  updateCaso,
  deleteCaso,
} from "../controllers/caso.controller.js";

export default (app) => {
  /**
   * @swagger
   * /caso:
   *  get:
   *      summary: Webservice para obtener la lista de casos.
   *      tags: [Casos]
   *      security:
   *          - ApiKeyAuth: []
   *      responses:
   *          '200':
   *              description: ok
   *
   */
  app.get("/caso", getCasos);

  /**
   * @swagger
   * /caso/new:
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
  app.post("/caso/new", createCaso);

  /**
   * @swagger
   * /caso/update/{id}:
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
  app.put("/caso/update/:id", updateCaso);

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
