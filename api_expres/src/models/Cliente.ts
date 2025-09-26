import { BeforeCreate, Column, DataType, Model, Table } from "sequelize-typescript";
import bcrypt from "bcrypt";



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
    
    @Column({type: DataType.STRING(15), allowNull: true, field:"fono" })
        declare fono: number
    
    @Column({type: DataType.STRING(40), allowNull: true, field:"mail" })
        declare mail: string
    
    @Column({type: DataType.STRING(40), defaultValue:'Cliente', allowNull: true, field:"rol" })
        declare rol: string 
        

    @Column({type: DataType.STRING(60), field:"contrasena" })
        declare contrasena: string
    @BeforeCreate
    static async hashPassword(cliente: Cliente) {
        cliente.contrasena = await bcrypt.hash(cliente.contrasena, 10);
    }
}

export default Cliente