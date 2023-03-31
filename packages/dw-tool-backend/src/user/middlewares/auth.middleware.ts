import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Response, Request } from 'express'
import { ExpressRequestInterface } from '../../types/expressRequest.interface'
import { verify } from 'jsonwebtoken'
import { JWT_SECRET } from 'src/config'
import { UserService } from '../user.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null
      next()
      return
    }

    const [_, token] = req.headers.authorization.split(' ')

    try {
      const decoded = verify(token, JWT_SECRET)
      const user = await this.userService.findById(decoded.id)
      req.user = user
      next()
    } catch (error) {
      req.user = null
      next()
    }
  }
}
