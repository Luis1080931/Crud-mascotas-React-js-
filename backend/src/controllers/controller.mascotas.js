import { pool } from "../database/conexion.js";
import { query } from "express";
import multer from "multer";

const storage = multer.diskStorage(
    {
        destination: function(req,file,cb){
            cb(null, "public/img")
        },
        filename: function(req,file, cb){
            cb(null, file.originalname)
        }
    }
)

const upload = multer({storage: storage})
export const cargarImage = upload.single('image')

export const registrarMascota = async (req, res) => {
    try {
        
        const {nombre, raza, genero, categoria, dueno} = req.body
        let image = req.file.originalname

        let sql = `INSERT INTO mascotas (nombre_mascota,fk_raza, fk_categoria, image, fk_genero, fk_dueno) VALUES (?, ?, ?, ?, ?, ?)`

        const [rows] = await pool.query(sql, [nombre,raza, categoria, image, genero, dueno])

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
        let sql = `SELECT id, nombre_mascota, r.*, nombre_categoria AS categoria, nombre_genero AS genero, image 
        FROM mascotas m
        JOIN razas r ON fk_raza = id_raza 
        JOIN categorias ON fk_categoria = id_categoria 
        JOIN generos ON fk_genero = id_genero`

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
        const {raza, genero, categoria } = req.body
        let image = req.file.originalname

        let sql = `UPDATE mascotas SET fk_raza =IFNULL(?, fk_raza), fk_genero = IFNULL(?,fk_genero), fk_categoria = IFNULL(?, fk_categoria), SET image = IFNULL(?, image) WHERE id = ?`
        
        const [rows] = await pool.query(sql, [raza, genero, categoria, image, id])

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

        let sql = `SELECT id, nombre_mascota, nombre_raza AS raza, nombre_categoria AS categoria, nombre_genero AS genero, image FROM mascotas JOIN razas ON fk_raza = id_raza JOIN categorias ON fk_categoria = id_categoria JOIN generos ON fk_genero = id_genero  WHERE id = ?`

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