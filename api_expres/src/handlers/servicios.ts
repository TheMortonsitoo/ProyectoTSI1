import { Request, Response } from "express"
import Servicio from "../models/Servicio"

export const getServicios = async (request: Request, response: Response) => {
    const servicio = await Servicio.findAll()
    response.json({data:servicio})
}

export const getServicioByID = async (request: Request, response: Response) => {
    const {id} = request.params
    const servicio = await Servicio.findByPk(id)
    response.json({data:servicio})
}

export const agregarServicio = async(request: Request, response: Response) => {
    console.log(request.body)
    const servicio = await Servicio.create(request.body)
    response.json({data: servicio})
}

export const editarServicio = async(request: Request, response: Response) => {
    const {id} = request.params
    const editarServicio = await Servicio.findByPk(id)
    await editarServicio.update(request.body)
    await editarServicio.save()
    response.json({data: editarServicio})
}

export const borrarServicio = async(request: Request, response: Response) => {
    const {id} = request.params
    const borrarServicio = await Servicio.findByPk(id)
    await borrarServicio.destroy()
    response.json({data: "Servicio eliminado"})
}