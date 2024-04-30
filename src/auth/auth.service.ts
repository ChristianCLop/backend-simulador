import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

const fakeAdmin = [
    {
        id:1,
        cor_adm: 'a@gmail.com',
        con_adm: '1234'
    },
    {
        id:2,
        cor_adm: 'b@gmail.com',
        con_adm: '1234'
    },
]

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService){

    }

    validadorAdmin({cor_adm, con_adm}: AuthPayloadDto){
        const findAdmin = fakeAdmin.find((admin) => admin.cor_adm === cor_adm);
        if(!findAdmin) return null;

        if(con_adm === findAdmin.con_adm){
            const {con_adm, ...admin} = findAdmin;
            return this.jwtService.sign(admin);
        }
    }

}
