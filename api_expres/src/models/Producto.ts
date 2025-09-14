import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: "productos" })
class Producto extends Model{

    @Column({type: DataType.STRING(30), primaryKey: true, allowNull: false, field:"cod_producto" })
        declare codProducto: string

    @Column({type: DataType.STRING(30), allowNull: true, field:"nombre_producto" })
        declare nombreProducto: string

    @Column({type: DataType.INTEGER(), allowNull: true, field:"precio_unitario" })
        declare precioUnitario: number

    @Column({type: DataType.STRING(50), allowNull: true, field:"descripcion" })
        declare descripcion: string

    @Column({type: DataType.SMALLINT(), allowNull: true, field:"stock" })
        declare stock: number
}

export default Producto