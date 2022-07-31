import {
  create,
  findOne,
  update,
  destroy,
  list,
} from "../controllers/rol.controller.js";

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
   * /roles:
   *  get:
   *      summary: Webservice para obtener la lista de roles.
   *      tags: [Roles]
   *      security:
   *          - ApiKeyAuth: []
   *      responses:
   *          '200':
   *              description: ok
   *
   */
  app.get("/roles", list);

  /**
   * @swagger
   * /roles/{id}:
   *  get:
   *      summary: Webservice para obtener un solo rol.
   *      tags: [Roles]
   *      security:
   *          - ApiKeyAuth: []
   *      parameters:
   *          - in: path
   *            name: id
   *            schema:
   *              type: integer
   *              required: true
   *              description: El ID del rol a editar
   *      responses:
   *          '200':
   *              description: ok
   *
   */
  app.get("/roles/:id", findOne);

  /**
   * @swagger
   * /roles:
   *  post:
   *      summary: Webservice para crear rol.
   *      tags: [Roles]
   *      security:
   *          - ApiKeyAuth: []
   *      requestBody:
   *          required: true
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Rol'
   *      responses:
   *          "200":
   *            description: Rol creado.
   *            content:
   *               application/json:
   *                schema:
   *                  $ref: '#/components/schemas/Rol'
   */
  app.post("/roles", create);

  /**
   * @swagger
   * /roles/{id}:
   *   put:
   *      summary: Webservice para editar/actualizar rol.
   *      tags: [Roles]
   *      security:
   *          - ApiKeyAuth: []
   *      requestBody:
   *          required: true
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Rol'
   *      parameters:
   *          - in: path
   *            name: id
   *            schema:
   *              type: integer
   *              required: true
   *              description: El ID del rol a editar
   *      responses:
   *          "200":
   *            description: Rol editado exitosamente.
   */
  app.put("/roles/:id", update);

  /**
   * @swagger
   * /roles/{id}:
   *   delete:
   *      summary: Webservice para eliminar rol.
   *      tags: [Roles]
   *      security:
   *          - ApiKeyAuth: []
   *      parameters:
   *          - in: path
   *            name: id
   *            schema:
   *              type: integer
   *              required: true
   *              description: El ID del rol a eliminar
   *      responses:
   *          "200":
   *            description: Rol eliminado exitosamente.
   */
  app.delete("/roles/:id", destroy);
};
