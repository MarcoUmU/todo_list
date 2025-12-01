const express = require('express');
const router = express.Router();
const Tarea = require('../models/Tarea');

// RUTA 1: CONSULTAR Y BUSCAR (READ - GET)
router.get('/', async (req, res) => {
    try{
        const { q } = req.query; 
        let filtro = {};

        if(q){
            const regex = new RegExp(q, 'i');
            
            filtro = {
                $or: [
                    { titulo: { $regex: regex } },
                    { descripcion: { $regex: regex } }
                ]
            };
        }

        const tareas = await Tarea.find(filtro).sort({ createdAt: -1 });
        res.status(200).json(tareas);
    }catch(error){
        console.error("Error en la busqueda:", error);
        res.status(500).json({ message: 'Error al obtener las tareas.'})
    }
});

// RUTA 2: CREAR (CREATE - POST)
router.post('/', async (req, res) => {
    const { titulo, descripcion } = req.body;
    const nuevaTarea = new Tarea({ titulo, descripcion});

    try{
        const tareaGuardada = await nuevaTarea.save();
        res.status(201).json(tareaGuardada);
    }catch(error){
        console.error(error);
        res.status(400).json({ message: 'Error al crear la tarea' });
    }
});

// RUTA 3: ACTUALIZAR (UPDATE - PUT)
router.put('/:id', async (req, res) =>{
    const { id } = req.params;
    const actualizacion = req.body;

    try{
        const tareaActualizada = await Tarea.findByIdAndUpdate(id, actualizacion, { new: true});

        if(!tareaActualizada){
            return res.status(404).json({message: "Tarea no encontrada"});
        }
        res.status(200).json(tareaActualizada);

    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Error al actualizar la tarea.'});
    }
});

// RUTA 4: ELIMINAR (DELETE)
router.delete('/:id', async (req, res) =>{
    const { id } = req.params;

    try{
        const tareaEliminada = await Tarea.findByIdAndDelete(id);

        if(!tareaEliminada){
            return res.status(404).json({message: "Tarea no encontrada"});
        }
        res.status(204).send();

    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Error al eliminar la tarea.'});
    }
});

module.exports = router;