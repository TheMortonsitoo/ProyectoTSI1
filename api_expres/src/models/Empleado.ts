import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: "empleados"})
class Empleado extends Model{
    @Column({type: DataType.STRING(15), primaryKey: true, allowNull: false, field:"rut_empleado" })
        declare rutEmpleado: string

    @Column({type: DataType.STRING(50), allowNull: false, field:"nombres" })
        declare nombres: string

    @Column({type: DataType.STRING(30), allowNull: false, field:"apellido_paterno" })
        declare apellidoPaterno: string

    @Column({type: DataType.STRING(30), allowNull: false, field:"apellido_materno" })
        declare apellidoMaterno: string

    @Column({type: DataType.INTEGER, allowNull: false, field:"telefono" })
        declare fono: number
    
    @Column({type: DataType.STRING(40), allowNull: false, field:"mail" })
        declare mail: string
    
    @Column({type: DataType.STRING(50), allowNull: false, field:"contrasena" })
        declare contrasena: string
}

export default Empleado