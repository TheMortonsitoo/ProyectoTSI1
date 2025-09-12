import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Servicio from "./Servicio";
import Venta from "./Venta";

@Table({tableName: "venta_servicios" })
class VentaServicio extends Model{

    @Column({type: DataType.SMALLINT(), primaryKey: true, allowNull: false, field:"cod_servicio" })
    @ForeignKey(()=>Servicio)
        declare codServicio: number
    @BelongsTo(()=>Servicio)
        declare servicio: Servicio

    @Column({type: DataType.SMALLINT(), primaryKey: true, allowNull: false, field:"cod_venta" })
    @ForeignKey(()=>Venta)
        declare codVenta: number
    @BelongsTo(()=>Venta)
        declare venta: Venta
    
    @Column({type: DataType.STRING(100), allowNull: false, field:"descripcion_detalle" })
        declare descripcionDetalle: string
    
    @Column({type: DataType.STRING(100), allowNull: false, field:"observaciones" })
        declare observaciones: string
    
    @Column({type: DataType.INTEGER, allowNull: false, field:"precio_unitario" })
        declare precioUnitario: number
    
    @Column({type: DataType.INTEGER, allowNull: false, field:"subtotal" })
        declare subtotal: number
    
}

export default VentaServicio