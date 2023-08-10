export default class GetUsuarioDTO {
    readonly nome: string;
    readonly email: string;

    constructor(nome: string, email: string) {
        this.nome = nome;
        this.email = email;
    }
}