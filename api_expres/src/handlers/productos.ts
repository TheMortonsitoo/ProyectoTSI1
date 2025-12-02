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
    const { nombreProducto, precioUnitario, descripcion, stock } = req.body;

    // 1️⃣ Validar si el nombre ya existe
    const existeNombre = await Producto.findOne({
      where: { nombreProducto }
    });

    if (existeNombre) {
      return res.status(400).json({ error: "El producto ya está registrado" });
    }

    // 2️⃣ Buscar el último producto para generar código nuevo
    const ultimo = await Producto.findOne({
      order: [["codProducto", "DESC"]],
    });

    let nuevoCodigo = "P001";
    if (ultimo) {
      const numero = parseInt(ultimo.codProducto.slice(1));
      nuevoCodigo = `P${String(numero + 1).padStart(3, "0")}`;
    }

    // 3️⃣ Crear producto
    const productoNuevo = await Producto.create({
      codProducto: nuevoCodigo,
      nombreProducto,
      precioUnitario,
      descripcion,
      stock,
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

export const aumentarStock = async (req: Request, res: Response) => {
  try {
    const { codProducto, cantidad } = req.body;

    if (!codProducto || typeof cantidad !== "number" || cantidad <= 0) {
      return res.status(400).json({ mensaje: "Datos inválidos" });
    }

    const producto = await Producto.findByPk(codProducto);
    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    producto.stock += cantidad;
    await producto.save();

    res.json({ mensaje: "Stock actualizado", producto });
  } catch (error) {
    console.error("Error al aumentar stock:", error);
    res.status(500).json({ mensaje: "Error al aumentar stock" });
  }
};
