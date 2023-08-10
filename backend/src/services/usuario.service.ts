import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Usuario from "src/domain/usuario.entity";
import GetUsuarioDTO from "src/dto/GetUsuarioDTO";
import { Repository } from "typeorm";

@Injectable()
export class UsuarioService {
    constructor(@InjectRepository(Usuario) private usuariosRepository: Repository<Usuario>) { }

    async createUsuario(nome: string, email: string, senha: string): Promise<string> {
        if (await this.usuariosRepository.findOne({ where: { email } })) throw new Error('Email já cadastrado');

        try {
            const usuario = new Usuario(nome, email, senha);
            await this.usuariosRepository.save(usuario);
            return usuario.getId();
        }
        catch (e) {
            throw e;
        }
    }

    async getUsuarioById(id: string): Promise<Error | GetUsuarioDTO> {
        const usuario: Usuario | undefined = await this.usuariosRepository.findOne({ where: { id } });
        
        if (!usuario) throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

        return new GetUsuarioDTO(usuario.getNome(), usuario.getEmail());
    }
}