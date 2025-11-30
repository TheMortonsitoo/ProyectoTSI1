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

export const agregarVehiculo = async (req: Request, res: Response) => {
  try {
    const { patente, marca, modelo, anio, rutCliente } = req.body;

    if (!patente || !marca || !modelo || !anio || !rutCliente) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
    }

    const nuevoVehiculo = await Vehiculo.create({
      patente,
      marca,
      modelo,
      anio,
      rutCliente,
    });

    return res.json({
      mensaje: "Vehículo registrado correctamente",
      vehiculo: nuevoVehiculo
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error interno", error });
  }
};

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

export const getVehiculosByCliente = async (req: Request, res: Response) => {
  try {
    const { rutCliente } = req.params;
    const vehiculos = await Vehiculo.findAll({ where: { rutCliente } });
    res.json({ data: vehiculos });
  } catch (error) {
    console.error("Error al obtener vehículos del cliente:", error);
    res.status(500).json({ error: "No se pudo obtener los vehículos del cliente" });
  }
};
