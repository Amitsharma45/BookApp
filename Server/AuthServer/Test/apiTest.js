const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../server');
chai.should();
chai.use(chaiHttp);


describe("Auth SERVICE TESTING", () => {
    describe("1) POST login", () => {
        it("Login to The website", (done) => {
            chai.request(app)
                .post("/api/login")
                .send({
                    email: 'test@gmail.com',
                    password: '123456'
                })
                .end((err, data) => {
                    data.should.have.status(200);
                    data.body.should.be.a('object');
                    done();
                });
        });
        it("Login to The website with wrong password", (done) => {
            chai.request(app)
                .post("/api/login")
                .send({
                    email: 'test@gmail.com',
                    password: '1234567'
                })
                .end((err, data) => {
                    data.should.have.status(401);
                    data.body.should.be.a('object');
                    done();
                });
        });
    });
});
describe("2) Register User/api/register", () => {
    it("Register User", (done) => {
        let user =
        {
            "firstName": "Amaawwwwit",
            "lastName": "sharme",
            "email": "sha@mgmmail.com",
            "password": "12345"
        }
        chai.request(app)
            .post("/api/register")
            .send(user)
            .end(async (err, res) => {
                await res.should.have.status(409);
                await res.body.should.be.a('object');
                done();
            })

    });
    it("Register User Again ", (done) => {
        let user =
        {
            "firstName": "Amaawwwwit",
            "lastName": "sharme",
            "email": "sha@gmmail.com",
            "password": "12345"
        }
        chai.request(app)
            .post("/api/register")
            .send(user)
            .end(async (err, res) => {
                await res.should.have.status(409);
                done();
            })
    });
});
describe('3)User Profile', () => {
    it("should GET User Profile by id", (done) => {
        chai.request(app)
            .post("/api/login")
            .send({
                email: 'test@gmail.com',
                password: '123456'
            })
            .end((err, data) => {
                token = data.body.token
                // console.log(data)
                const header = {
                    "Authorization": token
                }
                chai.request(app)
                    .get('/api/profile')
                    .set(header)
                    .end((err, res) => {
                        // console.log(res.text)
                        res.should.have.status(200);
                        done();
                    });
            });
    });
});
describe('4)User isAuthenticated or Not', () => {
    it("Check USer is isAuthenticated or Not", (done) => {
        chai.request(app)
            .post("/api/login")
            .send({
                email: 'test@gmail.com',
                password: '123456'
            })
            .end((err, data) => {
                token = data.body.token
                const header = {
                    "Authorization": token
                }
                chai.request(app)
                    .get('/api/isAuthenticated')
                    .set(header)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
    });
    it("Check USer is isAuthenticated or Not", (done) => {
        chai.request(app)
            .post("/api/login")
            .send({
                email: 'test@gmail.com',
                password: '123456'
            })
            .end((err, data) => {
                token = data.body.token
                const header = {
                    "Authorization": token+'a'
                }
                chai.request(app)
                    .get('/api/isAuthenticated')
                    .set(header)
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    });
            });
    });

});