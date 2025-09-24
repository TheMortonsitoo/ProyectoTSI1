import { Request, Response } from "express"
import Empleado from "../models/Empleado"

export const getEmpleados = async (request: Request, response: Response) => {
    const empleado = await Empleado.findAll()
    response.json({data:empleado})
}

export const getEmpleadoByRut = async (request: Request, response: Response) => {
    const {rut} = request.params
    const empleado = await Empleado.findByPk(rut)
    response.json({data:empleado})
}

export const agregarEmpleado = async(request: Request, response: Response) => {
    console.log(request.body)
    const empleado = await Empleado.create(request.body)
    response.json({data: empleado})
}

export const editarEmpleado = async(request: Request, response: Response) => {
    const {rut} = request.params
    const editarEmpleado = await Empleado.findByPk(rut)
    await editarEmpleado.update(request.body)
    await editarEmpleado.save()
    response.json({data: editarEmpleado})
}

export const borrarEmpleado = async(request: Request, response: Response) => {
    const {rut} = request.params
    const borrarEmpleado = await Empleado.findByPk(rut)
    await borrarEmpleado.destroy()
    response.json({data: "Empleado eliminado"})
}