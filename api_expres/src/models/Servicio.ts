import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: "servicios"})
class Servicio extends Model{

    @Column({type: DataType.STRING(30), primaryKey: true, allowNull: false, field:"cod_servicio" })
        declare codServicio: string
    
    @Column({type: DataType.STRING(30), allowNull: true, field:"nombre_servicio" })
        declare nombreServicio: string
    
    @Column({type: DataType.INTEGER, allowNull: true, field:"precio" })
        declare precio: number

    @Column({type: DataType.STRING, allowNull: true, field:"tiempo" })
        declare tiempo: string
    
}

export default Servicio