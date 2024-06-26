import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.services";


@Injectable()
export class PrismaQuestionsRepositoy implements QuestionsRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        id
      }
    })
    return question
  }

  findBySlug(slug: string): Promise<Question> {
    throw new Error("Method not implemented.");
  }

  findManyRecent(params: PaginationParams): Promise<Question[]> {
    throw new Error("Method not implemented.");
  }

  save(question: Question): Promise<void> {
    throw new Error("Method not implemented.");
  }

  create(question: Question): Promise<void> {
    throw new Error("Method not implemented.");
  }

  delete(question: Question): Promise<void> {
    throw new Error("Method not implemented.");
  }

}