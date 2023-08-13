import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Cidade from "src/domain/cidade.entity";
import Usuario from "src/domain/usuario.entity";
import GetUsuarioDTO from "src/dto/GetUsuarioDTO";
import { Repository } from "typeorm";
const bcrypt = require('bcrypt');

@Injectable()
export class UsuarioService {
    constructor(@InjectRepository(Usuario) private usuariosRepository: Repository<Usuario>, @InjectRepository(Cidade) private cidadeRepository: Repository<Cidade>) { }

    async createUsuario(nome: string, email: string, senha: string): Promise<string> {
        if (await this.usuariosRepository.findOne({ where: { email } })) throw new Error('Email já cadastrado');

        try {
            const usuario = new Usuario(nome, email, await bcrypt.hash(senha, 10));
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

    async getUsuarioByEmail(email: string): Promise<Usuario | undefined> {
        return await this.usuariosRepository.findOne({ where: { email } });
    }

    async addCidade(id: string, ref: string, lat: number, lon: number): Promise<string> {
        const usuario: Usuario | undefined = await this.usuariosRepository.findOne({ where: { id } });

        if (!usuario) throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

        const cidade: Cidade | undefined = await this.cidadeRepository.findOne({ where: { lat, lon }, relations: ['usuario'] });

        if (cidade && cidade.usuario.id == id) throw new HttpException('Cidade já cadastrada', HttpStatus.BAD_REQUEST);

        const newCidade = new Cidade(ref, lat, lon);
        newCidade.usuario = usuario;
        await this.cidadeRepository.save(newCidade);

        return newCidade.id;
    }

    async getCidades(id: string): Promise<Cidade[]> {
        const usuario: Usuario | undefined = await this.usuariosRepository.findOne({ where: { id } });

        if (!usuario) throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

        const cidades: Cidade[] | undefined = await this.cidadeRepository.find({ where: { usuario: { id } } });

        return cidades || [];
    }

    async removeCidade(id: string, cidadeId: string): Promise<void> {
        const usuario: Usuario | undefined = await this.usuariosRepository.findOne({ where: { id } });

        if (!usuario) throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

        const cidade: Cidade | undefined = await this.cidadeRepository.findOne({ where: { id: cidadeId, usuario: { id } } });

        if (!cidade) throw new HttpException('Cidade não encontrada', HttpStatus.NOT_FOUND);

        await this.cidadeRepository.delete(cidade.id);
    }
}