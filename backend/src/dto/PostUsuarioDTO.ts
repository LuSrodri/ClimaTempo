import testEmail from "src/functions/testEmail";

export default class PostUsuarioDTO {
    readonly nome: string;
    readonly email: string;
    readonly senha: string;

    constructor(nome: string, email: string, senha: string) {
        if (!nome || !email || !senha) throw new Error('Dados inválidos');

        if(!testEmail(email)) throw new Error('Email inválido');
        
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
}