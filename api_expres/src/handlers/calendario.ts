import { Request, Response } from "express"
import Agenda from "../models/Agenda"

export const getCalendario = async(request: Request, response: Response) => {
    const calendario = await Agenda.findAll()
    response.json({data: calendario})
}

export const agregarFecha = async(request: Request, response: Response) => {
    console.log(request.body)
    const fecha = await Agenda.create(request.body)
    response.json({data: fecha})
}

export const editarCalendario = async(request: Request, response: Response) => {
    const {id} = request.params
    const editarCalendario = await Agenda.findByPk(id)
    await editarCalendario.update(request.body)
    await editarCalendario.save()
    response.json({data: editarCalendario})
}


export const borrarFecha = async(request: Request, response: Response) => {
    const {rut} = request.params
    const borrarfecha = await Agenda.findByPk(rut)
    await borrarfecha.destroy()
    response.json({data: "Fecha eliminado"})
}