import { IsNotEmpty, Max, Min } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import Usuario from "./usuario.entity";

@Entity()
export default class Cidade {
    @PrimaryColumn()
    id: string = uuidv4();

    @Column({
        type: 'varchar',
        length: 255,
    })
    ref: string;

    @Column("decimal")
    @Min(-90, {message: "A latitude deve ser maior ou igual que -90"})
    @Max(90, {message: "A latitude deve ser menor ou igual que 90"})
    @IsNotEmpty({message: "A latitude é obrigatória"})
    lat: number;

    @Column("decimal")
    @Min(-180, {message: "A longitude deve ser maior ou igual que -180"})
    @Max(180, {message: "A longitude deve ser menor ou igual que 180"})
    @IsNotEmpty({message: "A longitude é obrigatória"})
    lon: number;

    @ManyToOne(() => Usuario, usuario => usuario.id)
    usuario: Usuario;

    constructor(ref: string = "", lat: number, lon: number) {
        this.ref = ref;
        this.lat = lat;
        this.lon = lon;
    }
}