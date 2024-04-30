import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cobros } from './cobro.entity';
import { Repository } from 'typeorm';
import { CreateCobroDto } from './dto/create-cobro.dto';
import { UpdateCobroDto } from './dto/update-cobro.dto';
import { TipoCreditoService } from 'src/tipo_credito/tipo_credito.service';

@Injectable()
export class CobroService {

    constructor(@InjectRepository(Cobros) private cobrosRepository: Repository<Cobros>,
    private creditoService: TipoCreditoService) { }

    async createCobro(cobro: CreateCobroDto) {
        const creditoFound = await this.creditoService.getCredito(cobro.creditoId)

        if(!creditoFound){
            throw new HttpException(`No se encontro el credito`, HttpStatus.NOT_FOUND)
        }

        const newCobro = await this.cobrosRepository.create(cobro);
        return this.cobrosRepository.save(newCobro);
    }

    async getCobros() {
        return await this.cobrosRepository.find({
            relations: ['credito']
        });
    }

    async getCobro(id: number) {
        const cobroFound = await this.cobrosRepository.findOne({
            where: {
                id
            },
            relations: ['credito']
        });

        if (!cobroFound) {
            throw new HttpException(`No se encontro el credito`, HttpStatus.NOT_FOUND);
        }

        return cobroFound
    }

    async getCreditoByCredito(creditoId: number){
        const creditoFound = await this.cobrosRepository.find({
            where: {
                creditoId
            },
            relations: ['credito']
        });
        if (!creditoFound) {
            throw new HttpException(`No se encontro el credito`, HttpStatus.NOT_FOUND);
        }
        return creditoFound;
    }

    async deleteCobro(id: number) {
        const result = await this.cobrosRepository.delete({ id })

        if (result.affected === 0) {
            throw new HttpException(`No se encontro el cobro`, HttpStatus.NOT_FOUND);
        }

        return result;
    }

    async updateCobro(id: number, cobro: UpdateCobroDto) {
        return await this.cobrosRepository.update({ id }, cobro)
    }

    async updateEstadoCobro(id: number) {
        const cobro = await this.cobrosRepository.findOne({
            where: {
                id
            }
        })
        cobro.estado = cobro.estado === 1 ? 0 : 1;
        return this.cobrosRepository.save(cobro);
    }
}
