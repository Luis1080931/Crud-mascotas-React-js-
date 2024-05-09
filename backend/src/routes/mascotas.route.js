import { Router } from "express";
import { registrarMascota, listarMascotas, actualizarMascota, eliminarMascota, buscarMascota } from "../controllers/controller.mascotas.js";

const routeMascotas = Router()

routeMascotas.get('/listar', listarMascotas)
routeMascotas.post('/registrar', registrarMascota)
routeMascotas.put('/actualizar/:id', actualizarMascota)
routeMascotas.get('/buscar/:id', buscarMascota)
routeMascotas.delete('/eliminar/:id', eliminarMascota)

export default routeMascotas