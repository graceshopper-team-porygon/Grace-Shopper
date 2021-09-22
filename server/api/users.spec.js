/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const { db, models: { User } } = require('../db')
const seed = require('../../script/seed');
const app = require('../app')

describe('User routes', () => {
  beforeEach(async() => {
    await seed();
  })

  describe('/api/users/', () => {

    it('does not allow non admins to access all users', async () => {
      const {data} = await request(app).post('/auth/login').send({username:"evil",password:"haxxor"})
      console.log(data)
      const res = await request(app)
        .get('/api/users').set({"Authorization": data.token})
        .expect(401)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
