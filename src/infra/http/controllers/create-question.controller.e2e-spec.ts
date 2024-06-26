import { PrismaService } from "@/infra/database/prisma/prisma.services"
import { INestApplication } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { Test } from "@nestjs/testing"
import { hash } from "bcryptjs"
import request from "supertest"
import { AppModule } from "../../app.module"

describe("Create questions (E2E)", () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService


  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)


    await app.init()
  })


  test("[POST] /questions", async () => {
    const user = await prisma.user.create({
      data: {
        name: "Victor Hugo",
        email: "hx@gmail.com",
        password: await hash("123456", 8)
      }
    })

    const acessToken = jwt.sign({
      sub: user.id
    })


    const response = await request(app.getHttpServer()).post("/questions").set("Authorization", `Bearer ${acessToken}`).send({
      title: "New question",
      content: "Question content"
    })



    expect(response.statusCode).toBe(201)

    const questionOnDataBase = await prisma.question.findFirst({
      where: {
        title: "New question",
      }
    })

    expect(questionOnDataBase.title).toBe("New question")
    expect(questionOnDataBase.authorId).toBe(user.id)
  })


})