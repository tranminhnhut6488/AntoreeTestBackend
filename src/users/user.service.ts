import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';


@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }


    findByEmail(email: string) { return this.repo.findOne({ where: { email } }); }
    findById(id: number) { return this.repo.findOne({ where: { id } }); }


    async create(data: Partial<User>) {
        const u = this.repo.create(data);
        return this.repo.save(u);
    }

    get(id: number) { return this.repo.findOne({ where: { id } }); }
}