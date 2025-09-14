import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: "clientes"})
class Cliente extends Model{

    @Column({type: DataType.STRING(15), primaryKey: true, allowNull: false, field:"rut_cliente" })
        declare rutCliente: string

    @Column({type: DataType.STRING(30), allowNull: true, field:"nombre" })
        declare nombre: string
    
    @Column({type: DataType.STRING(30), allowNull: true, field:"apellido_paterno" })
        declare apellidoPaterno: string

    @Column({type: DataType.STRING(30), allowNull: true, field:"apellido_materno" })
        declare apellidoMaterno: string
    
    @Column({type: DataType.STRING(60), allowNull: true, field:"direccion" })
        declare direccion: string
    
    @Column({type: DataType.INTEGER, allowNull: true, field:"telefono" })
        declare fono: number
    
    @Column({type: DataType.STRING(40), allowNull: true, field:"mail" })
        declare mail: string
    
    @Column({type: DataType.STRING(50), allowNull: true, field:"contrasena" })
        declare contrasena: string
}

export default Cliente