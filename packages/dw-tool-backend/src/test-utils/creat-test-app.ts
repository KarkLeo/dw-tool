import {
  INestApplication,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { createOrmConfigTest } from '../ormconfig-test'
import { UserModule } from '../user/user.module'
import { CharacterModule } from '../character/character.module'
import { MessageModule } from '../message/message.module'
import { GameModule } from '../game/game.module'
import { AppController } from '../app.controller'
import { AppService } from '../app.service'
import { AuthMiddleware } from '../user/middlewares/auth.middleware'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: createOrmConfigTest,
      inject: [ConfigService],
    }),
    UserModule,
    CharacterModule,
    MessageModule,
    GameModule,
    TestAppModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class TestAppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}

export const creatTestApp = async (): Promise<INestApplication> => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [TestAppModule],
  }).compile()

  const app = moduleRef.createNestApplication()
  await app.init()
  return app
}
