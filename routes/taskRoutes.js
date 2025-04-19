const express = require("express");
const Backlog = require("../todo-api/models/Backlog");
const Task = require('../todo-api/models/Task');  

const router = express.Router();

router.get("/tasks", (req, res) => {
    Task.find()
    .then((tareas) => {
        if(!tareas) return res.status(404).json({error: "No se encontró el backlog"})
        res.json(tareas)    
    })
    .catch((err) => {
        console.error("Error al obtener la tarea:", err);  // Imprime el error para más detalles
        res.status(500).json({ error: "Error al obtener la tarea", details: err.message || err });
    });

})

router.get("/tasks/:id", (req, res) => {
    const taskId = req.params.id.trim()
    Task.findById(taskId)
    .then((tarea) => {
        if(!tarea) return res.status(404).json({error: "No se encontró el backlog"})
            res.json(tarea)
    })
    .catch((err) => {
        console.error("Error al obtener la tarea:", err);  // Imprime el error para más detalles
        res.status(500).json({ error: "Error al obtener la tarea", details: err.message || err });
    });

})

router.post("/tasks", (req, res) => {
    const newTarea = new Task({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
        fechaLimite: req.body.fechaLimite
    });
    newTarea.save()
    .then((tareaGuardada) => {
        res.status(201).json(tareaGuardada);
    })
    .catch((err) => {
        res.status(500).json({ error: 'Error al guardar la tarea', details: err });
    });
})

router.put("/tasks/:id", (req, res) => {
    const taskId = req.params.id.trim(); // Elimina posibles espacios o saltos de línea
    const updatedData = req.body; // Lo que se va a actualizar

    Task.findByIdAndUpdate(taskId, updatedData, { new: true, runValidators: true })
        .then((tareaActualizada) => {
            if (!tareaActualizada) {
                return res.status(404).json({ error: "Tarea no encontrada" });
            }
            res.json(tareaActualizada);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Error al editar la tarea", details: error.message });
        });
});

router.delete("/tasks/:id", (req, res) => {
    const taskId = req.params.id.trim() // Eliminamos posibles espacios

    Task.deleteOne({_id: taskId})
    .then((tareaBorrada) => {
        if(!tareaBorrada){
            return res.status(404).json({ error: "Tarea no encontrada" });
        }
        res.json(tareaBorrada)
    })
})

module.exports = router