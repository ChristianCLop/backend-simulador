import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { TipoCreditoModule } from './tipo_credito/tipo_credito.module';
import { CobroModule } from './cobro/cobro.module';
import { BancoModule } from './banco/banco.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ MulterModule.register({
    dest: './public/img',
    storage: diskStorage({
      destination: './public/img',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = file.originalname.split('.').pop();
        cb(null, 'logo_' + uniqueSuffix + '.' + extension);
      },
    }),
  }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'simulador_credito',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    AdminModule,
    TipoCreditoModule,
    CobroModule,
    BancoModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
