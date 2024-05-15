import { Router } from "express";
import { listarCategorias, listarGenero, listarRazas, listarUsers } from "../controllers/controller.opciones.js";

const routeOpciones = Router()

routeOpciones.get('/categorias', listarCategorias)

routeOpciones.get('/genero', listarGenero)

routeOpciones.get('/razas', listarRazas)

routeOpciones.get('/users', listarUsers)

export default routeOpciones