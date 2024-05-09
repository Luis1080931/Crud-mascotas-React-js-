import { pool } from "../database/conexion.js";
import { query } from "express";
import multer from "multer";

const storage = multer.diskStorage(
    {
        destination: function(req,imf,cd){
            cd(null, 'public/img')
        },
        filename: function(req,img, cd){
            cd(null, img.originalname)
        }
    }
)

const upload = multer({storage: storage})
export const cargarImage = upload.single('img')

export const registrarMascota = async (req, res) => {
    try {
        
        const {raza, genero, categoria, dueno} = req.body
        let image = req.file.originalname

        let sql = `INSERT INTO mascotas (raza, categoria, image, genero, dueno) VALUES (?, ?, ?, ?, ?)`

        const [rows] = await pool.query(sql, [raza, categoria, image, genero, dueno])

        if(rows.affectedRows>0){
            res.status(200).json({
                status: 200,
                message: 'Se registro con exito la mascota'
            })
        }else{
            res.status(403).json({
                status: 403,
                message: 'No se pudo registrar la mascota'
            })
        }

    } catch (error) {   
        res.status(500).json({
            status: 500,
            message: 'Error del servidor' + error
        })
    }
}

export const listarMascotas = async (req, res) => {
    try {
        let sql = `SELECT nombre AS raza, nombre AS categoria, nombre AS genero, nombre AS dueno, JOIN razas ON raza = id,  JOIN categorias ON categoria = id,  JOIN generos ON genero = id,  JOIN user ON dueno = id FROM mascotas`

        const [result] = await pool.query(sql)
        if(result.length>0){
            res.status(200).json(result)
        }else{
            res.status(404).json({
                status: 404,
                message: 'No se encontraron mascotas'
            })
        }
    } catch (error) {  
        res.status(500).json({
            status: 500,
            message: 'Error del servidor' + error
        })
    }
}

export const actualizarMascota = async (req, res) => {
    try {
        const {id} = req.params
        const {raza, genero, categoria, image, dueno} = req.body

        let sql = `UPDATE mascotas SET raza = ?, genero = ?, categoria = ?, image = ?, dueno =  ?`
        
        const [rows] = await pool.query(sql, [raza, categoria, image, dueno, genero])

        if(rows.affectedRows>0){
            res.status(200).json({
                status: 200,
                message: 'Se actualizo con exito la mascota'
            })
        }else{
            res.status(403).json({
                status: 403,
                message: 'No fue posible actualizar la mascota'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error del servidor' + error
        })
    }
   
}

export const buscarMascota = async (req, res) => {
    try {
        const {id} = req.params

        let sql = `SELECT nombre AS raza JOIN razas ON raza = id, nombre AS categoria JOIN categorias ON categoria = id, nombre AS genero JOIN generos ON genero = id, nombre AS dueño JOIN user ON dueno = id FROM mascotas WHERE id = ?`

        const [rows] = await pool.query(sql, [id])
        if(rows.length>0){
            res.status(200).json(rows)
        }else{
            res.status(404).json({
                status: 404,
                message: 'No se encontraron mascotas'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error del servidor' + error
        })
    }
}

export const eliminarMascota = async (req, res) => {
    try {
        const {id} = req.params

        let sql = `DELETE FROM mascotas WHERE id = ?`
        const [rows] = await pool.query(sql, id)
        if(rows.affectedRows>0){
            res.status(200).json({
                status: 200,
                message: 'Se eliminó con éxito la mascota'
            })
        }else{
            res.status(403).json({
                status: 403,
                message: 'No fue posible eliminar la mascota'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error del servidor' + error
        })
    }
}