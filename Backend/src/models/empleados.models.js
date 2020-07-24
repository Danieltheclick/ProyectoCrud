const mongoose = require ( 'mongoose')
const {Schema} = mongoose

const empleadosSchema = new Schema({
    nombre: String,
    apellido: String,
    tipoContrato: String,
    direccion: String,
    email: String,  
    fechaNacimiento: Date,
    identificacion: Number,
    contratista: {type:Schema.Types.ObjectId, ref: 'Contratista'}
},{
    timestamps: true
})

module.exports = mongoose.model('Empleado', empleadosSchema ) 