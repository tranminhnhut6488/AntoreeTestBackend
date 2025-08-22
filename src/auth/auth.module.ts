import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [UsersModule, PassportModule, JwtModule.register({ secret: process.env.JWT_SECRET || 'sidjfugkh', signOptions: { expiresIn: '7d' } })],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule { }