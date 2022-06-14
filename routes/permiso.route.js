import {
  getPermisos,
  createPermiso,
  updatePermiso,
  deletePermiso,
} from "../controllers/permiso.controller.js";

export default (app) => {
  /**
   * @swagger
   * /permisos:
   *  get:
   *      summary: Webservice para obtener la lista de permisos.
   *      tags: [Permisos]
   *      security:
   *          - ApiKeyAuth: []
   *      responses:
   *          '200':
   *              description: ok
   *
   */
  app.get("/permisos", getPermisos);
  /**
   * @swagger
   * /permiso/new:
   *  post:
   *      summary: Webservice para crear permiso.
   *      tags: [Permisos]
   *      security:
   *          - ApiKeyAuth: []
   *      requestBody:
   *          required: true
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Permiso'
   *      responses:
   *          "200":
   *            description: Permiso creado.
   *            content:
   *               application/json:
   *                schema:
   *                  $ref: '#/components/schemas/Permiso'
   */
  app.post("/permiso/new", createPermiso);
  /**
   * @swagger
   * /permiso/update/{id}:
   *   put:
   *      summary: Webservice para editar/actualizar permiso.
   *      tags: [Permisos]
   *      security:
   *          - ApiKeyAuth: []
   *      requestBody:
   *          required: true
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Permiso'
   *      parameters:
   *          - in: path
   *            name: id
   *            schema:
   *              type: integer
   *              required: true
   *              description: El ID del permiso a editar
   *      responses:
   *          "200":
   *            description: Permiso editado exitosamente.
   */
  app.put("/permiso/update/:id", updatePermiso);

  /**
   * @swagger
   * /permiso/delete/{id}:
   *   delete:
   *      summary: Webservice para eliminar permiso.
   *      tags: [Permisos]
   *      security:
   *          - ApiKeyAuth: []
   *      parameters:
   *          - in: path
   *            name: id
   *            schema:
   *              type: integer
   *              required: true
   *              description: El ID del permiso a eliminar
   *      responses:
   *          "200":
   *            description: Permiso eliminado exitosamente.
   */
  app.delete("/permiso/delete/:id", deletePermiso);
};
