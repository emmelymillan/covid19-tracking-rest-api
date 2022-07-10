import {
  list,
  create,
  update,
  destroy,
  findOne,
} from "../controllers/medico.controller.js";

export default (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
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
  app.post("/medicos", create);

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
