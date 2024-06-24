import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { Env } from "src/env";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],

      async useFactory(config: ConfigService<Env>) {
        const secret = config.get("JWT_SECRET")
        return { secret }
      }
    })
  ]
})
export class AuthModule {


}