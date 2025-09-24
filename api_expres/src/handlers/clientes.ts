import { Request, Response } from "express"
import Cliente from "../models/Cliente"

export const getClientes = async (request: Request, response: Response) => {
    const clientes = await Cliente.findAll()
    response.json({data:clientes})
}

export const getClienteByRut = async (request: Request, response: Response) => {
    const {rut} = request.params
    const cliente = await Cliente.findByPk(rut)
    response.json({data:cliente})
}

export const agregarCliente = async(request: Request, response: Response) => {
    console.log(request.body)
    const cliente = await Cliente.create(request.body)
    response.json({data: cliente})
}

export const editarCliente = async(request: Request, response: Response) => {
    const {rut} = request.params
    const editarCliente = await Cliente.findByPk(rut)
    await editarCliente.update(request.body)
    await editarCliente.save()
    response.json({data: editarCliente})
}

export const borrarCliente = async(request: Request, response: Response) => {
    const {rut} = request.params
    const borrarCliente = await Cliente.findByPk(rut)
    await borrarCliente.destroy()
    response.json({data: "Cliente eliminado"})
}