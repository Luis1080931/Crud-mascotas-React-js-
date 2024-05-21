import express from 'express'
import body_parser from 'body-parser'
import cors from 'cors'
import routeMascotas from './src/routes/mascotas.route.js'
import routeUser from './src/routes/user.route.js'
import routeOpciones from './src/routes/opciones.routes.js'

const servidor = express()
servidor.use(cors())

servidor.use(body_parser.json())
servidor.use(body_parser.urlencoded({extend: false}))

servidor.use('/mascotas', routeMascotas)
servidor.use('/user', routeUser)
servidor.use('/opciones', routeOpciones)

servidor.use(express.static('./public'))

servidor.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
})