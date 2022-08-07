import {
  getTiposCentroMedico,
  createTipoCentroMedico,
  updateTipoCentroMedico,
  deleteTipoCentroMedico,
} from "../controllers/tipoCentroMedico.controller.js";

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
   * /tcm:
   *  get:
   *      summary: Webservice para obtener la lista de tipo de centro medico.
   *      tags: [Tipos de Centros Medicos]
   *      security:
   *          - ApiKeyAuth: []
   *      responses:
   *          '200':
   *              description: ok
   *
   */
  app.get("/tcm", getTiposCentroMedico);

  /**
   * @swagger
   * /tcm/new:
   *  post:
   *      summary: Webservice para crear rol.
   *      tags: [Tipos de Centros Medicos]
   *      security:
   *          - ApiKeyAuth: []
   *      requestBody:
   *          required: true
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/TipoCentroMedico'
   *      responses:
   *          "200":
   *            description: Tipo de centro medico creado.
   *            content:
   *               application/json:
   *                schema:
   *                  $ref: '#/components/schemas/TipoCentroMedico'
   */
  app.post("/tcm/new", createTipoCentroMedico);

  /**
   * @swagger
   * /tcm/update/{id}:
   *   put:
   *      summary: Webservice para editar/actualizar tipo de centro medico.
   *      tags: [Tipos de Centros Medicos]
   *      security:
   *          - ApiKeyAuth: []
   *      requestBody:
   *          required: true
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/TipoCentroMedico'
   *      parameters:
   *          - in: path
   *            name: id
   *            schema:
   *              type: integer
   *              required: true
   *              description: El ID del tipo de centro medico a editar
   *      responses:
   *          "200":
   *            description: Tipo de centro medico editado exitosamente.
   */
  app.put("/tcm/update/:id", updateTipoCentroMedico);

  /**
   * @swagger
   * /tcm/delete/{id}:
   *   delete:
   *      summary: Webservice para eliminar tipo de centro medico.
   *      tags: [Tipos de Centros Medicos]
   *      security:
   *          - ApiKeyAuth: []
   *      parameters:
   *          - in: path
   *            name: id
   *            schema:
   *              type: integer
   *              required: true
   *              description: El ID del tipo de centro medico a eliminar
   *      responses:
   *          "200":
   *            description: Tipo de centro medico eliminado exitosamente.
   */
  app.delete("/tcm/delete/:id", deleteTipoCentroMedico);
};
