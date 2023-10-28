import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { DataSource } from 'typeorm'
import { io } from 'socket.io-client'

import { creatTestApp } from '../test-utils/creat-test-app'
import { createDatabase } from '../test-utils/create-database'

import { user1Seed, userAdminSeed } from '../user/seeds/user-admin-seed'

// ===== TEST DATA =====

const adminUser = {
  name: 'Admin',
  email: 'admin@example.com',
  password: '123321',
}

const SOCKET_URL = 'http://localhost:3000/message'

// ===== TEST SUITE =====

describe('Message Module', () => {
  let app: INestApplication
  let db: DataSource
  let token
  const connections = []

  beforeAll(async () => {
    db = await createDatabase(userAdminSeed, user1Seed)
    app = await creatTestApp()
    await app.listen(3000)

    await request(app.getHttpServer())
      .post('/login')
      .send({
        email: adminUser.email,
        password: adminUser.password,
      })
      .set('Accept', 'application/json')
      .then((response) => {
        token = response.body.user.token
      })
  })

  // ===== /message (WS) =====
  it('/message (WS): Connection without token should return { message: "Connection without credentials" }', (done) => {
    const client = io(SOCKET_URL)
    connections.push(client)

    client.on('message', (data) => {
      expect(data).toEqual({ message: 'Connection without credentials' })
      done()
    })
    client.connect()
  })
  it('/message (WS): Connection with token should return { notifications: [] }', (done) => {
    const client = io(SOCKET_URL, { auth: { token } })
    connections.push(client)

    client.on('message', (data) => {
      expect(data).toEqual({ notifications: [] })
      done()
    })
    client.connect()
  })
  it('/message (WS): Connection with incorrect token should return { error: "User not found" }', (done) => {
    const client = io(SOCKET_URL, { auth: { token: 'no-token' } })
    connections.push(client)

    client.on('message', (data) => {
      expect(data).toEqual({ error: 'User not found' })
      done()
    })

    client.connect()
  })

  it('/message (WS): Message handler test', (done) => {
    const client = io(SOCKET_URL, { auth: { token } })
    connections.push(client)

    client.on('message', (data) => {
      if (data.message === 'TEST MESSAGE') {
        done()
      }
    })
    client.emit('message', 'TEST MESSAGE')
  })

  afterAll(async () => {
    await Promise.all(connections.map((connection) => connection.disconnect()))
    await Promise.all(connections.map((connection) => connection.close()))
    await Promise.all(connections.map((connection) => connection.destroy()))
    await app.close()
    await db.dropDatabase()
    await db.destroy()
  })
})
