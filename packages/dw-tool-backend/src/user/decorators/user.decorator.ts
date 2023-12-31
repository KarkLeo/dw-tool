import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { ExpressRequestInterface } from '../../types/expressRequest.interface'

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<ExpressRequestInterface>()

  if (!request.user) {
    return null
  }

  return data ? request.user[data] : request.user
})
