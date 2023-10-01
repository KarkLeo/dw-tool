import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { createOrmConfig } from '../ormconfig'
import { UserModule } from '../user/user.module'
import { CharacterModule } from '../character/character.module'
import { MessageModule } from '../message/message.module'
import { GameModule } from '../game/game.module'
import { AppController } from '../app.controller'
import { AppService } from '../app.service'

export const creatTestApp = async (): Promise<INestApplication> => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: createOrmConfig,
        inject: [ConfigService],
      }),
      UserModule,
      CharacterModule,
      MessageModule,
      GameModule,
    ],
    controllers: [AppController],
    providers: [AppService],
  }).compile()

  const app = moduleRef.createNestApplication()
  await app.init()
  return app
}
