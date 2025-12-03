import { Request, Response } from "express";
import Pago from "../models/Pago";
import Venta from "../models/Venta"; // si quieres validar contra ventas
import Agenda from "../models/Agenda";

export const getPago = async (request: Request, response: Response) => {
  try {
    const pago = await Pago.findAll();
    response.json({ data: pago });
  } catch (error) {
    console.error("Error al obtener pagos:", error);
    response.status(500).json({ error: "Error interno al obtener pagos" });
  }
};

export const getPagoByID = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const pago = await Pago.findByPk(id);
    if (!pago) return response.status(404).json({ error: "Pago no encontrado" });
    response.json({ data: pago });
  } catch (error) {
    console.error("Error al obtener pago:", error);
    response.status(500).json({ error: "Error interno al obtener pago" });
  }
};

export const agregarPago = async (req: Request, res: Response) => {
  try {
    const { codVenta, codAgenda, metodoPago, fecha, montoPagado } = req.body;

    if ((!codVenta && !codAgenda) || !metodoPago || !fecha || !montoPagado) {
      return res.status(400).json({ error: "Faltan datos obligatorios para registrar el pago" });
    }

    // Generar nuevo código de pago
    const ultimoPago = await Pago.findOne({ order: [["codPago", "DESC"]] });
    let nuevoCodigo = "PAGO001";
    if (ultimoPago?.codPago) {
      const numero = parseInt(ultimoPago.codPago.replace("PAGO", ""), 10);
      nuevoCodigo = `PAGO${(numero + 1).toString().padStart(3, "0")}`;
    }

    // Crear el pago
    const pago = await Pago.create({
      codPago: nuevoCodigo,
      codVenta: codVenta || null,
      codAgenda: codAgenda || null,
      metodoPago,
      fecha,
      montoPagado,
      estadoPago: "Finalizado"
    });

    // Actualizar estado de venta si corresponde
    if (codVenta) {
      const venta = await Venta.findOne({ where: { codVenta } });
      if (venta) {
        venta.estadoVenta = "Finalizada";
        await venta.save();
      }
    }

    // Actualizar estado de agenda si corresponde
    if (codAgenda) {
      const agenda = await Agenda.findOne({ where: { codAgenda } });
      if (agenda) {
        agenda.estado = "Finalizada"; // 👈 usar campo correcto
        await agenda.save();
      }
    }

    res.status(201).json({
      mensaje: "Pago registrado correctamente",
      data: pago
    });
  } catch (error) {
    console.error("Error al registrar pago:", error);
    res.status(500).json({ error: "Error interno al registrar pago" });
  }
};





