import { Request, Response } from "express"
import Venta from "../models/Venta"

export const getVentas = async (request: Request, response: Response) => {
    const venta = await Venta.findAll()
    response.json({data:venta})
}

export const getVentaByID = async (request: Request, response: Response) => {
    const {id} = request.params
    const venta = await Venta.findByPk(id)
    response.json({data:venta})
}

export const agregarVenta = async(request: Request, response: Response) => {
    console.log(request.body)
    const venta = await Venta.create(request.body)
    response.json({data: venta})
}

export const editarVenta = async(request: Request, response: Response) => {
    const {id} = request.params
    const venta = await Venta.findByPk(id)
    await venta.update(request.body)
    await venta.save()
    response.json({data: venta})
}

export const borrarVenta = async(request: Request, response: Response) => {
    const {id} = request.params
    const venta = await Venta.findByPk(id)
    await venta.destroy()
    response.json({data: "Venta eliminado"})
}