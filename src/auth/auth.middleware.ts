import { NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';


export class AuthMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        const toke = req.headers.authorization?.split('')[1];

        if(!toke){
            throw new UnauthorizedException('No tiene acceso');
        }

        try {
            const decodeToken = jwt.verify(toke, 'abc123zyx987');
            req['admin'] = decodeToken;
        } catch (error) {
            throw new UnauthorizedException('Token no valido');
        }
    }
}