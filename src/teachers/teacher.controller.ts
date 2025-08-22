import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TeachersService } from './teacher.service';


@Controller('teachers')
export class TeachersController {
    constructor(private service: TeachersService) { }


    @Get()
    list(@Query('q') q?: string) { return this.service.list(q); }


    @Get(':id')
    get(@Param('id') id: string) { return this.service.get(Number(id)); }


    @Post()
    create(@Body() dto: any) { return this.service.create(dto); }
    
}