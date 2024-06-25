import { PrismaClient } from "@prisma/client"
import { execSync } from "child_process"
import { randomUUID } from "crypto"
import "dotenv/config"

const prisma = new PrismaClient()


if (!process.env.DATABASE_URL) {
  throw new Error("Please provider a DATABASE_URL environment variable")
}

function generateUniqueDatabaseURL(schemaID: string) {
  const url = new URL(process.env.DATABASE_URL)


  url.searchParams.set("schema", schemaID)

  return url.toString()
}

const schemaUUid = randomUUID()
beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseURL(schemaUUid)

  process.env.DATABASE_URL = databaseURL


  execSync("npx prisma migrate deploy")
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaUUid}" CASCADE`)
  await prisma.$disconnect()

})