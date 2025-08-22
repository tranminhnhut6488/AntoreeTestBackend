import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Booking } from './booking.entity';

@Injectable()
export class BookingsService {
    constructor(
        @InjectRepository(Booking)
        private bookingsRepo: Repository<Booking>,
    ) { }

    findAll() {
        return this.bookingsRepo.find({ relations: ['student', 'teacher'] });
    }

    async create(dto: Partial<Booking>) {
        const existingBookings = await this.bookingsRepo.find({
            where: {
                student: { id: dto.student?.id },
                teacher: { id: dto.teacher?.id },
            },
            relations: ['student', 'teacher'],
        });

        const hasTrial = existingBookings.some(b => b.status === 'trial');
        if (dto.status === 'trial' && hasTrial) {
            return { status: 'ERROR', message: 'Bạn chỉ được học thử 1 lần với giáo viên này' };
        }

        const hasActiveOfficial = existingBookings.some(b => b.status === 'official');
        if (dto.status === 'official' && hasActiveOfficial) {
            return { status: 'ERROR', message: 'Bạn đã đăng ký học chính thức với giáo viên này' };
        }

        const hasActivePackage = existingBookings.some(b => b.status === 'package');
        if (dto.status === 'package' && hasActivePackage) {
            return { status: 'ERROR', message: 'Bạn đã có một gói học đang diễn ra với giáo viên này' };
        }

        const booking = this.bookingsRepo.create(dto);
        return this.bookingsRepo.save(booking);
    }

}
