const mongoose = require("mongoose")


const backlogSchema = new mongoose.Schema({
    tareasNoAsignadas: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref:"Task", default:[]}],
        required: true
    }
})

const Backlog = mongoose.model("Backlog", backlogSchema)

module.exports = Backlog