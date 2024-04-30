import { Module } from '@nestjs/common';
import { TipoCreditoController } from './tipo_credito.controller';
import { TipoCreditoService } from './tipo_credito.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credito } from './tipo_credito.entity';
import { BancoModule } from 'src/banco/banco.module';

@Module({
  imports: [TypeOrmModule.forFeature([Credito]), BancoModule],
  controllers: [TipoCreditoController],
  providers: [TipoCreditoService],
  exports: [TipoCreditoService]
})
export class TipoCreditoModule { }
