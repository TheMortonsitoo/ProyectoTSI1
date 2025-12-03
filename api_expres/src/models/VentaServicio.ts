import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Servicio from "./Servicio";
import Venta from "./Venta";

@Table({ tableName: "venta_servicios" })
class VentaServicio extends Model {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  declare id: number;

  @Column({ type: DataType.STRING(30), allowNull: false, field: "cod_servicio" })
  @ForeignKey(() => Servicio)
  declare codServicio: string;

  @BelongsTo(() => Servicio, { as: "servicio" })
  declare servicio: Servicio;

  @Column({ type: DataType.STRING(30), allowNull: false, field: "cod_venta" })
  @ForeignKey(() => Venta)
  declare codVenta: string;

  @BelongsTo(() => Venta, { as: "venta" })
  declare venta: Venta;

  @Column({ type: DataType.STRING(100), allowNull: true })
  declare descripcionDetalle: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  declare observaciones: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare precioUnitario: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare subtotal: number;
}


export default VentaServicio;