import { Router } from "express";
import { validar, registrar } from "../controllers/controller.user.js";

const routeUser = Router()

routeUser.post('/validar', validar)
routeUser.post('/registrar', registrar)

export default routeUser