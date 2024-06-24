import { Body, Controller, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipes";
import { PrismaService } from "src/prisma/prisma.services";
import { z } from "zod";


const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string()
})

type authenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller("/sessions")
export class AuthenticateController {
  constructor(private readonly jwt: JwtService, private readonly prisma: PrismaService) { }

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: authenticateBodySchema) {
    const { email, password } = body

    const user = await this.prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      throw new UnauthorizedException("User credentials do not match.")
    }

    const isPassowrdValid = await compare(password, user.password)

    if (!isPassowrdValid) {
      throw new UnauthorizedException("User credentials do not match.")
    }

    const accessToken = this.jwt.sign({ sub: user.id })


    return {
      acess_token: accessToken
    }

  }
}