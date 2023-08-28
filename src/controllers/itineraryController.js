const Itinerary = require("../models/Itinerary");

const itinerariesControllers = {
  obtenerTodosIt: async (req, res) => {
    let itinerario;
    let error = null;

    try {
      itinerario = await Itinerary.find().populate("ciudadRelacionada");
    } catch (err) {
      error = err;
    }

    res.json({
      respuesta: error ? "ERROR" : itinerary,
      success: error ? false : true,
      error: error,
    });
  },
  agregarItinerario: (req, res) => {
    const {
      name,
      nameImg,
      price,
      duration,
      likes,
      hashtags,
      ciudadRelacionada,
    } = req.body;
    console.log(req.body);
    let { _id: id, primerName: names, fotoPerfil: namesImg } = req.user;
    if (req.user.rol === "guia") {
      new Itinerary({
        names,
        namesImg,
        price,
        duration,
        likes,
        hashtags,
        ciudadRelacionada,
        idGuia: id,
      })
        .save()
        .then((response) => res.json({ response }))
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Nunca debería llegar a este else, si llega aca revisar las condiciones del front
      res.json({
        success: false,
        error: [
          { message: "Esta funcion solo esta disponible para los guias" },
        ],
      });
    }
  },
  obtenerUnIt: async (req, res) => {
    let itinerario;
    const id = req.params.id;

    try {
      itinerario = await Itinerary.findOne({ _id: id }).populate(
        "ciudadRelacionada"
      );
    } catch (err) {
      console.log(err);
    }

    res.json({ respuesta: itinerario, success: true });
  },

  borrarItinerario: async (req, res) => {
    const id = req.params.id;
    let { _id: guia } = req.user;
    if (req.user.rol === "guia") {
      try {
        const itinerarioABorrar = await Itinerary.findOne({ _id: id });
        if (itinerarioABorrar.idGuia) {
          const borrado = await Itinerary.findOneAndDelete({ idGuia: guia });
          if (borrado) {
            res.json({
              respuesta: {
                itenerarioABorrar: itinerarioABorrar,
                borrado: borrado,
              },
              success: true,
            });
          } else {
            res.json({
              respuesta: [{ message: "solo podes borrar tus itinerarios" }],
              success: true,
            });
          }
        } else {
          res.json({
            respuesta: [{ message: "solo podes borrar tus itinerarios" }],
            success: true,
          });
        }
      } catch (err) {
        res.json({ respuesta: { err }, success: false });
      }
    }
  },

  modificarItinerario: async (req, res) => {
    console.log("Llegue al controller");
    let id = req.params.id;
    let itinerario = req.body;
    let { _id: guia } = req.user;
    try {
      const itinerarioAActualizar = await Itinerary.findOne({ _id: id });

      if (itinerarioAActualizar.idGuia) {
        console.log("entre al if");
        console.log(itinerario.body);
        const actualizacion = await Itinerary.findOneAndUpdate(
          { idGuia: guia },
          itinerario.body,
          { new: true }
        );
        if (actualizacion) {
          res.json({ success: true, response: actualizacion, error: null });
        } else {
          res.json({
            respuesta: [{ message: "solo podes modificar tus itinerarios" }],
            success: true,
            error: true,
          });
        }
      }
    } catch (err) {
      res.json({
        respuesta: [{ message: "Cayo en el catch del controller" }],
        success: false,
        error: true,
      });
    }
  },
  obtenerItinerariosPorCiudad: async (req, res) => {
    try {
      const itinerariosDeCiudad = await Itinerary.find({
        ciudadRelacionada: req.params.idCiudad,
      });
      res.json({ respuesta: itinerariosDeCiudad });
    } catch (err) {
      console.log(err);
    }
  },
}
  module.exports = itinerariesControllers;
