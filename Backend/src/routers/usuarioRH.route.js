const {Router} = require('express')
const router = Router()
const usuarioCtrl = require('../controllers/usuarioRH.controller')
const auth = require ( '../helper/auth')

router.get('/usuario',  usuarioCtrl.listar)
router.get('/usuario/:id', usuarioCtrl.listarid)
router.post('/usuario/registrar', usuarioCtrl.registrar)
router.post('/usuario/login', usuarioCtrl.login)
router.delete('/usuario/eliminar/:id' , usuarioCtrl.eliminar)


module.exports=router