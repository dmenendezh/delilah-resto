const validarDatos = (req, res, next) => {
    try {
        console.log("Validando Datos Completos");

        const { usr_login, usr_fullname, usr_email, usr_password, usr_phone, usr_address} = req.body;

        if ( !usr_login || !usr_fullname || !usr_email || !usr_password || !usr_phone || !usr_address) {

            res.status(404).json({
                error: `Error: Debe completar todos los datos para poder continuar.`
            });

        } else {
           next();
        }        
    }catch(err){
        res.status(500).json({error: err.message});
    }
}



const existeUsuario = async (req, res, next) => {
    try {
        const usuariosServicios = require('../models/Users');

        console.log("Validando Usuario");
        
        const consultaUsuario = await usuariosServicios.buscarUsuario(req.body);
        
        console.log("Usuario encontrado : " , consultaUsuario);
        
        if (consultaUsuario.length > 0) { res.status(200).json(`El usuario ${req.body.usuario} ya existe en la base de datos`); }
    
        else {next();}        
    }catch(err){
        res.status(500).json({error: err.message});
    }
    
}

module.exports = { validarDatos, existeUsuario };