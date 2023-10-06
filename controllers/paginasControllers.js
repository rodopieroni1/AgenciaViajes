import {Viajes} from '../models/Viajes.js';
import {Testimoniales} from '../models/Testimoniales.js';

const paginaInicio = async(req, res) =>{//req - lo que enviamos: res - lo que responde

    // Consultar 3 viajes  del modelo Viaje
    const promiseDB = [];
    promiseDB.push(Viajes.findAll({limit:3}));
    promiseDB.push(Testimoniales.findAll({limit:3}));
    try {
        const resultado = await Promise.all(promiseDB);

        res.render('inicio', {
            pagina:'Inicio',
            clase:'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error);
    }

   
};

const paginaNosotros = (req, res) =>{//req - lo que enviamos: res - lo que responde
    res.render('nosotros', {
        pagina:'Nosotros'
    });
};

const paginaViajes = async (req, res) =>{//req - lo que enviamos: res - lo que responde
    const viajes = await Viajes.findAll();
    res.render('viajes',{
        pagina:'Proximos Viajes',
        viajes
    });
};

const paginaTestimoniales = async (req, res) =>{//req - lo que enviamos: res - lo que responde
   try {
        const testimoniales = await Testimoniales.findAll();
        res.render('testimoniales',{
        pagina:'Testimoniales',
        testimoniales
    });
   } catch (error) {
        console.log(error);
   }
}

//Muestra un viaje por su slug
const paginaDetalleViajes = async (req, res) =>{//req - lo que enviamos: res - lo que responde
     const { slug } = req.params;
     try {
         const viaje = await Viajes.findOne({ where  : { slug }});
         res.render('viaje',{
             pagina: 'Informacion Viaje',
             viaje
         })
     } catch (error) {
         console.log(error);
     }
}

export{
    paginaInicio, 
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViajes
}