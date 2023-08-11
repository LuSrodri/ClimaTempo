import { IsEmail, IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import Cidade from "./cidade.entity";

@Entity()
export default class Usuario {
    @PrimaryColumn()
    id: string = uuidv4();

    @Column({
        type: 'varchar',
        length: 255,
    })
    @IsNotEmpty({message: "O nome é obrigatório"})
    nome: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    @IsNotEmpty({message: "O email é obrigatório"})
    @IsEmail({},{message: "O email deve ser válido"})
    email: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    @IsNotEmpty({message: "A senha é obrigatória"})
    senha: string;

    @OneToMany(() => Cidade, cidade => cidade.id)
    cidades: Cidade[];

    constructor(nome: string, email: string, senha: string) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    getId() {
        return this.id;
    }

    getNome() {
        return this.nome;
    }

    setNome(nome: string) {
        this.nome = nome;
    }

    getEmail() {
        return this.email;
    }

    setEmail(email: string) {
        this.email = email;
    }

    getSenha() {
        return this.senha;
    }

    setSenha(senha: string) {
        this.senha = senha;
    }
}