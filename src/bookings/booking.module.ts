import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { BookingsService } from './booking.service';
import { BookingsController } from './booking.controller';


@Module({
    imports: [TypeOrmModule.forFeature([Booking])],
    controllers: [BookingsController],
    providers: [BookingsService],
})
export class BookingsModule { }