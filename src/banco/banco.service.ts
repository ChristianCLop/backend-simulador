import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Banco } from './banco.entity';
import { Repository } from 'typeorm';
import { CreateBancoDto } from './dto/create-banco.dto';
import { UpdateBancoDto } from './dto/update-banco.dto';

@Injectable()
export class BancoService {

    constructor(@InjectRepository(Banco) private bancoRepository: Repository<Banco>) { }

    async createBanco(banco: CreateBancoDto) {
        const bancoFound = await this.bancoRepository.findOne({
            where: {
                nom_ban: banco.nom_ban
            }
        })

        if (bancoFound) {
            const camposDuplicados = [];
            if (bancoFound.nom_ban) {
                camposDuplicados.push('Nombre');
            }
            const camposDuplicadosCadena = camposDuplicados.join(', ');
            throw new HttpException(`Ya estan registrados los siguientes datos: ${camposDuplicadosCadena} `, HttpStatus.CONFLICT);
        }

        const newBanco = this.bancoRepository.create(banco);
        return this.bancoRepository.save(newBanco);
    }

    async getBancos() {
        return await this.bancoRepository.find({
            relations: ['credito']
        })
    }

    async getBanco(id: number) {
        const bancoFound = await this.bancoRepository.findOne({
            where: {
                id
            },
            relations: ['credito']
        })

        if(!bancoFound){
            throw new HttpException(`No se encontro el banco`, HttpStatus.NOT_FOUND);
        }

        return bancoFound;
    }

    async deleteBanco(id: number) {
        const result = await this.bancoRepository.delete({ id })

        if(result.affected === 0){
            throw new HttpException(`No se encontro el banco`, HttpStatus.NOT_FOUND);
        }

        return result;
    }

    async updateBanco(id: number, banco: UpdateBancoDto) {
        const bancoToUpdate = await this.bancoRepository.findOne({
            where:{
                id
            }
        });
    
        if (!bancoToUpdate) {
            throw new HttpException(`No se encontró el banco`, HttpStatus.NOT_FOUND);
        }
    
        bancoToUpdate.nom_ban = banco.nom_ban;
        bancoToUpdate.log_ban = banco.log_ban;
        bancoToUpdate.tas_ban = banco.tas_ban;
    
        return await this.bancoRepository.save(bancoToUpdate);
    }

}
