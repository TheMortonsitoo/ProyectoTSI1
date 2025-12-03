import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import Cliente from "./Cliente";
import VentaServicio from "./VentaServicio";
import VentaProducto from "./VentaProducto";

@Table({tableName: "ventas" })
class Venta extends Model{
    @Column({type: DataType.STRING(30), primaryKey: true, allowNull: false, field:"cod_venta" })
        declare codVenta: string

    @Column({type: DataType.STRING(15), allowNull: true, field:"rut_cliente" })
    @ForeignKey(()=>Cliente)
        declare rutCliente: string
    @BelongsTo(()=>Cliente)
        declare cliente: Cliente
    
    @Column({type: DataType.DATEONLY, allowNull: true, field:"fecha" })
        declare fecha: string
    
    @Column({type: DataType.INTEGER, allowNull: true, field:"total" })
        declare total: number
    
    @Column({type: DataType.STRING(20), allowNull: true, field:"estado_venta" })
        declare estadoVenta: string
    @HasMany(() => VentaServicio, { foreignKey: "codVenta", as: "detalles" })
        declare detalles?: VentaServicio[];
    @HasMany(() => VentaProducto, { foreignKey: "codVenta", as: "productos" })
        declare productos?: VentaProducto[];
        
}

export default Venta