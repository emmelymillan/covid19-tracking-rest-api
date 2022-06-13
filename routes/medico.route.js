import {
  getMedicos,
  createMedico,
  updateMedico,
  deleteMedico,
} from "../controllers/medico.controller.js";

export default (app) => {
    /**
   * @swagger
   * /medico:
   *  get:
   *      summary: Webservice para obtener la lista de casos.
   *      tags: [Medicos]
   *      security:
   *          - ApiKeyAuth: []
   *      responses:
   *          '200':
   *              description: ok
   *
   */
  app.get("/medico", getMedicos);
  
  /**
   * @swagger
   * /medico/new:
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
  app.post("/medico/new", createMedico);

    /**
   * @swagger
   * /medico/update/{id}:
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
  app.put("/medico/update/:id", updateMedico);
  
  /**
   * @swagger
   * /medico/delete/{id}:
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
  app.delete("/medico/delete/:id", deleteMedico);
};
