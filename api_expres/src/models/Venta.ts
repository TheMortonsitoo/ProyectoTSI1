import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Cliente from "./Cliente";

@Table({tableName: "ventas" })
class Venta extends Model{
    @Column({type: DataType.SMALLINT, primaryKey: true, allowNull: false, field:"cod_venta" })
        declare codVenta: number

    @Column({type: DataType.STRING(15), allowNull: false, field:"rut_cliente" })
    @ForeignKey(()=>Cliente)
        declare rutCliente: string
    @BelongsTo(()=>Cliente)
        declare cliente: Cliente
    
    @Column({type: DataType.DATEONLY, allowNull: false, field:"fecha" })
        declare fecha: string
    
    
    @Column({type: DataType.INTEGER, allowNull: false, field:"total" })
        declare total: number
    
    
    @Column({type: DataType.STRING(20), allowNull: false, field:"estado_venta" })
        declare estadoVenta: string
}

export default Venta