import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CobroService } from './cobro.service';
import { CreateCobroDto } from './dto/create-cobro.dto';
import { Cobros } from './cobro.entity';
import { UpdateCobroDto } from './dto/update-cobro.dto';

@Controller('cobro')
export class CobroController {

    constructor(private cobroService: CobroService) { }

    @Post()
    createCobro(@Body() newCobro: CreateCobroDto): Promise<Cobros> {
        return this.cobroService.createCobro(newCobro)
    }

    @Get()
    async getCobros(@Query('creditoId') creditoId: number):Promise<Cobros[]>{
        if(creditoId){
            return this.cobroService.getCreditoByCredito(creditoId);
        }        
    }

    @Get(':id')
    getCobro(@Param('id', ParseIntPipe) id: number): Promise<Cobros> {
        return this.cobroService.getCobro(id)
    }

    @Delete(':id')
    deleteCobro(@Param('id', ParseIntPipe) id: number) {
        return this.cobroService.deleteCobro(id)
    }

    @Patch(':id')
    updateCobro(@Param('id', ParseIntPipe) id: number, @Body() cobro: UpdateCobroDto) {
        return this.cobroService.updateCobro(id, cobro)
    }

    @Patch(':id/estado')
    async updateEstadoCobro(@Param('id', ParseIntPipe) id: number): Promise<Cobros> {
        return this.cobroService.updateEstadoCobro(id)
    }
}