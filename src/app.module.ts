import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateQuestionController } from './controllers/create-question.controller';
import { envSchema } from './env';
import { PrismaService } from './prisma/prisma.services';
import { FecthRecentQuestionsController } from './controllers/fecth-recent-questions.controller';




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
