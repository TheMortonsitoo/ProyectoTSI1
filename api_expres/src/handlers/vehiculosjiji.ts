import { Request, Response } from "express"
import Vehiculo from "../models/Vehiculo"

export const getVehiculos = async (request: Request, response: Response) => {
    const vehiculo = await Vehiculo.findAll()
    response.json({data:vehiculo})
}

export const getVehiculoByPatente = async (request: Request, response: Response) => {
    const {patente} = request.params
    const vehiculo = await Vehiculo.findByPk(patente)
    response.json({data:vehiculo})
}

export const agregarVehiculo = async(request: Request, response: Response) => {
    console.log(request.body)
    const vehiculo = await Vehiculo.create(request.body)
    response.json({data: vehiculo})
}

export const editarVehiculo = async(request: Request, response: Response) => {
    const {patente} = request.params
    const editarVehiculo = await Vehiculo.findByPk(patente)
    await editarVehiculo.update(request.body)
    await editarVehiculo.save()
    response.json({data: editarVehiculo})
}

export const borrarVehiculo = async(request: Request, response: Response) => {
    const {patente} = request.params
    const borrarVehiculo = await Vehiculo.findByPk(patente)
    await borrarVehiculo.destroy()
    response.json({data: "Vehiculo eliminado"})
}