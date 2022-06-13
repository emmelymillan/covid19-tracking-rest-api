import {
  getCentrosMedico,
  createCentroMedico,
  updateCentroMedico,
  deleteCentroMedico,
} from "../controllers/centroMedico.controller.js";

export default (app) => {
    /**
   * @swagger
   * /cm:
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
  app.get("/cm", getCentrosMedico);

    /**
   * @swagger
   * /cm/new:
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
  app.post("/cm/new", createCentroMedico);
  
  /**
   * @swagger
   * /cm/update/{id}:
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
  app.put("/cm/update/:id", updateCentroMedico);

  /**
   * @swagger
   * /cm/delete/{id}:
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
  app.delete("/cm/delete/:id", deleteCentroMedico);
};
