/* global describe beforeEach it */

const { expect } = require("chai");
const request = require("supertest");
const {
  db,
  models: { User },
} = require("../db");
const seed = require("../../script/seed");
const app = require("../app");

describe("Auth Routes", () => {
  beforeEach(async () => {
    await seed();
    
  });

  describe("/auth/signup/", () => {
    it("POST /auth/signup", async () => {
      const res = await request(app)
        .post("/auth/signup")
        .send({username:"charming",password:"duchess"})
        .expect(200);
      //see if it returns a token
      const test = await User.findAll({where: {username: "charming"}})
      expect(test.length).to.equal(1)
    });
    it('does not allow for injection attacks',async()=>{
        const res = await request(app)
        .post("/auth/signup")
        .send({username:"evil",password:"duchess",isAdmin: true})
        .expect(200);
        const test = await User.findOne({where: {username: "evil"}})
        expect(test.isAdmin).to.equal(false)
    })
  });

  describe("/auth/login/", () => {
    it("POST /auth/login for user in db", async () => {
        await User.create({
            username: "duchess",
            password: "charming",
          });
      const res = await request(app)
        .post("/auth/login")
        .send({username: "duchess",password: "charming"})
        .expect(200);
      //see if it returns a token
      expect(res.body).to.be.a("object");
      expect(res.body.token.length).to.be.at.least(10);
    });
  }); // end describe('/api/users')
}); // end describe('User routes')
