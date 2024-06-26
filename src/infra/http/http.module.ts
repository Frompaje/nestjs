import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.services";
import { CreateAccountController } from "./controllers/create-account.controller";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { CreateQuestionController } from "./controllers/create-question.controller";
import { FecthRecentQuestionsController } from "./controllers/fecth-recent-questions.controller";


@Module({
  providers: [PrismaService],
  controllers: [CreateAccountController, AuthenticateController, CreateQuestionController, FecthRecentQuestionsController],
})
export class HttpModule { }
