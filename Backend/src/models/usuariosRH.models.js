const mongoose = require ( 'mongoose')
const {Schema}=mongoose
const bcrypt= require('bcryptjs') //para encriptar contraseñas

const UsuarioRHSchema = new Schema({
    nombre: String,
    correo: String,
    contrasena: String
},{
    timestamps: true
})


UsuarioRHSchema.methods.encryptarcontrasena = async contrasena =>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(contrasena,salt)
}

module.exports = mongoose.model('UsuarioRH', UsuarioRHSchema)
