import { Request, Response } from "express"
import VentaProductos from "../models/VentaProducto"
import Producto from "../models/Producto";
import Venta from "../models/Venta";
import Cliente from "../models/Cliente";

export const getVentasProductos = async (req: Request, res: Response) => {
  try {
    const ventas = await VentaProductos.findAll({
      include: [
        {
          model: Producto,
          as: "producto",
        },
        {
          model: Venta,
          as: "venta",
          include: [
            {
              model: Cliente,
              as: "cliente",
            }
          ]
        }
      ]
    });

    res.json({ data: ventas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo ventas de productos" });
  }
};

export const getVentaProductoByID = async (request: Request, response: Response) => {
    const {id} = request.params
    const venta = await VentaProductos.findByPk(id)
    response.json({data:venta})
}

export const agregarVentaProducto = async(request: Request, response: Response) => {
    console.log(request.body)
    const venta = await VentaProductos.create(request.body)
    response.json({data: venta})
}

export const editarVentaProducto = async(request: Request, response: Response) => {
    const {id} = request.params
    const venta = await VentaProductos.findByPk(id)
    await venta.update(request.body)
    await venta.save()
    response.json({data: venta})
}

export const borrarVentaProducto = async(request: Request, response: Response) => {
    const {id} = request.params
    const venta = await VentaProductos.findByPk(id)
    await venta.destroy()
    response.json({data: "Venta de Producto eliminado"})
}