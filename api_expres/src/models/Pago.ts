import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Venta from "./Venta";

@Table({tableName: "pagos"})
class Pago extends Model{

    @Column({type: DataType.SMALLINT, primaryKey: true, allowNull: false, field:"cod_pago" })
        declare codPago: number
    
    @Column({type: DataType.SMALLINT, allowNull: false, field:"cod_venta" })
    @ForeignKey(()=>Venta)
        declare codVenta: number
    @BelongsTo(()=>Venta)
        declare venta: Venta
    
    @Column({type: DataType.STRING, allowNull: false, field:"metodo_pago" })
        declare metodoPago: string

    @Column({type: DataType.DATEONLY, allowNull: false, field:"fecha" })
        declare fecha: string

    @Column({type: DataType.INTEGER, allowNull: false, field:"monto_pagado" })
        declare montoPagado: string
    
}

export default Pago