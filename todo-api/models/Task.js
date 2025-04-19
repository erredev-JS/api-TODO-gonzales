const mongoose = require("mongoose")


const taskSchema = new mongoose.Schema({
    titulo: {
    type: String,
    required: true
    },
    descripcion: {
        type: String,
        required: false
    },
    estado: {
    type: String,
    enum: ["pendiente", "en_progreso", "completado"],
    default: "pendiente"
    },
    fechaLimite: {
        type: Date,
        required: true
    },
})

const Task = mongoose.model("Task", taskSchema)


module.exports = Task