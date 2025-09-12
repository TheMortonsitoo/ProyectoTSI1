import { Request, Response } from "express"

export const getProductos = async (request: Request, response: Response) => {
    response.json("Productos")
}

export const getProductosByID = async (request: Request, response: Response) => {
    const {id} = request.params
    response.json("Producto: " + id)
}

export const agregarProducto = async(request: Request, response: Response) => {
    response.json("Nueva Producto agregado")
}

export const editarProducto = async(request: Request, response: Response) => {
    const {id} = request.params
    response.json("Producto editado: " + id)
}


export const borrarProducto= async(request: Request, response: Response) => {
    const {id} = request.params
    response.json("Producto borrado: " + id)
}