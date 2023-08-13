import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(private usuarioService: UsuarioService, private jwtService: JwtService) { }

    async signIn(email: string, pass: string): Promise<any> {
        try {
            const usuario = await this.usuarioService.getUsuarioByEmail(email);
            if (await bcrypt.compare(pass, usuario.senha) === false) {
                throw new Error();
            }
            const payload = { id: usuario.id, email: usuario.email };
            return {
                access_token: await this.jwtService.signAsync(payload),
                id: usuario.id,
            };
        }
        catch (e) {
            throw new UnauthorizedException('Usuário ou senha inválidos');
        }
    }
}