import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Servicio from "./Servicio";
import Venta from "./Venta";

@Table({tableName: "venta_servicios" })
class VentaServicio extends Model{

    @Column({type: DataType.STRING(30), primaryKey: true, allowNull: false, field:"cod_servicio" })
    @ForeignKey(()=>Servicio)
        declare codServicio: string
    @BelongsTo(()=>Servicio)
        declare servicio: Servicio

    @Column({type: DataType.STRING(30), primaryKey: true, allowNull: false, field:"cod_venta" })
    @ForeignKey(()=>Venta)
        declare codVenta: string
    @BelongsTo(()=>Venta)
        declare venta: Venta
    
    @Column({type: DataType.STRING(100), allowNull: true, field:"descripcion_detalle" })
        declare descripcionDetalle: string
    
    @Column({type: DataType.STRING(100), allowNull: true, field:"observaciones" })
        declare observaciones: string
    
    @Column({type: DataType.INTEGER, allowNull: true, field:"precio_unitario" })
        declare precioUnitario: number
    
    @Column({type: DataType.INTEGER, allowNull: true, field:"subtotal" })
        declare subtotal: number
    
}

export default VentaServicio