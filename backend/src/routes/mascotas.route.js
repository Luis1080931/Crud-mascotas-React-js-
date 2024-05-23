import { Router } from "express";
import { registrarMascota, listarMascotas, actualizarMascota, eliminarMascota, buscarMascota, cargarImage, cargarImageUploads } from "../controllers/controller.mascotas.js";
import { validarToken } from "../controllers/controller.user.js";

const routeMascotas = Router()

routeMascotas.get('/listar',validarToken, listarMascotas)
routeMascotas.post('/registrar', validarToken, cargarImage, registrarMascota)
routeMascotas.put('/actualizar/:id', validarToken, cargarImageUploads, actualizarMascota)
routeMascotas.get('/buscar/:id',validarToken, buscarMascota)
routeMascotas.delete('/eliminar/:id',validarToken, eliminarMascota)

export default routeMascotas