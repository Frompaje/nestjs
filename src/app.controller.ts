import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.services';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly prisma: PrismaService
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("/hello")
  async store() {
    return await this.prisma.user.findMany()
  }
}
