
const Career = require("../models/careerModel");

/**
 * Crea una carrera
 *
 * @param {*} req
 * @param {*} res
 */
const createCareer = async (req, res) => {
  let career = new Career();

  career.name = req.body.name;
  career.code = req.body.code;
  career.description = req.body.description;

  if (career.name && career.code) {
    try {
      await career.save();
      res.status(201).json(career);
    } catch (err) {
      res.status(422).json({
        error: 'Error al guardar la carrera',
      });
    }
  } else {
    res.status(422).json({
      error: 'No se proporcionaron datos válidos para la carrera',
    });
  }
};

/**
 * Obtiene todas las carreras
 *
 * @param {*} req
 * @param {*} res
 */
const getCareers = (req, res) => {
  // si se requiere una carrera específica
  if (req.query && req.query.id) {
    Career.findById(req.query.id)
      .then((career) => {
        res.json(career);
      })
      .catch((err) => {
        res.status(404);
        console.log('error al consultar la carrera', err);
        res.json({ error: "La carrera no existe" });
      });
  } else {
    // obtener todas las carreras
    Career.find()
      .then((careers) => {
        res.json(careers);
      })
      .catch((err) => {
        res.status(422);
        res.json({ error: err });
      });
  }
};

/**
 * Actualiza una carrera
 *
 * @param {*} req
 * @param {*} res
 */
const updateCareer = (req, res) => {
  // obtener carrera por id
  if (req.query && req.query.id) {
    Career.findById(req.query.id, function (err, career) {
      if (err) {
        res.status(404);
        console.log('error al consultar la carrera', err);
        res.json({ error: "La carrera no existe" });
      }

      // actualizar el objeto de carrera (patch)
      career.name = req.body.name ? req.body.name : career.name;
      career.code = req.body.code ? req.body.code : career.code;
      career.description = req.body.description ? req.body.description : career.description;

      career.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error al guardar la carrera', err);
          res.json({
            error: 'Hubo un error al guardar la carrera',
          });
        }
        res.status(200); // OK
        res.json(career);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "La carrera no existe" });
  }
};

/**
 * Elimina una carrera
 *
 * @param {*} req
 * @param {*} res
 */
const deleteCareer = (req, res) => {
  // obtener carrera por id
  if (req.query && req.query.id) {
    Career.findById(req.query.id, function (err, career) {
      if (err) {
        res.status(404);
        console.log('error al consultar la carrera', err);
        res.json({ error: "La carrera no existe" });
      }

      career.deleteOne(function (err) {
        if (err) {
          res.status(422);
          console.log('error al eliminar la carrera', err);
          res.json({
            error: 'Hubo un error al eliminar la carrera',
          });
        }
        res.status(204); // Sin contenido
        res.json({});
      });
    });
  } else {
    res.status(404);
    res.json({ error: "La carrera no existe" });
  }
};

module.exports = {
  createCareer,
  getCareers,
  updateCareer,
  deleteCareer,
};
