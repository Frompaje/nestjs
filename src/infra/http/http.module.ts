import { Module } from "@nestjs/common";
import { CreateAccountController } from "./controllers/create-account.controller";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { CreateQuestionController } from "./controllers/create-question.controller";
import { FecthRecentQuestionsController } from "./controllers/fecth-recent-questions.controller";
import { DatabaseModule } from "../database/database.module";


@Module({
  providers: [DatabaseModule],
  controllers: [CreateAccountController, AuthenticateController, CreateQuestionController, FecthRecentQuestionsController],
})
export class HttpModule { }
