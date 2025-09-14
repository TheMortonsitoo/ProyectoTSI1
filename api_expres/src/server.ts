import  Express  from "express"
import router from "./router"
import db from "./config/database"

const server = Express()

//conectar a la BASE DE DATOS
async function conectarBD() {
    try{
        await db.authenticate()
        db.sync()
        console.log('Conexion exitosa a la BASE DE DATOS')
    }
    catch(error){
        console.log('No se pudo conectar a la BASE DE DATOS')
        console.log(error)
    }    
}

conectarBD()

server.use("/api",router)

export default server