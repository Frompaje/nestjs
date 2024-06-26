import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.services";
import { PrismaQuestionsRepositoy } from "./repositories/prisma-questions-repository";
import { PrismaQuestionCommentsRepositoy } from "./repositories/prisma-questions-comments-repository";
import { PrismaQuestionAttachmentsRepositoy } from "./repositories/prisma-questions-attachments-repository";
import { PrismaAnswersRepositoy } from "./repositories/prisma-answers-repository";
import { PrismaAnswerCommentsRepository } from "./repositories/prisma-answers-comments-repository";
import { PrismaAnswerAttachmentsRepository } from "./repositories/prisma-answers-attachments-repository";

@Module({
  providers: [
    PrismaService,
    PrismaQuestionsRepositoy,
    PrismaQuestionCommentsRepositoy,
    PrismaQuestionAttachmentsRepositoy,
    PrismaAnswersRepositoy,
    PrismaAnswerCommentsRepository,
    PrismaAnswerAttachmentsRepository
  ],
  exports: [PrismaService,
    PrismaQuestionsRepositoy,
    PrismaQuestionCommentsRepositoy,
    PrismaQuestionAttachmentsRepositoy,
    PrismaAnswersRepositoy,
    PrismaAnswerCommentsRepository,
    PrismaAnswerAttachmentsRepository]
})
export class DatabaseModule {
}