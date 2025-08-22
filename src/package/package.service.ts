import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package } from './package.entity';

@Injectable()
export class PackageService {
  constructor(@InjectRepository(Package) private repo: Repository<Package>) { }

  buyPackage(studentId: number, name: string, type: string, price: number) {
    const isTrial = type === 'trial';
    const pkg = this.repo.create({
      student: { id: studentId } as any,
      name,
      type,
      price,
      isPaid: isTrial ? true : false,
    });
    return this.repo.save(pkg);
  }

  findAll() {
    return this.repo.find({ relations: ['student'] });
  }

  async updatePaid(id: number) {
    const pkg = await this.repo.findOne({ where: { id } });
    if (!pkg) return { status: 'ERROR', message: 'Thất bại' };
    pkg.isPaid = true;
    return this.repo.save(pkg);
  }
}