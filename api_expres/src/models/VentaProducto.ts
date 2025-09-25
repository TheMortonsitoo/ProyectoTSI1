import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Producto from "./Producto";
import Venta from "./Venta";


@Table({tableName: "venta_productos" })
class VentaProductos extends Model{

    @Column({type: DataType.STRING(30), primaryKey: true, allowNull: false, field:"cod_producto" })
    @ForeignKey(()=>Producto)
        declare codProducto: string
    @BelongsTo(()=>Producto)
        declare producto: Producto

    @Column({type: DataType.STRING(30), primaryKey: true, allowNull: false, field:"cod_venta" })
    @ForeignKey(()=>Venta)
        declare codVenta: string
    @BelongsTo(()=>Venta)
        declare venta: Venta
    
    @Column({type: DataType.INTEGER, allowNull: true, field:"cantidad" })
        declare cantidad: number
    
    @Column({type: DataType.INTEGER, allowNull: true, field:"precio_venta" })
        declare precioVenta: number
    
    @Column({type: DataType.INTEGER, allowNull: true, field:"subtotal" })
        declare subtotal: number
    
}

export default VentaProductos