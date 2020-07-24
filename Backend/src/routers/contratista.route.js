const {Router} = require('express')
const router = Router()
const contratistaCtrl = require('../controllers/contratista.controller')
const auth = require ( '../helper/auth')

router.get('/obtenerct',auth.verificarToken, contratistaCtrl.ObtenerDatosCt)
router.get('/obtenerct/:id',auth.verificarToken, contratistaCtrl.ObtenerDatosId)
router.get('/obtener/idctr', auth.verificarToken , contratistaCtrl.ObtenerId)
router.post('/crearct',auth.verificarToken, contratistaCtrl.CrearContratista)
router.put('/actualizarct/:id',auth.verificarToken, contratistaCtrl.ActualizarContratista)
router.delete('/eliminarct/:id',auth.verificarToken, contratistaCtrl.EliminarContratista)


module.exports=router