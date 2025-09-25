import  Express  from "express"
import router from "./router"
import db from "./config/database"
import cors, {CorsOptions} from 'cors'
import { cargarProductosIniciales } from "./config/data/cargarProductos"
import { cargarServiciosIniciales } from "./config/data/cargarServicios"

const server = Express()


//conectar a la BASE DE DATOS
async function conectarBD() {
    try{
        await db.authenticate()
        await db.sync()
        await cargarProductosIniciales()
        await cargarServiciosIniciales()
        console.log('Conexion exitosa a la BASE DE DATOS')
    }
    catch(error){
        console.log('No se pudo conectar a la BASE DE DATOS')
        console.log(error)
    }    
}

conectarBD()

const corsOptions: CorsOptions = {
    origin: function(origin, callback){
        if(!origin || origin === process.env.FRONTEND_URL){
            callback(null,true)
        }
        else{
            callback(new Error("Error de CORS"), false)
        }
    },
}

server.use(cors(corsOptions))

server.use(Express.json())

server.use('/api', router)


export default server