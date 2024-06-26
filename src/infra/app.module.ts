import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticateController } from './http/controllers/authenticate.controller';
import { CreateAccountController } from './http/controllers/create-account.controller';
import { CreateQuestionController } from './http/controllers/create-question.controller';
import { FecthRecentQuestionsController } from './http/controllers/fecth-recent-questions.controller';
import { AuthModule } from './auth/auth.module';
import { envSchema } from './env';
import { PrismaService } from './database/prisma/prisma.services';




@Module({
  imports: [ConfigModule.forRoot({
    validate: env => envSchema.parse(env),
    isGlobal: true
  }),
    AuthModule],
  controllers: [CreateAccountController, AuthenticateController, CreateQuestionController, FecthRecentQuestionsController],
  providers: [PrismaService],
})
export class AppModule { }
