import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/user.service';

@Injectable()
export class AuthService {
    constructor(private users: UsersService, private jwt: JwtService) { }

    async register(name: string, email: string, password: string, role = 'student') {
        const existed = await this.users.findByEmail(email);
        if (existed) {
            return { status: 'ERROR', message: 'Tài khoản đã tồn tại' };
        }
        const passwordHash = await bcrypt.hash(password, 10);
        await this.users.create({ name, email, passwordHash, role: role as any });
        return { status: 'OK', message: "Đăng ký thành công" };
    }

    async login(email: string, password: string) {
        const user = await this.users.findByEmail(email);
        if (!user) {
            return { status: 'ERROR', message: 'Không tìm thấy tài khoản' };
        }
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) {
            return { status: 'ERROR', message: 'Sai mật khẩu, vui lòng nhập lại' };
        }
        return this.sign(user);
    }

    private sign(user: any) {
        const payload = { id: user.id };
        return { access_token: this.jwt.sign(payload), status: 'OK', message: "Đăng nhập thành công" };
    }
}