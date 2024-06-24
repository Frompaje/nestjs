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
      global: true,
      async useFactory(config: ConfigService<Env>) {
        const privateKey = config.get("JWT_PRIVATE")
        const publicKey = config.get("JWT_PUBLIC")
        return { signOptions: { algorithm: "RS256" }, privateKey: Buffer.from(privateKey, "base64"), publicKey: Buffer.from(publicKey, "base64") }
      }
    })
  ]
})
export class AuthModule {


}