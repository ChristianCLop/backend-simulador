import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Credito } from './tipo_credito.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCreditoDto } from './dto/create-credito.dto';
import { UpdateCreditoDto } from './dto/update-credito.dto';
import { BancoService } from 'src/banco/banco.service';

@Injectable()
export class TipoCreditoService {

    constructor(
        @InjectRepository(Credito) private creditoRepository: Repository<Credito>,
        private bancoService: BancoService
    ) { }

    async createCredito(credito: CreateCreditoDto) {
        const bancoFound = await this.bancoService.getBanco(credito.bancoId)
        if (!bancoFound) {
            throw new HttpException(`No se encontro el banco`, HttpStatus.NOT_FOUND);
        }
        const creditoFound = await this.creditoRepository.findOne({
            where: {
                nom_cre: credito.nom_cre
            }
        })
        if (creditoFound) {
            const camposDuplicados = [];
            if (creditoFound.nom_cre) {
                camposDuplicados.push('Nombre');
            }
            const camposDuplicadosCadena = camposDuplicados.join(', ');
            throw new HttpException(`Ya estan registrados los siguientes datos: ${camposDuplicadosCadena}`, HttpStatus.CONFLICT)
        }
        const newCredito = this.creditoRepository.create(credito);
        return this.creditoRepository.save(newCredito);
    }

    async getCreditos() {
        return await this.creditoRepository.find({
            relations: ['banco', 'cobro']
        })
    }

    async getCredito(id: number) {
        const creditoFound = await this.creditoRepository.findOne({
            where: {
                id
            },
            relations: ['banco', 'cobro']
        });
        if (!creditoFound) {
            throw new HttpException(`No se encontro el credito`, HttpStatus.NOT_FOUND);
        }
        return creditoFound;
    }

    async getCreditoByBanco(bancoId: number): Promise<Credito[]> {
        const creditoFound = await this.creditoRepository.find({
            where: {
                bancoId
            },
            relations: ['banco', 'cobro']
        });
        if (!creditoFound) {
            throw new HttpException(`No se encontro el credito`, HttpStatus.NOT_FOUND);
        }
        return creditoFound;
    }

    async deleteCredito(id: number) {
        const result = await this.creditoRepository.delete({ id })
        if (result.affected === 0) {
            throw new HttpException(`No se encontro el credito`, HttpStatus.NOT_FOUND);
        }
        return result
    }

    async updateCredito(id: number, credito: UpdateCreditoDto) {
        const creditoUpdate =  await this.creditoRepository.findOne({
            where:{
                id
            }
         })
    
        if (!creditoUpdate) {
            throw new HttpException(`No se encontró el credito`, HttpStatus.NOT_FOUND);
        }
    
        creditoUpdate.nom_cre = credito.nom_cre;
        creditoUpdate.int_cre = credito.int_cre;
    
        return await this.creditoRepository.save(creditoUpdate);
    }

}
