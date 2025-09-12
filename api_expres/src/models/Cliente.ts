import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: "clientes"})
class Cliente extends Model{

    @Column({type: DataType.STRING, primaryKey: true, allowNull: false, field:"rut_cliente" })
        declare rutCliente: string

    @Column({type: DataType.STRING(30), allowNull: false, field:"nombre" })
        declare nombre: string
    
    @Column({type: DataType.STRING(30), allowNull: false, field:"apellido_paterno" })
        declare apellidoPaterno: string

    @Column({type: DataType.STRING(30), allowNull: false, field:"apellido_materno" })
        declare apellidoMaterno: string
    
    @Column({type: DataType.STRING(60), allowNull: false, field:"direccion" })
        declare direccion: string
    
    @Column({type: DataType.INTEGER, allowNull: false, field:"telefono" })
        declare fono: number
    
    @Column({type: DataType.STRING(40), allowNull: false, field:"mail" })
        declare mail: string
    
    @Column({type: DataType.STRING(50), allowNull: false, field:"contrasena" })
        declare contrasena: string
}

export default Cliente