import  Express  from "express"

const server = Express()

server.get('/', (request, response)=>{
    response.send('hola mundo API express')
})
export default server