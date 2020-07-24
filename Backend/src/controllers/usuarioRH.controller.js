const usuarioCtrl = {}
const Usuario = require ('../models/usuariosRH.models')
const bcrypt= require ('bcryptjs')
const jwt = require('jsonwebtoken')


usuarioCtrl.listar = async( req, res) =>{
    const usuarios = await Usuario.find({},{contrasena:0})
    res.json(usuarios)
}

usuarioCtrl.listarid = async ( req, res) =>{
    const id = req.params.id
    const usuario = await Usuario.findByid({_id:id},{contrasena:0})
    res.json(usuario)
}

usuarioCtrl.registrar = async ( req, res) =>{
    const {nombre, correo , contrasena} = req.body
    const correoUsuario = await Usuario.findOne({correo:correo})
    if(correoUsuario){
        res.json({
            mensaje: 'El correo ya existe'
        })
    } else{
        const nuevoUsuario = new Usuario({nombre , correo , contrasena})
        nuevoUsuario.contrasena = await nuevoUsuario.encryptarcontrasena(contrasena)
        await nuevoUsuario.save()
        const token = jwt.sign({_id:nuevoUsuario._id, nombre:nuevoUsuario.nombre},'dim')
        const usuario = await Usuario.findOne({correo:correo})
        res.json({
            mensaje: 'Bienvenido',
            id:usuario._id , 
            token
        })
    }
} 

usuarioCtrl.eliminar=async(req,res)=>{
    const id = req.params.id 
    const name = req.username
    const eliminar = await Usuario.findOneAndDelete({_id:id})
    
    if(!eliminar){
        return res.json({
            mensaje: `El Usuario RH con id ${id} no existe`
        })
    }
    else if(!jwt.verify(token,'dim') && name === 'admin'){
        await Usuario.findOneAndDelete({_id:id})
        res.json({
            mensaje:'Usuario eliminado'
        })
    } else {
        res.json({
            mensaje: 'No tiene los permisos requeridos para eliminar un Usuario RH'
        })
    }
    
}

usuarioCtrl.login = async (req , res) => {
    const {correo, contrasena} = req.body
    const usuario = await Usuario.findOne({correo:correo})
    if(!usuario){
        return res.json({
            mensaje:'Correo o contraseña incorrectos'
        })
    } bcrypt.compare(contrasena, usuario.contrasena, function(err , resp){
        if(resp){
            const token = jwt.sign({_id:usuario._id, nombre:usuario.nombre},'dim')
            res.json({
                mensaje: 'Bienvenido',
                id:usuario._id , 
                nombre: usuario.nombre,
                token
            })
        } else {
            return res.json({
                mensaje: 'Contraseña o correo incorrectos'
            })
        }
    })
}


module.exports = usuarioCtrl
