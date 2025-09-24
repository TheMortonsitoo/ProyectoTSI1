import { Request, Response } from "express"
import VentaProductos from "../models/VentaProducto"

export const getVentasProductos = async (request: Request, response: Response) => {
    const venta = await VentaProductos.findAll()
    response.json({data:venta})
}

export const getVentaProductoByID = async (request: Request, response: Response) => {
    const {id} = request.params
    const venta = await VentaProductos.findByPk(id)
    response.json({data:venta})
}

export const agregarVentaProducto = async(request: Request, response: Response) => {
    console.log(request.body)
    const venta = await VentaProductos.create(request.body)
    response.json({data: venta})
}

export const editarVentaProducto = async(request: Request, response: Response) => {
    const {id} = request.params
    const venta = await VentaProductos.findByPk(id)
    await venta.update(request.body)
    await venta.save()
    response.json({data: venta})
}

export const borrarVentaProducto = async(request: Request, response: Response) => {
    const {id} = request.params
    const venta = await VentaProductos.findByPk(id)
    await venta.destroy()
    response.json({data: "Venta de Producto eliminado"})
}