import { IsEmail, IsNotEmpty } from "class-validator";

export default class SignInDTO {
    @IsNotEmpty({message: 'O campo email é obrigatório'})
    @IsEmail({}, {message: 'O campo email deve ser um email válido'})
    email: string;

    @IsNotEmpty({message: 'O campo senha é obrigatório'})
    senha: string;

    constructor(email: string, senha: string) {
        this.email = email;
        this.senha = senha;
    }
}