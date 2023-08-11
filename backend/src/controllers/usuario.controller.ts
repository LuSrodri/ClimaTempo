import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import Usuario from "src/domain/usuario.entity";
import GetUsuarioDTO from "src/dto/GetUsuarioDTO";
import { UsuarioService } from "src/services/usuario.service";

@Controller('usuarios')
export class UsuarioController {
    constructor(private usuarioService: UsuarioService) { }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getUsuarioById(@Param() params: any, @Request() req: any): Promise<GetUsuarioDTO | Error> {
        if (req.user.id != params.id) throw new HttpException('Você não tem permissão para acessar esse recurso', HttpStatus.FORBIDDEN);
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
