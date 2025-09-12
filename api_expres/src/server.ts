import  Express  from "express"
import router from "./router"

const server = Express()

server.use("/api",router)

export default server