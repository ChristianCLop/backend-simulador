import { Module } from '@nestjs/common';
import { BancoController } from './banco.controller';
import { BancoService } from './banco.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banco } from './banco.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Banco])],
  controllers: [BancoController],
  providers: [BancoService],
  exports: [BancoService]
})
export class BancoModule {}
