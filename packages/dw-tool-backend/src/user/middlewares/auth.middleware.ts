import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Response } from 'express'
import { ExpressRequestInterface } from '../../types/expressRequest.interface'
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
    try {
      req.user = await this.userService.findByToken(req.headers.authorization)
      next()
    } catch (error) {
      req.user = null
      next()
    }
  }
}
