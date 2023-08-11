import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Usuario from './domain/usuario.entity';
import { UsuarioController } from './controllers/usuario.controller';
import { UsuarioService } from './services/usuario.service';
import { DataSource } from 'typeorm';
import ormconfig from '../ormconfig';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { AuthController } from './controllers/auth.controller';
import Cidade from './domain/cidade.entity';
import { ClimaController } from './controllers/clima.controller';
import { ClimaService } from './services/clima.service';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig),
  TypeOrmModule.forFeature([Usuario]),
  TypeOrmModule.forFeature([Cidade]),
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '7d' },
  }),],
  controllers: [AppController, UsuarioController, AuthController, ClimaController],
  providers: [AppService, UsuarioService, AuthService, ClimaService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
