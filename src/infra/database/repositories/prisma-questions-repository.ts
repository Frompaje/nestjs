import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.services";
import { PrismaQuestionMapper } from "../mappers/prisma-question-mapper";


@Injectable()
export class PrismaQuestionsRepositoy implements QuestionsRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        id
      }
    })
    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }

  async findBySlug(slug: string): Promise<Question> {
    const question = await this.prisma.question.findUnique({
      where: {
        slug
      }
    })

    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const questions = await this.prisma.question.findMany({
      orderBy: {
        createAt: "desc"
      },
      take: 20,
      skip: (page - 1) * 20
    })

    if (!questions) {
      return null
    }

    return questions.map(questions => {
      return PrismaQuestionMapper.toDomain(questions)
    })
  }

  async create(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)

    await this.prisma.question.create({
      data
    })
  }

  async save(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)

    await this.prisma.question.update({
      where: {
        id: data.id
      },
      data
    })
  }

  async delete(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)

    await this.prisma.question.delete({
      where: {
        id: data.id
      }
    })

  }
}