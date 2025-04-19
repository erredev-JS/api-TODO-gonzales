const express = require("express")
const Sprint = require("../todo-api/models/Sprint")
const Task = require('../todo-api/models/Task');  

const router = express.Router()

router.get("/sprints", (req, res) => {
    Sprint.find()
    .then((sprint) => {
        if(!sprint) return res.status(404).json({error: "No se encontró la sprint"})
            res.json(sprint)
    })
    .catch((err) => {
        console.error("Error al obtener la sprint:", err);  // Imprime el error para más detalles
        res.status(500).json({ error: "Error al obtener la sprint", details: err.message || err });
    });
})
router.get("/sprints/:id", (req, res) => {
    const sprintId = req.params.id.trim()
    Sprint.findById(sprint)
    .then((sprint) => {
        if(!tareas) return res.status(404).json({error: "No se encontró la sprint"})
            res.json(sprint)
    })
    .catch((err) => {
        console.error("Error al obtener la sprint:", err);  // Imprime el error para más detalles
        res.status(500).json({ error: "Error al obtener la sprint", details: err.message || err });
    });
})

router.post("/sprints", (req, res) => {
    const newSprint = new Sprint({
        fechaInicio: req.body.fechaInicio,
        fechaCierre: req.body.fechaCierre,
        tareas: req.body.tareas 
    })
    newSprint.save()
    .then((sprintGuardada) => {
        res.status(201).json(sprintGuardada)
    })
    .catch((err) => {
        res.status(500).json({error: "Error al guardar la sprint", details: err})
    })
})

router.put("sprints/:id", (req, res) => {
    const sprintId = req.params.id
    Sprint.findById(sprintId)
    .then((sprint) => {
        if(!tareas) return res.status(404).json({error: "No se encontró la sprint"})
            res.json(sprint)
    })
    .catch((err) => {
        console.error("Error al obtener la sprint:", err);  // Imprime el error para más detalles
        res.status(500).json({ error: "Error al obtener la sprint", details: err.message || err });
    });
})

router.delete("sprints/:id", (req, res) => {
    const sprintId = req.params.id
    Sprint.deleteOne({_id: taskId})
    .then((sprintBorrada) => {
        if(!sprintBorrada){
            return res.status(404).json({error: "Tarea no encontrada"})
        }
        res.json(sprintBorrada)
    })
})


router.put("sprints/:id/add-task/:taskId", (req, res) => {
    const {id: sprintId, taskId} = req.params

    Task.findById(taskId)
    .then(tarea => {
        if(!tarea){
            return res.status(404).json({error: "No se encontró la tarea"})
        }
    })
    return Sprint.findById(sprintId).then(sprint => {
        if (!sprint) {
            return res.status(404).json({ error: 'El sprint no existe' });
        }
        if (sprint.tareas.includes(task._id)) {
            return res.status(400).json({ error: 'La tarea ya está en el sprint' });
          }
        
    })
    return Backlog.findOne().then(backlog => {
        if (backlog && backlog.tareas.includes(task._id)){
            backlog.tareas.pull(task._id)
            return backlog.save()
        }
    })
    .then(() => {
        sprint.tareas.push(task._id)
        return sprint.save()
    })
    .then(updatedSprint => {
        res.status(200).json({
            message: "Tarea agregada al sprint exitosamente",
            sprint: updatedSprint
        })
    })
    .catch(err => {
        res.status(500).json({
            error: "Error al agregar la tarea al sprint",
            details: error.message
        })
    })
})