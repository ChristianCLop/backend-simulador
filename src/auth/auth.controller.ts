import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('login')
    login(@Body() authPayloadDto: AuthPayloadDto){
        const admin = this.authService.validadorAdmin(authPayloadDto);

        if(!admin){
            throw new HttpException('Credenciales Incorrectas', 401);
        }
        return admin;
    }

}
