import { Router } from "express";
import { validar } from "../controllers/controller.user.js";

const routeUser = Router()

routeUser.post('/validar', validar)

export default routeUser