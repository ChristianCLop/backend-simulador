import { Module } from '@nestjs/common';
import { CobroController } from './cobro.controller';
import { CobroService } from './cobro.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cobros } from './cobro.entity';
import { TipoCreditoModule } from 'src/tipo_credito/tipo_credito.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cobros]), TipoCreditoModule],
  controllers: [CobroController],
  providers: [CobroService]
})
export class CobroModule {}
