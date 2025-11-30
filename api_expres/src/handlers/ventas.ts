import { Request, Response } from "express"
import Venta from "../models/Venta"
import { Op } from "sequelize"

export const getVentas = async (request: Request, response: Response) => {
    const venta = await Venta.findAll()
    response.json({data:venta})
}

export const getVentaByID = async (request: Request, response: Response) => {
    const {id} = request.params
    const venta = await Venta.findByPk(id)
    response.json({data:venta})
}

export const agregarVenta = async (req: Request, res: Response) => {
  try {
    const { rutCliente, fecha, total, estadoVenta } = req.body;

    const prefijo = "PROD";
    const totalVentas = await Venta.count();
    const numero = totalVentas + 1;

    const codVenta = `${prefijo}${numero.toString().padStart(3, "0")}-${numero.toString().padStart(2, "0")}`;

    const venta = await Venta.create({
      codVenta,
      rutCliente,
      fecha,
      total,
      estadoVenta
    });

    res.status(201).json({ data: venta });
  } catch (error) {
    console.error("Error al registrar venta:", error);
    res.status(500).json({ error: "No se pudo registrar la venta" });
  }
};




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