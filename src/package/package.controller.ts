import { Controller, Post, Body, Get, Patch, Param } from '@nestjs/common';
import { PackageService } from './package.service';

@Controller('packages')
export class PackageController {
  constructor(private readonly service: PackageService) { }

  @Post('buy')
  buy(@Body() body: { studentId: number; name: string; type: string; price: number }) {
    return this.service.buyPackage(body.studentId, body.name, body.type, body.price);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Patch(':id/pay')
  updatePaid(@Param('id') id: number) {
    return this.service.updatePaid(+id);
  }
}