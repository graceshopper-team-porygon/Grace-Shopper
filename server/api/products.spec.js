const { expect } = require("chai");
const request = require("supertest");
const {
  db,
  models: { Product },
} = require("../db");
const seed = require("../../script/seed");
const app = require("../app");

describe("All Products Routes", () => {
  beforeEach(async () => {
    await seed();

  });

  describe('/api/products', () => {
    it('GET /api/products', async() => {
      const res = await request(app).get('/api/products').expect(200)
      expect(res.body.length).to.be.at.least(10)
    })
  })
})
