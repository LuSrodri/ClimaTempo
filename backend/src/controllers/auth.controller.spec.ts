import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from 'src/services/auth.service';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from 'src/services/usuario.service';
import Usuario from 'src/domain/usuario.entity';
import { JwtModule } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import Cidade from 'src/domain/cidade.entity';
import { jwtConstants } from 'src/auth/constants';
import { ClimaController } from './clima.controller';
import { ClimaService } from 'src/services/clima.service';
import { UnauthorizedException } from '@nestjs/common';
import ormconfig_test from '../../ormconfig_test';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let usuarioController: UsuarioController;

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

    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
    usuarioController = app.get<UsuarioController>(UsuarioController);

    await usuarioController.createUsuario(new Usuario("Teste", "teste@mail.com", "1234567"));
  });

  afterAll(async () => {
    await app.close();
  });

  describe('root', () => {
    it('should return bearer token given an existing user', async () => {
      //Arrange
      const email = "teste@mail.com";
      const senha = "1234567";

      //Act
      const result = await authController.signIn({ email, senha });

      //Assert
      expect(result).toHaveProperty('access_token');
    });

    it('should return 401 given an invalid user', async () => {
      //Arrange
      const email = "teste2@mail.com";
      const senha = "1234567";

      //Act
      try {
        await authController.signIn({ email, senha });
      }
      catch (e) {//Assert
        expect(e).toBeInstanceOf(UnauthorizedException);
      }
    });
  });
});
