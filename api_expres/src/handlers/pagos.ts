import { Request, Response } from "express";
import Pago from "../models/Pago";
import Venta from "../models/Venta";
import Agenda from "../models/Agenda";

export const getPago = async (req: Request, res: Response) => {
  try {
    const pagos = await Pago.findAll();
    res.json({ data: pagos });
  } catch (error) {
    console.error("Error al obtener pagos:", error);
    res.status(500).json({ error: "Error interno al obtener pagos" });
  }
};

export const getPagoByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pago = await Pago.findByPk(id);
    if (!pago) return res.status(404).json({ error: "Pago no encontrado" });
    res.json({ data: pago });
  } catch (error) {
    console.error("Error al obtener pago:", error);
    res.status(500).json({ error: "Error interno al obtener pago" });
  }
};

export const agregarPago = async (req: Request, res: Response) => {
  try {
    const { codVenta, codAgenda, metodoPago, fecha, montoPagado } = req.body;

    if (!codVenta || !metodoPago || !fecha || !montoPagado) {
      return res.status(400).json({ error: "Faltan datos obligatorios para registrar el pago" });
    }

    // Generar nuevo código de pago
    const ultimoPago = await Pago.findOne({ order: [["codPago", "DESC"]] });
    let nuevoCodigo = "PAGO001";
    if (ultimoPago?.codPago) {
      const numero = parseInt(ultimoPago.codPago.replace("PAGO", ""), 10);
      nuevoCodigo = `PAGO${(numero + 1).toString().padStart(3, "0")}`;
    }

    // Buscar venta
    const venta = await Venta.findOne({ where: { codVenta } });
    if (!venta) {
      return res.status(404).json({ error: "Venta no encontrada" });
    }

    // Buscar agenda por codAgenda o por codVenta
    let agenda = null;
    if (codAgenda) {
      agenda = await Agenda.findOne({ where: { codAgenda } });
    } else {
      agenda = await Agenda.findOne({ where: { codVenta } });
    }

    // Crear el pago
    const pago = await Pago.create({
      codPago: nuevoCodigo,
      codVenta,
      codAgenda: agenda?.codAgenda || null,
      metodoPago,
      fecha,
      montoPagado,
      estadoPago: "Finalizado"
    });

    // Actualizar estado de venta
    venta.estadoVenta = "finalizada";
    await venta.save();

    // Actualizar estado de agenda si existe
    if (agenda) {
      agenda.estado = "finalizada";
      await agenda.save();
    }

    res.status(201).json({
      mensaje: "Pago registrado correctamente",
      data: {
        pago,
        venta,
        agenda
      }
    });
  } catch (error: any) {
    console.error("Error al registrar pago:", error);
    res.status(500).json({ error: "Error interno al registrar pago", detalle: error.message });
  }
};

