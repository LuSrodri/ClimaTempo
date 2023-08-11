import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Cidade from "src/domain/cidade.entity";
import Usuario from "src/domain/usuario.entity";
import { Repository } from "typeorm";
import 'dotenv/config';

@Injectable()
export class ClimaService {
    constructor(@InjectRepository(Usuario) private usuariosRepository: Repository<Usuario>, @InjectRepository(Cidade) private cidadeRepository: Repository<Cidade>) { }

    async buscaCidades(nomeCidade: string): Promise<string[]> {
        try {
            const response = await fetch(`${process.env.API_WEATHER_URL}geo/1.0/direct?q=${nomeCidade}&appid=${process.env.API_WEATHER_KEY}`);
            const data = await response.json();
            return data.map((obj: any) => { return { name: obj.name, lat: obj.lat, lon: obj.lon }; });
        }
        catch (e) {
            throw new BadRequestException("Ocorreu um erro ao buscar as cidades");
        }
    }

    async getClimas(id: string): Promise<any[]> {
        const usuario: Usuario | undefined = await this.usuariosRepository.findOne({ where: { id } });

        if (!usuario) throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

        const cidades: Cidade[] = await this.cidadeRepository.find({ where: { usuario: { id } } }) || [];

        const climas: any[] = [];

        try {
            for (const cidade in cidades) {
                const response = await fetch(`${process.env.API_WEATHER_URL}data/2.5/weather?lat=${cidades[cidade].lat}&lon=${cidades[cidade].lon}&appid=${process.env.API_WEATHER_KEY}&units=metric`);
                const data = await response.json();
                climas.push({ nome: cidades[cidade].ref, current: data });
            }
        }
        catch (e) {
            throw new BadRequestException("Ocorreu um erro ao buscar dados de clima");
        }

        return climas;
    }
}