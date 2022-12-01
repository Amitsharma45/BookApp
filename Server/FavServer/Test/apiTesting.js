const chai = require('chai')
const chaiHttp = require('chai-http');
const app = require('../server');


let should = chai.should();
chai.use(chaiHttp);


describe("Favorite SERVICE TESTING", () => {

    // GET BOOKS BASED ON AUTHOR NAME
    describe("1) GET User Favorite Book /api/getfavorite", () => {
        it("Get Book By user id", (done) => {
            chai.request(app)
                .get("/api/getfavorite")
                .query({
                    _id: 'b21f5197-0035-4874-8052-585880a5f895'
                })
                .end((err, data) => {
                    // console.log(data.text);
                    data.should.have.status(200);
                    data.body.should.be.a('object');
                    done();
                });
        });
    });

    describe("2) GET User Favorite Book /api/getfavorite", () => {
        it("Item should GET 4 filed in Object", (done) => {
            chai.request(app)
                .get("/api/getfavorite")
                .query({
                    _id: 'b21f5197-0035-4874-8052-585880a5f895'
                })
                .end((err, data) => {
                    data.should.have.status(200);
                    data.body.should.be.a('object');
                    const t = data.body.arr[0];
                    Object.keys(t).length.should.be.eql(4);
                    done();
                });
        });
    });
    // Add Book in favorite
    describe("3) Add book to Favorite  /api/addfavorite",   () => {
        it("Add Book to Favorite", async (done) => {
            let book = {
                "_id": "963",
                book: {
                    "key": "/works/OL82563W",
                    "title": "JavaScript",
                    "coverImage": 10521275
                }
            }
            await chai.request(app)
                .post("/api/addfavorite")
                .send(book)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })

        });
    });
    describe("4) Add book to Favorite Success Message  /api/addfavorite", () => {
        it("Add Book to Favorite", (done) => {
            let book = {
                "_id": "963",
                book: {
                    "key": "/works/OL82563W",
                    "title": "JavaScript",
                    "coverImage": 10521275
                }
            }
            chai.request(app)
                .post("/api/addfavorite")
                .send(book)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.property('text').eql('Book Added to favorite SuccessFully');
                    done();
                });

        });
    });
    describe("5) Remove book from Favorite  /api/removefavorite", () => {
        it("Remove Book to Favorite", (done) => {
            let book = {
                "_id": "963",
                "coverImage": 10521275
            }
            chai.request(app)
                .put("/api/removefavorite")
                .send(book)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });

        });
    });
    describe("6) Remove book from Favorite Success Message /api/removefavorite", () => {
        it("Book remove Success Message", (done) => {
            let book = {
                "_id": "963",
                "coverImage": 10521275
            }
            chai.request(app)
                .put("/api/removefavorite")
                .send(book)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.property('text').eql('Book Removed from favorite SuccessFully');
                    done();
                });

        });
    });
});

