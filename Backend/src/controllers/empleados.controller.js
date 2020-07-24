const empleadoCtrl = {}
const Empleado = require ('../models/empleados.models')
const Contratista = require('../controllers/contratista.controller')

empleadoCtrl.ObtenerDatos = async( req, res) =>{
    const empleados = await Empleado.find().populate('contratista') // guardar el empleado
    res.json(empleados) // mandamos el empleado
}

empleadoCtrl.ObtenerDatosId = async( req, res) =>{
    const id = req.params.id
    const empleado = await Empleado.findById({_id:id})
    res.json(empleado)
}

empleadoCtrl.EmpleadosCtr = async( req, res) =>{
    const id = req.params.id
    const empleadosCtr = await Empleado.find({contratista:id}).populate('contratista')
    res.json({
        mensaje: `Los empleados del ${id} son: ${empleadosCtr}`
    })
}

empleadoCtrl.CrearEmpleado = async (req, res) =>{

    const{nombre, apellido, tipoContrato, direccion, email,  fechaNacimiento, identificacion, contratista } = req.body
    const identificacionEmpleado = await Empleado.findOne({identificacion:identificacion})

    if(identificacionEmpleado){
        res.json({
            mensaje: `La Identificacion ${identificacion} ya se encuentra registrada`
        })
    } else{
        const nuevoEmpleado = new Empleado({nombre, apellido, tipoContrato, direccion, email,  fechaNacimiento, identificacion, contratista})
        await nuevoEmpleado.save()
        
        const empleado = await Empleado.findOne({identificacion:identificacion})
        res.json({
            mensaje: 'Empleado Creado'
            
        })
    }

    
}

empleadoCtrl.ActualizarEmpleado = async ( req, res) =>{
    const id = req.params.id // obtenemos el id
    const empleado = await Empleado.findById({_id:id})
    if(!empleado){
        return res.json({
            mensaje: `El empleado con id ${id} no existe`
        })
    }
    //findByIdAndUpdate quiere decir, busca por el id y actualiza todo lo que llegue por el req.body
    await Empleado.findByIdAndUpdate({_id:id},req.body)
    res.json({
        mensaje:'Empleado actualizado'
    })
}

empleadoCtrl.EliminarEmpleado=async(req,res)=>{
    const id = req.params.id 
    const eliminar = await Empleado.findOneAndDelete({_id:id})
    if(!eliminar){
        return res.json({
            mensaje: `El empleado con id ${id} no existe`
        })
    }
    await Empleado.findOneAndDelete({_id:id})
    res.json({
        mensaje:'Empleado eliminado'
    })
    
}

module.exports= empleadoCtrl                