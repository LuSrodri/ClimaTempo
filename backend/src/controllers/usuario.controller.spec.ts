import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from 'src/services/usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig_test from '../../ormconfig_test';
import Usuario from 'src/domain/usuario.entity';
import Cidade from 'src/domain/cidade.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from 'src/auth/constants';
import { ClimaController } from './clima.controller';
import { AuthService } from 'src/services/auth.service';
import { ClimaService } from 'src/services/clima.service';
import { Repository } from 'typeorm';
import GetUsuarioDTO from 'src/dto/GetUsuarioDTO';
import SignInDTO from 'src/dto/SignInDTO';
import { BadRequestException, HttpException } from '@nestjs/common';

describe('UsuarioController', () => {
    let usuarioController: UsuarioController;
    let authController: AuthController;

    let app: TestingModule;
    let usuarioId: string;
    let bearerToken: string;

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

        usuarioController = app.get<UsuarioController>(UsuarioController);
        authController = app.get<AuthController>(AuthController);

        usuarioId = (await usuarioController.createUsuario(new Usuario("Teste", "teste@mail.com", "1234567"))).id;
        bearerToken = (await authController.signIn(new SignInDTO("teste@mail.com", "1234567"))).access_token;
    });

    afterAll(async () => {
        await app.close();
    });

    describe('root', () => {
        it('should return an usuario, given id parameter when this id is the same of the request id', async () => {
            // Arrange
            const id = usuarioId;

            // Act
            const result = await usuarioController.getUsuarioById({ id: id }, { user: { id: id } });

            // Assert
            expect(result).toBeInstanceOf(GetUsuarioDTO);
        });

        it('should return 403 given id parameter when this id is not the same of the request id', async () => {
            // Arrange
            const id = 1;

            try {// Act
                const result = await usuarioController.getUsuarioById({ id: id }, { user: { id: usuarioId } });
            }
            catch (e) {// Assert
                expect(e).toBeInstanceOf(HttpException);
            }
        });

        it('should return an id given a valid data to create usuario', async () => {
            // Arrange
            const nome = "Teste2";
            const email = "teste2@mail.com";
            const senha = "1234567";

            // Act
            const result = (await usuarioController.createUsuario(new Usuario(nome, email, senha))).id;

            // Assert
            expect(result).not.toBeUndefined();
        });

        it('should return 400 given an invalid data to create usuario', async () => {
            // Arrange
            const nome = "";
            const email = "";
            const senha = "";

            try {// Act
                await usuarioController.createUsuario(new Usuario(nome, email, senha));
            }
            catch (e) {// Assert
                expect(e).toBeInstanceOf(BadRequestException);
            }
        });

        it('should return an id given a cidade to add in the user', async () => {
            // Arrange
            const lat = 0;
            const lon = 0;
            const ref = "Teste";
            const id = usuarioId;

            // Act
            const result = (await usuarioController.addCidade({ id: id }, { user: { id: id } }, new Cidade(ref, lat, lon))).id;

            // Assert
            expect(result).not.toBeUndefined();
        });

        it('should return all climas, given an usuario id', async () => {
            // Arrange
            const id = usuarioId;

            // Act
            const result = await usuarioController.getClimas({ id: id }, { user: { id: id } });

            // Assert
            expect(result).not.toBeUndefined();
        });

        it('should return 204 no content, given an usuario id and cidade id when is deleting an cidade', async () => {
            // Arrange
            const id = usuarioId;
            const lat = 1;
            const lon = 1;
            const ref = "Teste";
            const idCidade = (await usuarioController.addCidade({ id: id }, { user: {id: id} }, new Cidade(ref, lat, lon))).id;

            // Act
            const result = (await usuarioController.deleteCidade({ id: id, idCidade: idCidade }, { user: {id: id} })).response;

            // Assert
            expect(result).toEqual("Cidade deletada com sucesso");
        });
    });
});