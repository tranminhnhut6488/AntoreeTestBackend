import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Teacher } from './teacher.entity';


@Injectable()
export class TeachersService {
    constructor(@InjectRepository(Teacher) private repo: Repository<Teacher>) { }


    list(q?: string) {
        if (q) return this.repo.find({ where: [{ expertise: ILike(`%${q}%`) }, { bio: ILike(`%${q}%`) }] });
        return this.repo.find();
    }


    create(data: Partial<Teacher>) { return this.repo.save(this.repo.create(data)); }

    get(id: number) {
        return this.repo.findOne({ where: { id } }).then(t => {
            if (t) {
                return { ...t, imageUrl: process.env.BASE_URL + t.image };
            }
            return null;
        });
    }

}