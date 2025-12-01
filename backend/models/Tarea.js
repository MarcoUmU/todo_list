const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: false,
        default: 'Sin Descripción'
    },
    completada: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true   
});

module.exports = mongoose.model('Tarea', tareaSchema);