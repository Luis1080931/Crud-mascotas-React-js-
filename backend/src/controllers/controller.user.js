
import { pool } from "./../database/conexion.js";
import jwt from "jsonwebtoken";

export const validar = async (req, res) => {

    try {

        let {email, password} = req.body
        let sql = `SELECT email, password FROM user WHERE email='${email}' and password='${password}'`

        const [user] = await pool.query(sql)

        if(user.length>0){
            let token = jwt.sign({user}, process.env.AUT_SECRET, {expiresIn:process.env.AUT_EXPIRE})

            return res.status(200).json({ 'user':user,'token':token})
        }else{
            res.status(404).json({'status': 404, 'message': 'Usuario no autorizado'})
        }

    } catch (error) {
        res.status(500).json({status: 500, message: 'Error del servidor' + error})
    }
    
}

export const validarToken = async (req, res, next) => {

    try {
        
        let tokenClient = req.headers['token']

        if(!tokenClient){
            return res.status(403).json({'message': 'Token es requerido'})
        }else{
            const token = jwt.verify(tokenClient, process.env.AUT_SECRET, (error, decoded) => {
                if(error){
                    return res.status(403).json({message: 'Token es obligatorio'})
                }else{
                    next()
                }
            })
        }

    } catch (error) {
        return res.status(500).json({status: 500, message: 'Error del servidor' + error})
    }
    
}