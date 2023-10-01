import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { creatTestApp } from '../test-utils/creat-test-app'

describe('User Module', () => {
  let app: INestApplication
  beforeAll(async () => {
    app = await creatTestApp()
  })

  it('/users (GET) should return users', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!')
  })

  afterAll(async () => {
    await app.close()
  })
})
