const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../index')
const Person = require('../models/person')

const api = supertest(app)


describe('api test', () => {
  beforeEach(async () => {
    await Person.deleteMany({})

    const personObjects = helper.initialPersons.map(
      (person) =>
        new Person({
          ...person,
        })
    )
    const promiseArray = personObjects.map((person) => person.save())
    await Promise.all(promiseArray)
  })

  test('persons are returned as json', async () => {
    await api
      .get('/api/persons')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('a new blog is successfully created', async () => {
    const newPerson = {
      name: 'Dan Abramov',
      number: '12-43-234345',
    }

    await api
      .post('/api/persons')
      .send(newPerson)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const personAtEnd = await helper.personsInDb()
    expect(personAtEnd).toHaveLength(helper.initialPersons.length + 1)

    const storedPerson = personAtEnd[personAtEnd.length - 1]
    expect(personAtEnd).toContainEqual({
      id: storedPerson.id,
      ...newPerson,
    })
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})