import { Controller, Get, Post, Body } from '@nestjs/common';
import { BookingsService } from './booking.service';


@Controller('bookings')
export class BookingsController {
    constructor(private bookingsService: BookingsService) { }


    @Get()
    findAll() {
        return this.bookingsService.findAll();
    }


    @Post()
    create(@Body() dto: any) {
        return this.bookingsService.create(dto);
    }
}