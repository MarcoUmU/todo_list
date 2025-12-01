require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json()); 

// IMPORTAR NUESTRAS RUTAS
const tareaRoutes = require('./routes/tareaRoutes');
app.use('/api/tareas', tareaRoutes);

// --- RUTA PRINCIPAL 
app.get('/', (req, res) =>{
    res.status(200).json({message: "La API funciona"});
});


// CONEXIÓN 
async function connectDB(){
    try{
        await mongoose.connect(MONGO_URI);
        console.log("Se conectó a MongoDB con Exito");
    } catch (err) {
        console.log("Error al conectarse a la DB: ", err.message);
    }
}

connectDB();

app.listen(PORT, ()=>{
    console.log("El servidor está escuchando en el puerto", PORT);
});