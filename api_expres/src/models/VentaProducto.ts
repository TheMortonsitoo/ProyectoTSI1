import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Producto from "./Producto";
import Venta from "./Venta";


@Table({tableName: "venta_productos" })
class VentaProductos extends Model{

    @Column({type: DataType.SMALLINT(), primaryKey: true, allowNull: false, field:"cod_producto" })
    @ForeignKey(()=>Producto)
        declare codProducto: number
    @BelongsTo(()=>Producto)
        declare producto: Producto

    @Column({type: DataType.SMALLINT(), primaryKey: true, allowNull: false, field:"cod_venta" })
    @ForeignKey(()=>Venta)
        declare codVenta: number
    @BelongsTo(()=>Venta)
        declare venta: Venta
    
    @Column({type: DataType.INTEGER, allowNull: false, field:"cantidad" })
        declare cantidad: number
    
    @Column({type: DataType.STRING(100), allowNull: false, field:"observaciones" })
        declare observaciones: string
    
    @Column({type: DataType.INTEGER, allowNull: false, field:"precio_venta" })
        declare precioVenta: number
    
    @Column({type: DataType.INTEGER, allowNull: false, field:"subtotal" })
        declare subtotal: number
    
}

export default VentaProductos