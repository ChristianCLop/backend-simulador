import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BancoService } from './banco.service';
import { CreateBancoDto } from './dto/create-banco.dto';
import { Banco } from './banco.entity';
import { UpdateBancoDto } from './dto/update-banco.dto';

@Controller('banco')
export class BancoController {

    constructor(private bancoService: BancoService) { }

    @Post()
    createBanco(@Body() newBanco: CreateBancoDto): Promise<Banco> {
        return this.bancoService.createBanco(newBanco)
    }

    @Get()
    getBancos(): Promise<Banco[]>{
        return this.bancoService.getBancos()
    }

    @Get(':id')
    getBanco(@Param('id', ParseIntPipe) id:number): Promise<Banco>{
        return this.bancoService.getBanco(id)
    }

    @Delete(':id')
    deleteBanco(@Param('id', ParseIntPipe) id: number){
        return this.bancoService.deleteBanco(id)
    }

    @Patch(':id')
    updateBanco(@Param('id', ParseIntPipe) id: number, @Body() banco: UpdateBancoDto){
        return this.bancoService.updateBanco(id, banco)
    }
}
