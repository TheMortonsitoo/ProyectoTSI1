import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: "servicios"})
class Servicio extends Model{

    @Column({type: DataType.SMALLINT, primaryKey: true, allowNull: false, field:"cod_servicio" })
        declare codServicio: number
    
    @Column({type: DataType.STRING(30), allowNull: false, field:"nombre_servicio" })
        declare nombreServicio: string
    
    @Column({type: DataType.INTEGER, allowNull: false, field:"precio" })
        declare precio: number

    @Column({type: DataType.STRING, allowNull: false, field:"tiempo" })
        declare tiempo: string
    
}

export default Servicio