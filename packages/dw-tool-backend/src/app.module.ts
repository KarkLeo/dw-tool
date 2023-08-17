import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { createOrmConfig } from './ormconfig'
import { UserModule } from './user/user.module'
import { AuthMiddleware } from './user/middlewares/auth.middleware'
import { CharacterModule } from './character/character.module'
import { MessageModule } from './message/message.module'
import { GameModule } from './game/game.module'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
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
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
