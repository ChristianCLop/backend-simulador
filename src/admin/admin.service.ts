import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {

    constructor(@InjectRepository(Admin) private adminRepository: Repository<Admin>) { }

    async createAdmin(admin: CreateAdminDto) {
        const { ced_adm, tel_adm, cor_adm } = admin;

        const adminFound = await this.adminRepository.findOne({
            where: [
                { ced_adm },
                { tel_adm },
                { cor_adm },
            ],
        })

        if (adminFound) {
            const camposDuplicados = [];
            if (adminFound.ced_adm === ced_adm) {
                camposDuplicados.push('Cedula');
            }
            if (adminFound.tel_adm === tel_adm) {
                camposDuplicados.push('Telefono');
            }
            if (adminFound.cor_adm === cor_adm) {
                camposDuplicados.push('Correo');
            }
            const camposDuplicadosCadena = camposDuplicados.join(', ');
            throw new HttpException(`Ya estan registrados los siguientes datos: ${camposDuplicadosCadena}`, HttpStatus.CONFLICT);
        }

        const newAdmin = this.adminRepository.create(admin);
        newAdmin.con_adm = await bcrypt.hash(admin.con_adm, 10);
        return this.adminRepository.save(newAdmin);
    }

    async getAdmins() {
        return await this.adminRepository.find()
    }

    async getAdmin(id: number) {
        const adminFound = await this.adminRepository.findOne({
            where: {
                id
            }
        })

        if (!adminFound) {
            throw new HttpException(`No se encontro el administrador`, HttpStatus.NOT_FOUND);
        }

        return adminFound;
    }

    async getAdminByEmail(cor_adm: string) {
        const adminFound = await this.adminRepository.findOne({
            where: {
                cor_adm,
            }
        })

        if (!adminFound) {
            throw new HttpException(`No se encontro el correo`, HttpStatus.NOT_FOUND)
        }

        return adminFound;
    }

    async deleteAdmin(id: number) {
        const result = await this.adminRepository.delete({ id })

        if(result.affected === 0){
            throw new HttpException(`No se encontro el adminsitro`, HttpStatus.NOT_FOUND);
        }

        return result;
    }

    async updateAdmin(id: number, admin: UpdateAdminDto) {
        const adminFound = await this.adminRepository.update({ id }, admin)
    }
}
