import testEmail from "src/functions/testEmail";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export default class Usuario {
    @PrimaryColumn()
    id: string = uuidv4();

    @Column({
        type: 'varchar',
        length: 255,
    })
    nome: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    senha: string;

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
        if(!testEmail(email)) throw new Error('Email inválido');

        this.email = email;
    }

    getSenha() {
        return this.senha;
    }

    setSenha(senha: string) {
        this.senha = senha;
    }
}