import DB from "../models/index.js";

const Medico = DB.medico;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Email
  Medico.findOne({
    where: {
      correo: req.body.correo,
    },
  }).then((medico) => {
    if (medico) {
      res.status(400).send({
        message: "Error! el correo electrónico ya existe.",
      });
      return;
    }
    next();
  });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
};

export default verifySignUp;
