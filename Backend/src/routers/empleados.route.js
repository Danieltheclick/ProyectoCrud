const {Router} = require('express')
const router = Router()
const empleadoCtrl = require('../controllers/empleados.controller')
const auth = require ( '../helper/auth')

router.get('/obtener',auth.verificarToken,  empleadoCtrl.ObtenerDatos)
router.get('/obtener/:id', auth.verificarToken, empleadoCtrl.ObtenerDatosId)
router.get('/obtener/ctr/:id', auth.verificarToken, empleadoCtrl.EmpleadosCtr)
router.post('/crear',auth.verificarToken,  empleadoCtrl.CrearEmpleado)
router.put('/actualizar/:id', auth.verificarToken, empleadoCtrl.ActualizarEmpleado)
router.delete('/eliminar/:id', auth.verificarToken, empleadoCtrl.EliminarEmpleado)



module.exports=router