import { Controller, Get, Param } from "@nestjs/common";
import { ClimaService } from "src/services/clima.service";

@Controller('climas')
export class ClimaController {
    constructor(private climaService: ClimaService) { }

    @Get(':cidade')
    async getCidades(@Param() params: any): Promise<string[]> {
        try {
            return await this.climaService.buscaCidades(params.cidade);
        }
        catch (e) {
            throw e;
        }
    }
}
