import { BadRequestException, PipeTransform } from "@nestjs/common"
import { fromZodError } from "zod-validation-error"
import { ZodError, ZodSchema } from "zod"

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) { }

  transform(value: any) {
    try {
      const schemaParse = this.schema.parse(value)
      return schemaParse
    } catch (error) {

      if (error instanceof ZodError) {
        throw new BadRequestException({
          error: fromZodError(error),
          message: "Validation Failed",
          statusCode: 400
        })

      }
      throw new BadRequestException("Validation failed")
    }
    return value
  }
}
