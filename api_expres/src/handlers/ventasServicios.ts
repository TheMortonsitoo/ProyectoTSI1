import { Request, Response } from "express"
import VentaServicio from "../models/VentaServicio"

export const getVentasServicios = async (request: Request, response: Response) => {
    const venta = await VentaServicio.findAll()
    response.json({data:venta})
}

export const getVentaServicioByID = async (request: Request, response: Response) => {
    const {id} = request.params
    const venta = await VentaServicio.findByPk(id)
    response.json({data:venta})
}

export const agregarVentaServicio = async(request: Request, response: Response) => {
    console.log(request.body)
    const venta = await VentaServicio.create(request.body)
    response.json({data: venta})
}

export const editarVentaServicio = async(request: Request, response: Response) => {
    const {id} = request.params
    const venta = await VentaServicio.findByPk(id)
    await venta.update(request.body)
    await venta.save()
    response.json({data: venta})
}

export const borrarVentaServicio = async(request: Request, response: Response) => {
    const {id} = request.params
    const venta = await VentaServicio.findByPk(id)
    await venta.destroy()
    response.json({data: "Venta de Servio eliminado"})
}