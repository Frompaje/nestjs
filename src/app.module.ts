import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.services';
import { CreateAccountController } from './controllers/create-account.controller';
import { ConfigModule } from '@nestjs/config';
import { object } from 'zod';
import { envSchema } from './en';




@Module({
  imports: [ConfigModule.forRoot({
    validate: env => envSchema.parse(env),
    isGlobal: true
  })],
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule { }
