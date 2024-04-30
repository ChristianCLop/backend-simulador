import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards, } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AuthMiddleware } from 'src/auth/auth.middleware';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) { }

  @Post()
  createAdmin(@Body() newAdmin: CreateAdminDto): Promise<Admin> {
    return this.adminService.createAdmin(newAdmin);
  }

  @Get()
  @UseGuards(AuthMiddleware)
  getAdmins(): Promise<Admin[]> {
      return this.adminService.getAdmins();
  }

  @Get(':id')
  getAdmin(@Param('id', ParseIntPipe) id: number): Promise<Admin> {
    return this.adminService.getAdmin(id);
  }

  @Delete(':id')
  deleteAdmin(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteAdmin(id);
  }

  @Patch(':id')
  updateAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() admin: UpdateAdminDto,
  ) {
    return this.adminService.updateAdmin(id, admin);
  }

  @Post('login')
  async login(@Body() loginAdminDto: LoginAdminDto) {
    const { cor_adm, con_adm } = loginAdminDto;
    const admin = await this.adminService.getAdminByEmail(cor_adm);

    if (!admin) {
      throw new HttpException('Correo electronico no valido', HttpStatus.UNAUTHORIZED);
    }

    const isContraseniaValida = await bcrypt.compare(con_adm, admin.con_adm);

    if (!isContraseniaValida) {
      throw new HttpException('Contraseña incorrecta', HttpStatus.UNAUTHORIZED);
    }

    const token = jwt.sign(
      { id: admin.id, cor_adm: admin.cor_adm },
      'secreto',
      { expiresIn: '3h' },
    );

    return { token };
  }
}
