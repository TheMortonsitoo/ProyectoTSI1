import { Request, Response } from "express"
import Producto from "../models/Producto"

export const getProductos = async (request: Request, response: Response) => {
    const productos = await Producto.findAll()
    response.json({data:productos})
}

export const getProductosByID = async (request: Request, response: Response) => {
    const {id} = request.params
    const producto = await Producto.findByPk(id)
    response.json({data:producto})
}

export const agregarProducto = async (req: Request, res: Response) => {
  try {
    // Buscar el último producto por código descendente
    const ultimo = await Producto.findOne({
      order: [["codProducto", "DESC"]],
    });

    // Generar nuevo código
    let nuevoCodigo = "P001";
    if (ultimo) {
      const numero = parseInt(ultimo.codProducto.slice(1)); // quita la "P"
      const siguiente = numero + 1;
      nuevoCodigo = `P${siguiente.toString().padStart(3, "0")}`;
    }

    // Crear el nuevo producto con el código generado
    const productoNuevo = await Producto.create({
      codProducto: nuevoCodigo,
      nombreProducto: req.body.nombreProducto,
      precioUnitario: req.body.precioUnitario,
      descripcion: req.body.descripcion,
      stock: req.body.stock,
    });

    res.json({ data: productoNuevo });
  } catch (error) {
    console.error("Error al agregar producto:", error);
    res.status(500).json({ error: "No se pudo agregar el producto" });
  }
};



export const editarProducto = async(request: Request, response: Response) => {
    const {id} = request.params
    const editarProducto = await Producto.findByPk(id)
    await editarProducto.update(request.body)
    await editarProducto.save()
    response.json({data: editarProducto})
}

export const borrarProducto = async(request: Request, response: Response) => {
    const {id} = request.params
    const borrarProducto = await Producto.findByPk(id)
    await borrarProducto.destroy()
    response.json({data: "Producto eliminado"})
}