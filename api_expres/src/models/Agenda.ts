import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Empleado from "./Empleado";
import Cliente from "./Cliente";
import Vehiculo from "./Vehiculo";

@Table({tableName: "agendas"})
class Agenda extends Model{
    @Column({type: DataType.STRING(30), primaryKey: true, allowNull: false, field:"cod_agenda" })
        declare codAgenda: string

    @Column({type: DataType.STRING(15), allowNull: false, field:"rut_empleado" })
    @ForeignKey(()=>Empleado)
        declare rutEmpleado: string
    @BelongsTo(() => Empleado)
        declare empleado: Empleado

    @Column({type: DataType.STRING(15), allowNull: false, field:"rut_cliente" })
    @ForeignKey(()=>Cliente)
        declare rutCliente: string
    @BelongsTo(() => Cliente)
        declare cliente: Cliente

    @Column({type: DataType.STRING(10), allowNull: false, field:"patente" })
    @ForeignKey(()=>Vehiculo)
        declare patente: string
    @BelongsTo(() => Vehiculo)
        declare vehiculo: Vehiculo

    @Column({type: DataType.DATEONLY, allowNull: true, field:"fecha" })
        declare fecha: string
    
    @Column({type: DataType.STRING(5), allowNull: true, field:"hora" })
        declare hora: string

    @Column({type: DataType.STRING(20), allowNull: true, field:"estado" })
        declare estado: string

    @Column({ type: DataType.STRING(255), allowNull: true })
        declare observaciones_cliente: string;

    @Column({ type: DataType.STRING(255), allowNull: true })
        declare observaciones_empleado: string;

    @Column({type: DataType.STRING(100), allowNull: true, field:"razon_visita" })
        declare razonVisita: string

    @Column({ type: DataType.STRING(20), allowNull: true, field: "cod_venta" })
        declare codVenta: string;

}

export default Agenda