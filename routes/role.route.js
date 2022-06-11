import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
} from "../controllers/rol.controller.js";

export default (app) => {
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
  app.get("/roles", getRoles);

  /**
   * @swagger
   * /role/new:
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
  app.post("/role/new", createRole);

  /**
   * @swagger
   * /role/update/{id}:
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
  app.put("/role/update/:id", updateRole);

  /**
   * @swagger
   * /role/delete/{id}:
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
  app.delete("/role/delete/:id", deleteRole);
};
