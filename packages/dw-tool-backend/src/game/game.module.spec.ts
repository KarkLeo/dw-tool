import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { DataSource } from 'typeorm'
import { io } from 'socket.io-client'

import { creatTestApp } from '../test-utils/creat-test-app'
import { createDatabase } from '../test-utils/create-database'

import {
  user1Seed,
  user2Seed,
  userAdminSeed,
} from '../user/seeds/user-admin-seed'
import { GameStatusesEnum } from './types/gameStatuses.enum'
import { PlayerStatusesEnum } from './player/types/playerStatusesEnum'
import { NotificationGameForPlayerEnum } from '../message/notification/types/notificationData.types'

// ===== TEST DATA =====

const adminUser = {
  name: 'Admin',
  email: 'admin@example.com',
  password: '123321',
}

const user1 = {
  name: 'User 1',
  email: 'user.1@example.com',
  password: '123321',
}

const user2 = {
  name: 'User 2',
  email: 'user.2@example.com',
  password: '123321',
}

const newGame = {
  name: 'New Game',
  description: 'New Game Description',
}

const SOCKET_URL = 'http://localhost:3000/message'

// ===== TEST SUITE =====

describe('Character Module', () => {
  let app: INestApplication
  let db: DataSource
  const users = {
    admin: null,
    user1: null,
    user2: null,
  }
  const connections = {
    admin: null,
    user1: null,
    user2: null,
  }
  let game = null

  beforeAll(async () => {
    db = await createDatabase(userAdminSeed, user1Seed, user2Seed)
    app = await creatTestApp()
    await app.listen(3000)

    // Fetch users
    await Promise.all([
      request(app.getHttpServer())
        .post('/login')
        .send({
          email: adminUser.email,
          password: adminUser.password,
        })
        .set('Accept', 'application/json')
        .then((response) => {
          users.admin = response.body.user
        }),
      request(app.getHttpServer())
        .post('/login')
        .send({
          email: user1.email,
          password: user1.password,
        })
        .set('Accept', 'application/json')
        .then((response) => {
          users.user1 = response.body.user
        }),
      request(app.getHttpServer())
        .post('/login')
        .send({
          email: user2.email,
          password: user2.password,
        })
        .set('Accept', 'application/json')
        .then((response) => {
          users.user2 = response.body.user
        }),
    ])

    // Init socket connections
    connections.admin = io(SOCKET_URL, { auth: { token: users.admin.token } })
    connections.user1 = io(SOCKET_URL, { auth: { token: users.user1.token } })
    connections.user2 = io(SOCKET_URL, { auth: { token: users.user2.token } })
  })

  // ===== /games/create (POST) =====
  it('/games/create (POST): should return 201 and game entity with notifications', (done) => {
    const gotNotifications = {
      user1: false,
      user2: false,
    }
    // Handle notifications after game creation for user1 and user2
    connections.user1.on('message', (message) => {
      const necessaryNotification = message.notifications.find(
        (notification) => {
          try {
            return (
              notification.type ===
                NotificationGameForPlayerEnum.NT_GAME_FOR_PLAYER_INVITE &&
              notification.data.gameId === game.id
            )
          } catch {
            return false
          }
        },
      )
      if (necessaryNotification) {
        expect(necessaryNotification).toEqual({
          id: expect.any(Number),
          type: NotificationGameForPlayerEnum.NT_GAME_FOR_PLAYER_INVITE,
          createdAt: expect.any(String),
          data: expect.objectContaining({
            gameId: game.id,
            gameName: game.name,
          }),
          read: false,
          from: expect.objectContaining({
            id: users.admin.id,
            name: users.admin.name,
            email: users.admin.email,
          }),
        })
        gotNotifications.user1 = true
        if (gotNotifications.user1 && gotNotifications.user2) done()
      }
    })
    connections.user2.on('message', (message) => {
      const necessaryNotification = message.notifications.find(
        (notification) => {
          try {
            return (
              notification.type ===
                NotificationGameForPlayerEnum.NT_GAME_FOR_PLAYER_INVITE &&
              notification.data.gameId === game.id
            )
          } catch {
            return false
          }
        },
      )
      if (necessaryNotification) {
        expect(necessaryNotification).toEqual({
          id: expect.any(Number),
          type: NotificationGameForPlayerEnum.NT_GAME_FOR_PLAYER_INVITE,
          createdAt: expect.any(String),
          data: expect.objectContaining({
            gameId: game.id,
            gameName: game.name,
          }),
          read: false,
          from: expect.objectContaining({
            id: users.admin.id,
            name: users.admin.name,
            email: users.admin.email,
          }),
        })
        gotNotifications.user2 = true
        if (gotNotifications.user1 && gotNotifications.user2) done()
      }
    })

    request(app.getHttpServer())
      .post('/games/create') // specify the path you are testing
      .auth(users.admin.token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .send({
        ...newGame,
        users: [{ id: users.user1.id }, { id: users.user2.id }],
      }) // send the request data
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        game = response.body
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            status: GameStatusesEnum.PENDING,
            name: newGame.name,
            description: newGame.description,
            players: expect.arrayContaining([
              {
                user: expect.objectContaining({
                  id: expect.any(Number),
                  name: expect.any(String),
                  email: expect.any(String),
                }),
                status: PlayerStatusesEnum.PENDING,
                isOwner: false,
                isGM: false,
                id: expect.any(Number),
              },
              {
                user: expect.objectContaining({
                  id: expect.any(Number),
                  name: expect.any(String),
                  email: expect.any(String),
                }),
                status: PlayerStatusesEnum.PENDING,
                isOwner: false,
                isGM: false,
                id: expect.any(Number),
              },
              {
                user: expect.objectContaining({
                  id: users.admin.id,
                  name: users.admin.name,
                  email: users.admin.email,
                }),
                status: PlayerStatusesEnum.ACCEPTED,
                isOwner: true,
                isGM: true,
                id: expect.any(Number),
              },
            ]),
          }),
        )
      })
  })
  it('/games/create (POST): without token should return 401 and { statusCode: 401, message: "Unauthorized" }', () => {
    return request(app.getHttpServer())
      .post('/games/create') // specify the path you are testing
      .set('Accept', 'application/json') // set the headers
      .send({
        ...newGame,
        users: [{ id: users.user1.id }, { id: users.user2.id }],
      }) // send the request data
      .expect('Content-Type', /json/)
      .expect(401)
      .then((response) => {
        expect(response.body).toEqual({
          statusCode: 401,
          message: 'Unauthorized',
        })
      })
  })
  it('/games/create (POST): without game name should return 400', () => {
    return request(app.getHttpServer())
      .post('/games/create') // specify the path you are testing
      .auth(users.admin.token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .send({
        description: newGame.description,
        users: [{ id: users.user1.id }, { id: users.user2.id }],
      }) // send the request data
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({
          error: 'Bad Request',
          message: expect.arrayContaining(['name should not be empty']),
          statusCode: 400,
        })
      })
  })
  it('/games/create (POST): without users should return 400', () => {
    return request(app.getHttpServer())
      .post('/games/create') // specify the path you are testing
      .auth(users.admin.token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .send({
        name: newGame.name,
        description: newGame.description,
      }) // send the request data
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({
          error: 'Bad Request',
          message: expect.arrayContaining(['users must be an array']),
          statusCode: 400,
        })
      })
  })
  it('/games/create (POST): with incorrect users should return 400', () => {
    return request(app.getHttpServer())
      .post('/games/create') // specify the path you are testing
      .auth(users.admin.token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .send({
        name: newGame.name,
        description: newGame.description,
        users: ['no-user', { noId: 'no-id' }],
      }) // send the request data
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({
          error: 'Bad Request',
          message: expect.arrayContaining([
            'users.each value in nested property users must be either object or array',
            'users.1.id must be an integer number',
          ]),
          statusCode: 400,
        })
      })
  })

  // ===== /games (GET) =====
  it('/games (GET): should return 200 and list of games', () => {
    return request(app.getHttpServer())
      .get('/games') // specify the path you are testing
      .auth(users.user1.token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              status: GameStatusesEnum.PENDING,
              name: newGame.name,
              description: newGame.description,
              players: expect.arrayContaining([
                {
                  user: expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    email: expect.any(String),
                  }),
                  status: PlayerStatusesEnum.PENDING,
                  isOwner: false,
                  isGM: false,
                  id: expect.any(Number),
                },
                {
                  user: expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    email: expect.any(String),
                  }),
                  status: PlayerStatusesEnum.PENDING,
                  isOwner: false,
                  isGM: false,
                  id: expect.any(Number),
                },
                {
                  user: expect.objectContaining({
                    id: users.admin.id,
                    name: users.admin.name,
                    email: users.admin.email,
                  }),
                  status: PlayerStatusesEnum.ACCEPTED,
                  isOwner: true,
                  isGM: true,
                  id: expect.any(Number),
                },
              ]),
            }),
          ]),
        )
      })
  })
  it('/games (GET): without token should return 401 and and { statusCode: 401, message: "Unauthorized" }', () => {
    return request(app.getHttpServer())
      .get('/games') // specify the path you are testing
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(401)
      .then((response) => {
        expect(response.body).toEqual({
          statusCode: 401,
          message: 'Unauthorized',
        })
      })
  })

  // ===== /games/:id (GET) =====
  it('/games/:id (GET): should return 200 and game entity', () => {
    return request(app.getHttpServer())
      .get(`/games/${game.id}`) // specify the path you are testing
      .auth(users.user1.token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            status: GameStatusesEnum.PENDING,
            name: newGame.name,
            description: newGame.description,
            players: expect.arrayContaining([
              {
                user: expect.objectContaining({
                  id: expect.any(Number),
                  name: expect.any(String),
                  email: expect.any(String),
                }),
                status: PlayerStatusesEnum.PENDING,
                isOwner: false,
                isGM: false,
                id: expect.any(Number),
                character: null,
              },
              {
                user: expect.objectContaining({
                  id: expect.any(Number),
                  name: expect.any(String),
                  email: expect.any(String),
                }),
                status: PlayerStatusesEnum.PENDING,
                isOwner: false,
                isGM: false,
                id: expect.any(Number),
                character: null,
              },
              {
                user: expect.objectContaining({
                  id: users.admin.id,
                  name: users.admin.name,
                  email: users.admin.email,
                }),
                status: PlayerStatusesEnum.ACCEPTED,
                isOwner: true,
                isGM: true,
                id: expect.any(Number),
                character: null,
              },
            ]),
          }),
        )
      })
  })
  it('/games/:id (GET): without token should return 401 and and { statusCode: 401, message: "Unauthorized" }', () => {
    return request(app.getHttpServer())
      .get(`/games/${game.id}`) // specify the path you are testing
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(401)
      .then((response) => {
        expect(response.body).toEqual({
          statusCode: 401,
          message: 'Unauthorized',
        })
      })
  })
  it('/games/:id (GET): with incorrect id should return 404', () => {
    return request(app.getHttpServer())
      .get(`/games/999999`) // specify the path you are testing
      .auth(users.user1.token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({
          statusCode: 404,
          message: 'Game does not exist',
        })
      })
  })
  it('/games/:id (GET): with incorrect and invalid id should return 400', () => {
    return request(app.getHttpServer())
      .get(`/games/no-id`) // specify the path you are testing
      .auth(users.user1.token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({
          message: 'Validation failed (numeric string is expected)',
          error: 'Bad Request',
          statusCode: 400,
        })
      })
  })

  afterAll(async () => {
    await Promise.all(
      Object.values(connections).map((connection) => connection.disconnect()),
    )
    await Promise.all(
      Object.values(connections).map((connection) => connection.close()),
    )
    await Promise.all(
      Object.values(connections).map((connection) => connection.destroy()),
    )

    await app.close()
    await db.dropDatabase()
    await db.destroy()
  })
})
