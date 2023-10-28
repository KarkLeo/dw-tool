import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { DataSource } from 'typeorm'
import { ALIGNMENTS, CLASSES, RACES } from 'dw-tool-meta'

import { creatTestApp } from '../test-utils/creat-test-app'
import { createDatabase } from '../test-utils/create-database'

import { user1Seed, userAdminSeed } from '../user/seeds/user-admin-seed'

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

const newCharacter = {
  name: 'New Character',
  looks: ['Look 1', 'Look 2', 'Look 3'],
  race: RACES.human,
  class: CLASSES.bard,
  alignment: ALIGNMENTS.good,
  abilities: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  },
}

// ===== TEST SUITE =====

describe('Character Module', () => {
  let app: INestApplication
  let db: DataSource
  let token: string

  beforeAll(async () => {
    db = await createDatabase(userAdminSeed, user1Seed)
    app = await creatTestApp()

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

  // ===== /characters/create (POST) =====
  it('/characters/create (POST): should return 201 and character entity', () => {
    return request(app.getHttpServer())
      .post('/characters/create') // specify the path you are testing
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .send({
        ...newCharacter,
      }) // send the request data
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: newCharacter.name,
            class: newCharacter.class,
            race: newCharacter.race,
            alignment: newCharacter.alignment,
            looks: expect.arrayContaining(newCharacter.looks),
            strength: newCharacter.abilities.strength,
            dexterity: newCharacter.abilities.dexterity,
            constitution: newCharacter.abilities.constitution,
            intelligence: newCharacter.abilities.intelligence,
            wisdom: newCharacter.abilities.wisdom,
            charisma: newCharacter.abilities.charisma,
            user: expect.objectContaining({
              id: expect.any(Number),
              name: adminUser.name,
              email: adminUser.email,
            }),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          }),
        )
      })
  })
  it('/characters/create (POST): without token should return 401', () => {
    return request(app.getHttpServer())
      .post('/characters/create') // specify the path you are testing
      .set('Accept', 'application/json') // set the headers
      .send({
        ...newCharacter,
      }) // send the request data
      .expect('Content-Type', /json/)
      .expect(401)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({ statusCode: 401, message: 'Unauthorized' }),
        )
      })
  })
  it('/characters/create (POST): without name should return 400', () => {
    return request(app.getHttpServer())
      .post('/characters/create') // specify the path you are testing
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .send({
        looks: newCharacter.looks,
        race: newCharacter.race,
        class: newCharacter.class,
        alignment: newCharacter.alignment,
        abilities: newCharacter.abilities,
      }) // send the request data
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
  it('/characters/create (POST): without looks should return 201 and character entity', () => {
    return request(app.getHttpServer())
      .post('/characters/create') // specify the path you are testing
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .send({
        name: newCharacter.name,
        race: newCharacter.race,
        class: newCharacter.class,
        alignment: newCharacter.alignment,
        abilities: newCharacter.abilities,
      }) // send the request data
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: newCharacter.name,
            class: newCharacter.class,
            race: newCharacter.race,
            alignment: newCharacter.alignment,
            looks: expect.arrayContaining([]),
            strength: newCharacter.abilities.strength,
            dexterity: newCharacter.abilities.dexterity,
            constitution: newCharacter.abilities.constitution,
            intelligence: newCharacter.abilities.intelligence,
            wisdom: newCharacter.abilities.wisdom,
            charisma: newCharacter.abilities.charisma,
            user: expect.objectContaining({
              id: expect.any(Number),
              name: adminUser.name,
              email: adminUser.email,
            }),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          }),
        )
      })
  })
  it('/characters/create (POST): without race should return 400', () => {
    return request(app.getHttpServer())
      .post('/characters/create') // specify the path you are testing
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .send({
        name: newCharacter.name,
        looks: newCharacter.looks,
        class: newCharacter.class,
        alignment: newCharacter.alignment,
        abilities: newCharacter.abilities,
      }) // send the request data
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: expect.arrayContaining([
              'race must be one of the following values: elf, human, halfling, dwarf',
              'race should not be empty',
            ]),
            error: 'Bad Request',
            statusCode: 400,
          }),
        )
      })
  })
  it('/characters/create (POST): with incorrect race should return 400', () => {
    return request(app.getHttpServer())
      .post('/characters/create') // specify the path you are testing
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .send({
        name: newCharacter.name,
        looks: newCharacter.looks,
        race: 'no-race',
        class: newCharacter.class,
        alignment: newCharacter.alignment,
        abilities: newCharacter.abilities,
      }) // send the request data
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: expect.arrayContaining([
              'race must be one of the following values: elf, human, halfling, dwarf',
            ]),
            error: 'Bad Request',
            statusCode: 400,
          }),
        )
      })
  })
  it('/characters/create (POST): without сlass should return 400', () => {
    return request(app.getHttpServer())
      .post('/characters/create') // specify the path you are testing
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .send({
        name: newCharacter.name,
        looks: newCharacter.looks,
        race: newCharacter.race,
        alignment: newCharacter.alignment,
        abilities: newCharacter.abilities,
      }) // send the request data
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: expect.arrayContaining([
              'class must be one of the following values: bard, cleric, druid, fighter, paladin, ranger, thief, wizard',
              'class should not be empty',
            ]),
            error: 'Bad Request',
            statusCode: 400,
          }),
        )
      })
  })
  it('/characters/create (POST): with incorrect сlass should return 400', () => {
    return request(app.getHttpServer())
      .post('/characters/create') // specify the path you are testing
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .send({
        name: newCharacter.name,
        looks: newCharacter.looks,
        race: newCharacter.race,
        class: 'no-class',
        alignment: newCharacter.alignment,
        abilities: newCharacter.abilities,
      }) // send the request data
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: expect.arrayContaining([
              'class must be one of the following values: bard, cleric, druid, fighter, paladin, ranger, thief, wizard',
            ]),
            error: 'Bad Request',
            statusCode: 400,
          }),
        )
      })
  })
  it('/characters/create (POST): without alignment should return 400', () => {
    return request(app.getHttpServer())
      .post('/characters/create') // specify the path you are testing
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .send({
        name: newCharacter.name,
        looks: newCharacter.looks,
        race: newCharacter.race,
        class: newCharacter.class,
        abilities: newCharacter.abilities,
      }) // send the request data
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: expect.arrayContaining([
              'alignment must be one of the following values: lawful, good, neutral, chaotic, evil',
              'alignment should not be empty',
            ]),
            error: 'Bad Request',
            statusCode: 400,
          }),
        )
      })
  })
  it('/characters/create (POST): with incorrect alignment should return 400', () => {
    return request(app.getHttpServer())
      .post('/characters/create') // specify the path you are testing
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .send({
        name: newCharacter.name,
        looks: newCharacter.looks,
        race: newCharacter.race,
        class: newCharacter.class,
        alignment: 'no-alignment',
        abilities: newCharacter.abilities,
      }) // send the request data
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: expect.arrayContaining([
              'alignment must be one of the following values: lawful, good, neutral, chaotic, evil',
            ]),
            error: 'Bad Request',
            statusCode: 400,
          }),
        )
      })
  })
  it('/characters/create (POST): without abilities should return 400', () => {
    return request(app.getHttpServer())
      .post('/characters/create') // specify the path you are testing
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .send({
        name: newCharacter.name,
        looks: newCharacter.looks,
        race: newCharacter.race,
        class: newCharacter.class,
        alignment: newCharacter.alignment,
      }) // send the request data
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: expect.arrayContaining([
              'abilities must be an instance of AbilitiesDto',
              'abilities should not be empty',
            ]),
            error: 'Bad Request',
            statusCode: 400,
          }),
        )
      })
  })
  it('/characters/create (POST): with incorrect abilities should return 400', () => {
    return request(app.getHttpServer())
      .post('/characters/create') // specify the path you are testing
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .send({
        name: newCharacter.name,
        looks: newCharacter.looks,
        race: newCharacter.race,
        class: newCharacter.class,
        alignment: newCharacter.alignment,
        abilities: {},
      }) // send the request data
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: expect.arrayContaining([
              'abilities.strength must not be greater than 18',
              'abilities.strength must not be less than 1',
              'abilities.strength must be an integer number',
              'abilities.strength should not be empty',
              'abilities.dexterity must not be greater than 18',
              'abilities.dexterity must not be less than 1',
              'abilities.dexterity must be an integer number',
              'abilities.dexterity should not be empty',
              'abilities.constitution must not be greater than 18',
              'abilities.constitution must not be less than 1',
              'abilities.constitution must be an integer number',
              'abilities.constitution should not be empty',
              'abilities.intelligence must not be greater than 18',
              'abilities.intelligence must not be less than 1',
              'abilities.intelligence must be an integer number',
              'abilities.intelligence should not be empty',
              'abilities.wisdom must not be greater than 18',
              'abilities.wisdom must not be less than 1',
              'abilities.wisdom must be an integer number',
              'abilities.wisdom should not be empty',
              'abilities.charisma must not be greater than 18',
              'abilities.charisma must not be less than 1',
              'abilities.charisma must be an integer number',
              'abilities.charisma should not be empty',
            ]),
            error: 'Bad Request',
            statusCode: 400,
          }),
        )
      })
  })

  // ===== /characters (GET) =====
  it('/characters (GET): should return 200 and list of character entities', () => {
    return request(app.getHttpServer())
      .get('/characters') // specify the path you are testing
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              class: expect.stringMatching(
                new RegExp(Object.values(CLASSES).join('|')),
              ),
              race: expect.stringMatching(
                new RegExp(Object.values(RACES).join('|')),
              ),
              alignment: expect.stringMatching(
                new RegExp(Object.values(ALIGNMENTS).join('|')),
              ),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            }),
          ]),
        )
      })
  })
  it('/characters (GET): without token should return 401', () => {
    return request(app.getHttpServer())
      .get('/characters') // specify the path you are testing
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(401)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({ statusCode: 401, message: 'Unauthorized' }),
        )
      })
  })
  it('/characters (GET): add to list a new character should list length +1', async () => {
    const server = app.getHttpServer()
    let length

    await request(server)
      .get('/characters') // specify the path you are testing
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        length = response.body.length
      })

    await request(server)
      .post('/characters/create') // specify the path you are testing
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .send({
        ...newCharacter,
      }) // send the request data
      .expect('Content-Type', /json/)
      .expect(201)

    await request(server)
      .get('/characters') // specify the path you are testing
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBe(length + 1)
      })
  })

  // ===== /characters/:id (GET) =====
  it('/characters/:id (GET): should return 200 and character entity', async () => {
    const server = app.getHttpServer()
    let character

    await request(server)
      .get('/characters') // specify the path you are testing
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBeGreaterThanOrEqual(1)
        character = response.body[0]
      })

    await request(server)
      .get(`/characters/${character.id}`) // specify the path you are testing
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.id).toBe(character.id)
        expect(response.body.name).toBe(character.name)
        expect(response.body.class).toBe(character.class)
        expect(response.body.race).toBe(character.race)
        expect(response.body.alignment).toBe(character.alignment)
      })
  })
  it('/characters/:id (GET): with incorrect id should return 404', () => {
    return request(app.getHttpServer())
      .get('/characters/999999') // specify the path you are testing
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({
          statusCode: 404,
          message: 'Character does not exist',
        })
      })
  })
  it('/characters/:id (GET): with incorrect and invalid id should return 400', () => {
    return request(app.getHttpServer())
      .get('/characters/no-id') // specify the path you are testing
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({
          message: 'Validation failed (numeric string is expected)',
          error: 'Bad Request',
          statusCode: 400,
        })
      })
  })
  it('/characters/:id (GET): without token should return 401', () => {
    return request(app.getHttpServer())
      .get('/characters/1') // specify the path you are testing
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
  it('/characters/:id (GET): someone else`s character should return 200 and character entity', async () => {
    const server = app.getHttpServer()
    let character
    let otherToken

    await request(server)
      .get('/characters') // specify the path you are testing
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBeGreaterThanOrEqual(1)
        character = response.body[0]
      })

    await request(server)
      .post('/login')
      .send({
        email: user1.email,
        password: user1.password,
      })
      .set('Accept', 'application/json')
      .then((response) => {
        otherToken = response.body.user.token
      })

    await request(server)
      .get(`/characters/${character.id}`) // specify the path you are testing
      .auth(otherToken, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.id).toBe(character.id)
        expect(response.body.name).toBe(character.name)
        expect(response.body.class).toBe(character.class)
        expect(response.body.race).toBe(character.race)
        expect(response.body.alignment).toBe(character.alignment)
      })
  })

  // ===== /characters/:id (DELETE) =====
  it('/characters/:id (DELETE): should return 200 and character entity', async () => {
    const server = app.getHttpServer()
    let character
    let length

    await request(server)
      .get('/characters') // specify the path you are testing
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBeGreaterThanOrEqual(1)
        character = response.body[0]
        length = response.body.length
      })

    await request(server)
      .delete(`/characters/${character.id}`) // specify the path you are testing
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.id).toBe(character.id)
        expect(response.body.name).toBe(character.name)
        expect(response.body.class).toBe(character.class)
        expect(response.body.race).toBe(character.race)
        expect(response.body.alignment).toBe(character.alignment)
      })

    await request(server)
      .get('/characters') // specify the path you are testing
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBe(length - 1)
      })
  })
  it('/characters/:id (DELETE): with incorrect id should return 404', () => {
    return request(app.getHttpServer())
      .delete('/characters/999999') // specify the path you are testing
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({
          statusCode: 404,
          message: 'Character does not exist',
        })
      })
  })
  it('/characters/:id (DELETE): with incorrect and invalid id should return 400', () => {
    return request(app.getHttpServer())
      .delete('/characters/no-id') // specify the path you are testing
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({
          message: 'Validation failed (numeric string is expected)',
          error: 'Bad Request',
          statusCode: 400,
        })
      })
  })
  it('/characters/:id (DELETE): without token should return 401', () => {
    return request(app.getHttpServer())
      .delete('/characters/1') // specify the path you are testing
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
  it('/characters/:id (DELETE): someone else`s character should return 403', async () => {
    const server = app.getHttpServer()
    let character
    let otherToken

    await request(server)
      .get('/characters') // specify the path you are testing
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBeGreaterThanOrEqual(1)
        character = response.body[0]
      })

    await request(server)
      .post('/login')
      .send({
        email: user1.email,
        password: user1.password,
      })
      .set('Accept', 'application/json')
      .then((response) => {
        otherToken = response.body.user.token
      })

    await request(server)
      .delete(`/characters/${character.id}`) // specify the path you are testing
      .auth(otherToken, { type: 'bearer' })
      .set('Accept', 'application/json') // set the headers
      .expect('Content-Type', /json/)
      .expect(403)
      .then((response) => {
        expect(response.body).toEqual({
          statusCode: 403,
          message: 'You are not an author',
        })
      })
  })

  afterAll(async () => {
    await app.close()
    await db.dropDatabase()
    await db.destroy()
  })
})
