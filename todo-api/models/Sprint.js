const mongoose = require("mongoose")
const { type } = require("os")


const sprintSchema = new mongoose.Schema({
    fechaInicio: {
        type: Date,
        require: true
    },
    fechaCierre: {
        type: Date,
        require: true
    },
    tareas: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref:"Task", default:[]}],
        required: true
    }
})

const Sprint = mongoose.model("Sprint", sprintSchema)

module.exports = sprintSchema