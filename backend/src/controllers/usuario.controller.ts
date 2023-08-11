import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import Cidade from "src/domain/cidade.entity";
import Usuario from "src/domain/usuario.entity";
import GetUsuarioDTO from "src/dto/GetUsuarioDTO";
import { ClimaService } from "src/services/clima.service";
import { UsuarioService } from "src/services/usuario.service";

@Controller('usuarios')
export class UsuarioController {
    constructor(private usuarioService: UsuarioService, private climaService: ClimaService) { }

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
    async createUsuario(@Body() usuario: Usuario): Promise<{ id: string }> {
        try {
            return { id: await this.usuarioService.createUsuario(usuario.nome, usuario.email, usuario.senha) };
        }
        catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard)
    @Post(':id/cidades')
    async addCidade(@Param() params: any, @Request() req: any, @Body() cidade: Cidade): Promise<{ id: string }> {
        if (req.user.id != params.id) throw new HttpException('Você não tem permissão para acessar esse recurso', HttpStatus.FORBIDDEN);
        try {
            return { id: await this.usuarioService.addCidade(params.id, cidade.ref, cidade.lat, cidade.lon) };
        }
        catch (e) {
            throw e;
        }
    }

    @UseGuards(AuthGuard)
    @Get(':id/cidades')
    async getCidades(@Param() params: any, @Request() req: any): Promise<{ id, cidades: Cidade[] }> {
        if (req.user.id != params.id) throw new HttpException('Você não tem permissão para acessar esse recurso', HttpStatus.FORBIDDEN);
        try {
            return { id: params.id, cidades: await this.usuarioService.getCidades(params.id) };
        }
        catch (e) {
            throw e;
        }
    }
    
    @UseGuards(AuthGuard)
    @Get(':id/climas')
    async getClimas(@Param() params: any, @Request() req: any): Promise<any[]> {
        if (req.user.id != params.id) throw new HttpException('Você não tem permissão para acessar esse recurso', HttpStatus.FORBIDDEN);
        try {
            return this.climaService.getClimas(params.id);
        }
        catch (e) {
            throw e;
        }
    }
}
