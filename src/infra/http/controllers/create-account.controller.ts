import { Body, ConflictException, Controller, Post, UsePipes } from "@nestjs/common"
import { PrismaService } from "@/infra/database/prisma/prisma.services";
import { hash } from "bcryptjs"
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipes";



const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string()
})

type createAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller("/accounts")
export class CreateAccountController {
  constructor(private readonly prisma: PrismaService) { }

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: createAccountBodySchema) {

    const { name, email, password } = body

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    if (userWithSameEmail) {
      throw new ConflictException("User with same e-mail address already exists.")
    }

    const hashedPassword = await hash(password, 8)

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })
  }
}
