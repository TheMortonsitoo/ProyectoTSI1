import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Cliente from "./Cliente";

@Table({tableName: "vehiculos" })
class Vehiculo extends Model{

    @Column({type: DataType.STRING(10), primaryKey: true, allowNull: false, field:"patente" })
        declare patente: string
    
    @Column({type: DataType.STRING(30), allowNull: true, field:"marca" })
        declare marca: string

    @Column({type: DataType.STRING(30), allowNull: true, field:"modelo" })
        declare modelo: string

    @Column({type: DataType.SMALLINT, allowNull: true, field:"anio" })
        declare anio: number

    @Column({type: DataType.STRING(15), allowNull: true, field:"rut_cliente" })
    @ForeignKey(()=>Cliente)
        declare rutCliente: string
    @BelongsTo(()=> Cliente)
        declare cliente: Cliente
}

export default Vehiculo