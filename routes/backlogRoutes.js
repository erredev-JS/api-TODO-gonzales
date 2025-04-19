const express = require("express");
const Backlog = require("../todo-api/models/Backlog");
const Task = require('../todo-api/models/Task');  

const router = express.Router();

router.get("/backlog", (req, res) => {
    Backlog.findOne()
    .populate("tareasNoAsignadas")  // Asegúrate de que esta referencia sea válida
    .then((backlog) => {
        if (!backlog) {
            return res.status(404).json({ error: "No se encontró el backlog." });
        }
        res.json(backlog);
    })
    .catch((err) => {
        console.error("Error al obtener el backlog:", err);  // Imprime el error para más detalles
        res.status(500).json({ error: "Error al obtener el backlog", details: err.message || err });
    });
});



router.post("/backlog", (req, res) => {
    Backlog.findOne()
    .then(backlogExist => {
        if(!backlogExist){
            const newBacklog = new Backlog({
                tareasNoAsignadas: []  // Inicia el backlog vacío
            });

            return newBacklog.save();  // Guarda el único backlog
        }
    })
    .then((newBacklog) => {
        res.status(201).json({ message: "Backlogs eliminados, se ha creado un único backlog.", backlog: newBacklog });
    })
    .catch((err) => {
        res.status(500).json({ error: "Error al limpiar los backlogs", details: err });
    });
});

router.get("/clear-backlogs", (req, res) => {
    // Elimina todos los backlogs
    Backlog.deleteMany({})
        .then(() => {
            // Crea un solo backlog vacío
            const newBacklog = new Backlog({
                tareasNoAsignadas: []  // Inicia el backlog vacío
            });

            return newBacklog.save();  // Guarda el único backlog
        })
        .then((newBacklog) => {
            res.status(201).json({ message: "Backlogs eliminados, se ha creado un único backlog.", backlog: newBacklog });
        })
        .catch((err) => {
            res.status(500).json({ error: "Error al limpiar los backlogs", details: err });
        });
});

module.exports = router;
