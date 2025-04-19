require('dotenv').config();

const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use(express.json());


const PORT = process.env.PORT || 3000


// Routes 

const backlogRoutes = require("./routes/backlogRoutes")
const taskRoutes = require("./routes/taskRoutes")

// Conexión a mongoDB


const mongoURL = `mongodb://root:example@localhost:27017/todo-api?authSource=admin`


mongoose.connect(mongoURL).then(() => console.log("✔ conectado a mongoDB")).catch((err) => console.error("❌ Error al conectar a MongoDB", err))

// Run del server

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });


app.use("/", backlogRoutes)
app.use("/", taskRoutes)