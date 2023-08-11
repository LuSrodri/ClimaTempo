import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import Usuario from "src/domain/usuario.entity";
import GetUsuarioDTO from "src/dto/GetUsuarioDTO";
import { UsuarioService } from "src/services/usuario.service";

@Controller('usuarios')
export class UsuarioController {
    constructor(private usuarioService: UsuarioService) { }

    @Get(':id')
    async getUsuarioById(@Param() params: any): Promise<GetUsuarioDTO | Error> {
        try {
            return await this.usuarioService.getUsuarioById(params.id);
        }
        catch (e) {
            throw e;
        }
    }

    @Post()
    async createUsuario(@Body() usuario: Usuario): Promise<{id: string}> {
        try {
            return {id: await this.usuarioService.createUsuario(usuario.nome, usuario.email, usuario.senha)};
        }
        catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }
}