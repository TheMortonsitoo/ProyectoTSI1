import { Request, Response } from "express"

export const getCalendario = async(request: Request, response: Response) => {
    response.json("calendario")
}

export const agregarFecha = async(request: Request, response: Response) => {
    response.json("Nueva fecha agregada")
}

export const editarCalendario = async(request: Request, response: Response) => {
    const {id} = request.params
    response.json("fecha editada: " + id)
}


export const borrarFecha= async(request: Request, response: Response) => {
    const {id} = request.params
    response.json("fecha borrada: " + id)
}