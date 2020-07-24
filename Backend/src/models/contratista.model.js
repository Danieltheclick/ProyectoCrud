const mongoose = require ( 'mongoose')
const {Schema} = mongoose

const contratistaSchema = new Schema({
    nombre: String,
    apellido: String,
    identificacion: String,
    email: String,
    empresa: String,
    
},{
    timestamps: true
})

module.exports = mongoose.model('Contratista', contratistaSchema )