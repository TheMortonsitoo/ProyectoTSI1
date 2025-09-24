import { Request, Response } from "express"
import Producto from "../models/Producto"

export const getProductos = async (request: Request, response: Response) => {
    const productos = await Producto.findAll()
    response.json({data:productos})
}

export const getProductosByID = async (request: Request, response: Response) => {
    const {id} = request.params
    const producto = await Producto.findByPk(id)
    response.json({data:producto})
}

export const agregarProducto = async(request: Request, response: Response) => {
    console.log(request.body)
    const productoNuevo = await Producto.create(request.body)
    response.json({data: productoNuevo})
}

export const editarProducto = async(request: Request, response: Response) => {
    const {id} = request.params
    const editarProducto = await Producto.findByPk(id)
    await editarProducto.update(request.body)
    await editarProducto.save()
    response.json({data: editarProducto})
}

export const borrarProducto = async(request: Request, response: Response) => {
    const {id} = request.params
    const borrarProducto = await Producto.findByPk(id)
    await borrarProducto.destroy()
    response.json({data: "Producto eliminado"})
}