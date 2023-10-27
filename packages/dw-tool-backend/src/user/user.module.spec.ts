import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { DataSource } from 'typeorm'

import { creatTestApp } from '../test-utils/creat-test-app'
import { createDatabase } from '../test-utils/create-database'

import { userAdminSeed } from './seeds/user-admin-seed'

// ===== TEST DATA =====

const adminUser = {
  name: 'Admin',
  email: 'admin@example.com',
  password: '123321',
}

const newUser = {
  name: 'User',
  email: 'user@example.com',
  password: '123321',
}

const updatedAdminUser = {
  name: 'New Admin',
  email: 'new-admin@example.com',
  password: '12345678',
}

// ===== TEST SUITE =====

describe('User Module', () => {
  let app: INestApplication
  let db: DataSource

  beforeAll(async () => {
    db = await createDatabase(userAdminSeed)
    app = await creatTestApp()
  })

  // ===== /login (POST) =====
  it('/login (POST): should return 201 and user entity', () => {
    return request(app.getHttpServer())
      .post('/login') // specify the path you are testing
      .send({
        email: adminUser.email,
        password: adminUser.password,
      }) // send the request data
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body.user).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            email: adminUser.email,
            name: adminUser.name,
            token: expect.any(String),
          }),
        )
      })
  })
  it('/login (POST): without right email should return 442', () => {
    return request(app.getHttpServer())
      .post('/login') // specify the path you are testing
      .send({
        email: 'no-admin@example.com',
        password: adminUser.password,
      }) // send the request data
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(422)
  })
  it('/login (POST): without right password should return 442', () => {
    return request(app.getHttpServer())
      .post('/login') // specify the path you are testing
      .send({
        email: adminUser.email,
        password: 'no-123321',
      }) // send the request data
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(422)
  })

  // ===== /register (POST) =====
  it('/register (POST): should return 201 and user entity', () => {
    return request(app.getHttpServer())
      .post('/register') // specify the path you are testing
      .send({
        ...newUser,
      }) // send the request data
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body.user).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            email: newUser.email,
            name: newUser.name,
            token: expect.any(String),
          }),
        )
      })
  })
  it('/register (POST): without name should return 400', () => {
    return request(app.getHttpServer())
      .post('/register') // specify the path you are testing
      .send({
        email: newUser.email,
        password: newUser.password,
      }) // send the request data
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: expect.arrayContaining(['name should not be empty']),
            error: 'Bad Request',
            statusCode: 400,
          }),
        )
      })
  })
  it('/register (POST): without email should return 400', () => {
    return request(app.getHttpServer())
      .post('/register') // specify the path you are testing
      .send({
        name: newUser.name,
        password: newUser.password,
      }) // send the request data
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: expect.arrayContaining([
              'email must be an email',
              'email should not be empty',
            ]),
            error: 'Bad Request',
            statusCode: 400,
          }),
        )
      })
  })
  it('/register (POST): with incorrect email should return 400', () => {
    return request(app.getHttpServer())
      .post('/register') // specify the path you are testing
      .send({
        name: newUser.name,
        email: 'no-email',
        password: newUser.password,
      }) // send the request data
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: expect.arrayContaining(['email must be an email']),
            error: 'Bad Request',
            statusCode: 400,
          }),
        )
      })
  })
  it('/register (POST): without password should return 400', () => {
    return request(app.getHttpServer())
      .post('/register') // specify the path you are testing
      .send({
        name: newUser.name,
        email: newUser.email,
      }) // send the request data
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: expect.arrayContaining(['password should not be empty']),
            error: 'Bad Request',
            statusCode: 400,
          }),
        )
      })
  })
  it('/register (POST): without name and email should return 400', () => {
    return request(app.getHttpServer())
      .post('/register') // specify the path you are testing
      .send({
        password: newUser.password,
      }) // send the request data
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: expect.arrayContaining([
              'name should not be empty',
              'email must be an email',
              'email should not be empty',
            ]),
            error: 'Bad Request',
            statusCode: 400,
          }),
        )
      })
  })
  it('/register (POST): without email and password should return 400', () => {
    return request(app.getHttpServer())
      .post('/register') // specify the path you are testing
      .send({
        name: newUser.name,
      }) // send the request data
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: expect.arrayContaining([
              'email must be an email',
              'email should not be empty',
              'password should not be empty',
            ]),
            error: 'Bad Request',
            statusCode: 400,
          }),
        )
      })
  })
  it('/register (POST): without name and password should return 400', () => {
    return request(app.getHttpServer())
      .post('/register') // specify the path you are testing
      .send({
        email: newUser.email,
      }) // send the request data
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: expect.arrayContaining([
              'name should not be empty',
              'password should not be empty',
            ]),
            error: 'Bad Request',
            statusCode: 400,
          }),
        )
      })
  })
  it('/register (POST): with existing email should return 422', () => {
    return (
      request(app.getHttpServer())
        .post('/register') // specify the path you are testing
        .send({
          name: newUser.name,
          email: adminUser.email,
          password: newUser.password,
        }) // send the request data
        .set('Accept', 'application/json') // set the headers
        .expect('Content-Type', /json/)
        // .expect(422)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              message: 'User already exists',
              statusCode: 422,
            }),
          )
        })
    )
  })

  // ===== /me (GET) =====
  it('/me (GET): should return 200 and user entity', () => {
    const server = app.getHttpServer()
    return request(server)
      .post('/login') // specify the path you are testing
      .send({
        email: adminUser.email,
        password: adminUser.password,
      }) // send the request data
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        const token = response.body.user.token

        return request(server)
          .get('/me')
          .auth(token, { type: 'bearer' })
          .expect(200)
          .then((response) => {
            expect(response.body.user).toEqual(
              expect.objectContaining({
                id: expect.any(Number),
                email: adminUser.email,
                name: adminUser.name,
                token: expect.any(String),
              }),
            )
          })
      })
  })
  it('/me (GET): without token should return 401', () => {
    return request(app.getHttpServer())
      .get('/me')
      .auth('no-token', { type: 'bearer' })
      .expect(401)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            statusCode: 401,
            message: 'Unauthorized',
          }),
        )
      })
  })

  // ===== /me (PATCH) =====
  it('/me (PATCH): without token should return 401', () => {
    return request(app.getHttpServer())
      .patch('/me')
      .auth('no-token', { type: 'bearer' })
      .expect(401)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            statusCode: 401,
            message: 'Unauthorized',
          }),
        )
      })
  })
  it('/me (PATCH): update name should return 200 and user entity', () => {
    const server = app.getHttpServer()
    return request(server)
      .post('/login') // specify the path you are testing
      .send({
        email: adminUser.email,
        password: adminUser.password,
      }) // send the request data
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        const token = response.body.user.token

        return request(server)
          .patch('/me')
          .send({
            name: updatedAdminUser.name,
          })
          .auth(token, { type: 'bearer' })
          .expect(200)
          .then((response) => {
            expect(response.body.user).toEqual(
              expect.objectContaining({
                id: expect.any(Number),
                email: adminUser.email,
                name: updatedAdminUser.name,
                token: expect.any(String),
              }),
            )
          })
      })
  })
  it('/me (PATCH): update password should return 200 and user entity', () => {
    const server = app.getHttpServer()
    return request(server)
      .post('/login') // specify the path you are testing
      .send({
        email: adminUser.email,
        password: adminUser.password,
      }) // send the request data
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        const token = response.body.user.token

        return request(server)
          .patch('/me')
          .send({
            password: updatedAdminUser.password,
          })
          .auth(token, { type: 'bearer' })
          .expect(200)
          .then((response) => {
            expect(response.body.user).toEqual(
              expect.objectContaining({
                id: expect.any(Number),
                email: adminUser.email,
                name: updatedAdminUser.name,
                token: expect.any(String),
              }),
            )

            return request(server)
              .post('/login') // specify the path you are testing
              .send({
                email: adminUser.email,
                password: updatedAdminUser.password,
              }) // send the request data
              .set('Accept', 'application/json') // set the headers
              .expect('Content-Type', /json/)
              .then((response) => {
                expect(response.body.user).toEqual(
                  expect.objectContaining({
                    id: expect.any(Number),
                    email: adminUser.email,
                    name: updatedAdminUser.name,
                    token: expect.any(String),
                  }),
                )
              })
          })
      })
  })
  it('/me (PATCH): update email should return 200 and user entity', () => {
    const server = app.getHttpServer()
    return request(server)
      .post('/login') // specify the path you are testing
      .send({
        email: adminUser.email,
        password: updatedAdminUser.password,
      }) // send the request data
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        const token = response.body.user.token

        return request(server)
          .patch('/me')
          .send({
            email: updatedAdminUser.email,
          })
          .auth(token, { type: 'bearer' })
          .expect(200)
          .then((response) => {
            expect(response.body.user).toEqual(
              expect.objectContaining({
                id: expect.any(Number),
                email: updatedAdminUser.email,
                name: updatedAdminUser.name,
                token: expect.any(String),
              }),
            )

            return request(server)
              .post('/login') // specify the path you are testing
              .send({
                email: updatedAdminUser.email,
                password: updatedAdminUser.password,
              }) // send the request data
              .set('Accept', 'application/json') // set the headers
              .expect('Content-Type', /json/)
              .then((response) => {
                expect(response.body.user).toEqual(
                  expect.objectContaining({
                    id: expect.any(Number),
                    email: updatedAdminUser.email,
                    name: updatedAdminUser.name,
                    token: expect.any(String),
                  }),
                )
              })
          })
      })
  })
  it('/me (PATCH): update email to existing email should return 422', () => {
    const server = app.getHttpServer()
    return request(server)
      .post('/login') // specify the path you are testing
      .send({
        email: updatedAdminUser.email,
        password: updatedAdminUser.password,
      }) // send the request data
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        const token = response.body.user.token

        return request(server)
          .patch('/me')
          .send({
            email: newUser.email,
          })
          .auth(token, { type: 'bearer' })
          .expect(422)
          .then((response) => {
            expect(response.body).toEqual(
              expect.objectContaining({
                statusCode: 422,
                message: 'User already exists',
              }),
            )
          })
      })
  })
  it('/me (PATCH): update email to current email should return 200 and user entity', () => {
    const server = app.getHttpServer()
    return request(server)
      .post('/login') // specify the path you are testing
      .send({
        email: updatedAdminUser.email,
        password: updatedAdminUser.password,
      }) // send the request data
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        const token = response.body.user.token

        return request(server)
          .patch('/me')
          .send({
            email: updatedAdminUser.email,
          })
          .auth(token, { type: 'bearer' })
          .expect(200)
          .then((response) => {
            expect(response.body.user).toEqual(
              expect.objectContaining({
                id: expect.any(Number),
                email: updatedAdminUser.email,
                name: updatedAdminUser.name,
                token: expect.any(String),
              }),
            )

            return request(server)
              .post('/login') // specify the path you are testing
              .send({
                email: updatedAdminUser.email,
                password: updatedAdminUser.password,
              }) // send the request data
              .set('Accept', 'application/json') // set the headers
              .expect('Content-Type', /json/)
              .then((response) => {
                expect(response.body.user).toEqual(
                  expect.objectContaining({
                    id: expect.any(Number),
                    email: updatedAdminUser.email,
                    name: updatedAdminUser.name,
                    token: expect.any(String),
                  }),
                )
              })
          })
      })
  })

  afterAll(async () => {
    await app.close()
    await db.dropDatabase()
    await db.destroy()
  })
})
