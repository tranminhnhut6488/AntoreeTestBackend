import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './user.service';


@Controller('users')
export class UsersController {
    constructor(private service: UsersService) { }


    @Get(':id')
    get(@Param('id') id: string) { return this.service.get(Number(id)); }


}