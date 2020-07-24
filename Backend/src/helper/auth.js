const Auth = {}
const jwt = require('jsonwebtoken')

Auth.verificarToken= (req, res, next) =>{
    if(!req.headers.autorizacion){
        return res.json({
            mensaje: 'No tienes los permisos requeridos'
        })
    }
    const token = req.headers.autorizacion.split(' ')[1]
    if(token === 'null'){
        return res.json({
            mensaje: 'No tienes los permisos requeridos'
        })
    }
    const playload = jwt.verify(token , 'dim')
    req.userid = playload._id
    req.username = playload.nombre
    req.usertoken = token
    next()
}


module.exports = Auth