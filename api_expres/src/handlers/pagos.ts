import { Request, Response } from "express"
import Pago from "../models/Pago"

export const getPago = async (request: Request, response: Response) => {
    const pago = await Pago.findAll()
    response.json({data:pago})
}

export const getPagoByID = async (request: Request, response: Response) => {
    const {id} = request.params
    const pago = await Pago.findByPk(id)
    response.json({data:pago})
}

export const agregarPago = async(request: Request, response: Response) => {
    console.log(request.body)
    const pago = await Pago.create(request.body)
    response.json({data: pago})
}