import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Usuario from './domain/usuario.entity';
import { UsuarioController } from './controllers/usuario.controller';
import { UsuarioService } from './services/usuario.service';
import { DataSource } from 'typeorm';
import ormconfig from '../ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig),
  TypeOrmModule.forFeature([Usuario])],
  controllers: [AppController, UsuarioController],
  providers: [AppService, UsuarioService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
