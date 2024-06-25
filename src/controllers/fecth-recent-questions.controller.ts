import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipes";
import { PrismaService } from "src/prisma/prisma.services";
import { z } from "zod";

const pageQueryParamSchema = z.string().optional().default("1").transform(Number).pipe(
  z.number().min(1)
)

type pageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)


@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class FecthRecentQuestionsController {
  constructor(private readonly prisma: PrismaService) { }

  @Get()
  async handle(@Query("page", queryValidationPipe) page: pageQueryParamSchema) {

    const perPage = 20


    const questions = await this.prisma.question.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createAt: "desc"
      }
    })

    return { questions }
  }
}

