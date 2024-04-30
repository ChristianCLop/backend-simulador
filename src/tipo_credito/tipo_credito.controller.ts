import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { TipoCreditoService } from './tipo_credito.service';
import { CreateCreditoDto } from './dto/create-credito.dto';
import { Credito } from './tipo_credito.entity';
import { UpdateCreditoDto } from './dto/update-credito.dto';

@Controller('tipo-credito')
export class TipoCreditoController {

    constructor(private creditoService: TipoCreditoService) { }

    @Post()
    createCredito(@Body() newCredito: CreateCreditoDto): Promise<Credito> {
        return this.creditoService.createCredito(newCredito)
    }

    @Get()
    async getCreditos(@Query('bancoId') bancoId: number): Promise<Credito[]> {
        if(bancoId){
            const credito = await this.creditoService.getCreditoByBanco(bancoId);
            return credito;
        }        
    }

    @Get(':id')
    getCredito(@Param('id', ParseIntPipe) id: number): Promise<Credito> {
        return this.creditoService.getCredito(id)
    }

    @Delete(':id')
    deleteCredito(@Param('id', ParseIntPipe) id: number) {
        return this.creditoService.deleteCredito(id)
    }

    @Patch(':id')
    updateCredito(@Param('id', ParseIntPipe) id: number, @Body() credito: UpdateCreditoDto) {
        return this.creditoService.updateCredito(id, credito)
    }
}