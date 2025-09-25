import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Venta from "./Venta";

@Table({tableName: "pagos"})
class Pago extends Model{

    @Column({type: DataType.INTEGER, primaryKey: true, allowNull: false, field:"cod_pago" })
        declare codPago: number
    
    @Column({type: DataType.INTEGER, allowNull:false, field:"cod_venta" })
    @ForeignKey(()=>Venta)
        declare codVenta: number
    @BelongsTo(()=>Venta)
        declare venta: Venta
    
    @Column({type: DataType.STRING, allowNull:true, field:"metodo_pago" })
        declare metodoPago: string

    @Column({type: DataType.DATEONLY, allowNull:true, field:"fecha" })
        declare fecha: string

    @Column({type: DataType.INTEGER, allowNull: true, field:"monto_pagado" })
        declare montoPagado: string
    
}

export default Pago