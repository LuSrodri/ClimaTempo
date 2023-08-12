import { Test, TestingModule } from '@nestjs/testing';
import { ClimaController } from './clima.controller';
import { ClimaService } from 'src/services/clima.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig_test from '../../ormconfig_test';
import Usuario from 'src/domain/usuario.entity';
import Cidade from 'src/domain/cidade.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { UsuarioController } from './usuario.controller';
import { AuthController } from './auth.controller';
import { UsuarioService } from 'src/services/usuario.service';
import { AuthService } from 'src/services/auth.service';
import { Repository } from 'typeorm';

describe('ClimaController', () => {
    let climaController: ClimaController;

    let app: TestingModule;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            imports: [TypeOrmModule.forRoot(ormconfig_test),
            TypeOrmModule.forFeature([Usuario]),
            TypeOrmModule.forFeature([Cidade]),
            JwtModule.register({
                global: true,
                secret: jwtConstants.secret,
                signOptions: { expiresIn: '7d' },
            }),],
            controllers: [UsuarioController, AuthController, ClimaController],
            providers: [UsuarioService, AuthService, ClimaService, Repository<Usuario>, Repository<Cidade>],
        }).compile();

        climaController = app.get<ClimaController>(ClimaController);
    });

    afterAll(async () => {
        await app.close();
    });

    describe('root', () => {
        it('should return a string array given "cidade" param', async () => {
            //Arrange
            const cidade: string = "São Paulo";
            const stringArray: string[] = [];

            //Act
            const result = await climaController.getCidades({ cidade: cidade });

            //Assert
            expect(typeof result).toEqual(typeof stringArray);
        });
    });
});