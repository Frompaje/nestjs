import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  public client: PrismaClient

  constructor() {
    super({
      log: ["warn", "error"]
    })
  }
  onModuleInit() {
    throw new Error("Method not implemented.");
  }
  onModuleDestroy() {
    throw new Error("Method not implemented.");
  }


}