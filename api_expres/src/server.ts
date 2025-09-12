import  Express  from "express"

const server = Express()

server.get('/', (request, response)=>{
    response.send('hola mundo express')
})
export default server