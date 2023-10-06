import { Testimoniales } from "../models/Testimoniales.js";

const guardarTestimonial = async(req, res) =>{
    //validar...
    const { nombre, correo, mensaje } = req.body;
    const errores = [];
    
    if(nombre.trim() === ""){
        errores.push({mensaje: 'El nombre esta Vacio'});
    }
    
    if(correo.trim() === ""){
        errores.push({mensaje: 'El correo esta Vacio'});
    }
    
    if(mensaje.trim() === ""){
        errores.push({mensaje: 'El MSJ esta Vacio'});
    }

    if(errores.length > 0){
        // Consultar testimoniales Existente
        const testimoniales = await Testimoniales.findAll();
        //Mostrar la vista con errores
        res.render('testimoniales',{
            pagina:'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    }else{
        try {
            await Testimoniales.create({
                nombre,
                correo,
                mensaje    
            })
            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }    
    }
}

export{
    guardarTestimonial
}