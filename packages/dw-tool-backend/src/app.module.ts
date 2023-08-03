import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ClassModule } from './class/class.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { dataSourceOptions } from './ormconfig'
import { UserModule } from './user/user.module'
import { AuthMiddleware } from './user/middlewares/auth.middleware'
import { CharacterModule } from './character/character.module'
import { MessageModule } from './message/message.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ClassModule,
    UserModule,
    CharacterModule,
    MessageModule,
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
