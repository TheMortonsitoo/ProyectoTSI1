import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: "empleados"})
class Empleado extends Model{
    @Column({type: DataType.STRING(15), primaryKey: true, allowNull: false, field:"rut_empleado" })
        declare rutEmpleado: string

    @Column({type: DataType.STRING(50), allowNull: true, field:"nombres" })
        declare nombres: string

    @Column({type: DataType.STRING(30), allowNull: true, field:"apellido_paterno" })
        declare apellidoPaterno: string

    @Column({type: DataType.STRING(30), allowNull: true, field:"apellido_materno" })
        declare apellidoMaterno: string

    @Column({type: DataType.STRING(15), allowNull: true, field:"telefono" })
        declare fono: string
    
    @Column({type: DataType.STRING(40), allowNull: true, field:"mail" })
        declare mail: string

    @Column({type: DataType.STRING(40), allowNull: true, field:"rol" })
        declare rol: string
    
    @Column({type: DataType.STRING(60), allowNull: true, field:"contrasena" })
        declare contrasena: string
}

export default Empleado