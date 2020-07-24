const contratistaCtrl = {}
const Contratista = require ('../models/contratista.model')

contratistaCtrl.ObtenerDatosCt = async( req, res) =>{
    const contratista = await Contratista.find() // guardar el contratista
    res.json(contratista) // mandamos el contratista
}

contratistaCtrl.ObtenerDatosId = async( req, res) =>{
    const id = req.params.id
    const contratista = await Contratista.findById({_id:id})
    res.json(contratista)
}

contratistaCtrl.ObtenerId = (req, res) =>{
    const id = req.params.id
    const idctr = id
    res.json({
        mensaje: `id obtenido el id es: ${idctr}`
    })
}

contratistaCtrl.ObtenerEmpleadosCtr = async (req, res)=>{
    const id = req.params.id

}

contratistaCtrl.CrearContratista = async (req, res) =>{

    const{nombre, apellido, identificacion, email, empresa } = req.body
    const identificacionContratista = await Contratista.findOne({identificacion:identificacion})

    if(identificacionContratista){
        res.json({
            mensaje: `La Identificacion ${identificacion} ya se encuentra registrada`
        })
    } else{
        const nuevoContratista = new Contratista({nombre, apellido, identificacion, email, empresa})
        await nuevoContratista.save()
        
        const contratista = await Contratista.findOne({identificacion:identificacion})
        res.json({
            mensaje: 'Contratista creado'
            
        })
    }
    
    
}

contratistaCtrl.ActualizarContratista = async ( req, res) =>{
    const id = req.params.id // obtenemos el id
    const contratista = await Contratista.findById({_id:id})
    if(!contratista){
        return res.json({
            mensaje: `El contratista con id ${id} no existe`
        })
    }
    //findByIdAndUpdate quiere decir, busca por el id y actualiza todo lo que llegue por el req.body
    await Contratista.findByIdAndUpdate({_id:id},req.body)
    res.json({
        mensaje:'Contratista actualizado'
    })
}

contratistaCtrl.EliminarContratista=async(req,res)=>{
    const id = req.params.id 
    const eliminar = await Contratista.findOneAndDelete({_id:id})
    if(!eliminar){
        return res.json({
            mensaje: `El contratista con id ${id} no existe`
        })
    }
    await Contratista.findOneAndDelete({_id:id})
    res.json({
        mensaje: "Contratista Eliminado"
    })
    
}

module.exports= contratistaCtrl                