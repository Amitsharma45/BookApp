import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server.js";

chai.should();
chai.use(chaiHttp);

describe("SEARCH SERVICE TESTING", () => {

    // GET BOOKS BASED ON AUTHOR NAME
    describe("1) GET /getWorks/author", () => {
        it("should GET first 6 books of Dickens", (done) => {
            chai.request(app)
                .get("/api/getWorks/author")
                .query({
                    author: "Dickens",
                    limit: 6,
                    offset: 0
                })
                .end((err, data) => {
                    // console.log(data.text);
                    data.should.have.status(200);
                    data.body.should.be.a('object');
                    data.body.worksData.should.have.length(6);
                    done();
                });
        });
        it("should GET 6 books of Wells from the 13th record", (done) => {
            chai.request(app)
                .get("/api/getWorks/author")
                .query({
                    author: "Wells",
                    limit: 6,
                    offset: 13
                })
                .end((err, data) => {
                    // console.log(data.body);
                    data.should.have.status(200);
                    data.body.should.be.a('object');
                    data.body.worksData.should.have.length(6);
                    done();
                });
        });
        it("should NOT GET books ", (done) => {
            chai.request(app)
                .get("/api/getWorks/author")
                .query({
                    author: "Srijato",
                    limit: 6,
                    offset: 0
                })
                .end((err, data) => {
                    // console.log(data.body);
                    data.should.have.status(404);
                    data.text.should.equal('Not Found');
                    done();
                });
        });
    });

    // GET BOOKS BASED ON TITLE
    describe("2) GET /getWorks/title", () => {
        it("should GET first 6 books with title Harry Potter", (done) => {
            chai.request(app)
                .get("/api/getWorks/title")
                .query({
                    title: "Harry Potter",
                    limit: 6,
                    offset: 0
                })
                .end((err, data) => {
                    // console.log(data.body);
                    data.should.have.status(200);
                    data.body.should.be.a('object');
                    data.body.worksData.should.have.length(6);
                    done();
                });
        });
        it("should GET 6 books with title The lord of the rings from the 7th record", (done) => {
            chai.request(app)
                .get("/api/getWorks/title")
                .query({
                    title: "The lord of the rings",
                    limit: 6,
                    offset: 7
                })
                .end((err, data) => {
                    // console.log(data.body);
                    data.should.have.status(200);
                    data.body.should.be.a('object');
                    data.body.worksData.should.have.length(6);
                    done();
                });
        });
        it("should NOT GET books ", (done) => {
            chai.request(app)
                .get("/api/getWorks/title")
                .query({
                    title: "abgstgnsgyygasbb",
                    limit: 6,
                    offset: 0
                })
                .end((err, data) => {
                    // console.log(data.body);
                    data.should.have.status(404);
                    data.text.should.equal('Not Found');
                    done();
                });
        });
    });

    // GET BOOKS BASED ON SUBJECT
    describe("3) GET /getWorks/subject", () => {
        it("should GET first 6 books with subject love", (done) => {
            chai.request(app)
                .get("/api/getWorks/subject")
                .query({
                    subject: "love",
                    limit: 6,
                    offset: 0
                })
                .end((err, data) => {
                    // console.log(data.body);
                    data.should.have.status(200);
                    data.body.should.be.a('object');
                    data.body.worksData.should.have.length(6);
                    done();
                });
        });
        it("should GET 6 books with subject war from the 7th record", (done) => {
            chai.request(app)
                .get("/api/getWorks/subject")
                .query({
                    subject: "war",
                    limit: 6,
                    offset: 7
                })
                .end((err, data) => {
                    // console.log(data.body);
                    data.should.have.status(200);
                    data.body.should.be.a('object');
                    data.body.worksData.should.have.length(6);
                    done();
                });
        });
        it("should NOT GET books ", (done) => {
            chai.request(app)
                .get("/api/getWorks/subject")
                .query({
                    subject: "abgstgnsgyygasbb",
                    limit: 6,
                    offset: 0
                })
                .end((err, data) => {
                    // console.log(data.body);
                    data.should.have.status(404);
                    data.text.should.equal('Not Found');
                    done();
                });
        });
    });

    // GET BOOKS DETAILS BASED ON BOOK KEY
    describe("4) GET /getDetails", () => {
        it("should GET book details", (done) => {
            chai.request(app)
                .get("/api/getDetails")
                .query({
                    key: "OL45883W"
                })
                .end((err, data) => {
                    // console.log(data.body);
                    data.should.have.status(200);
                    data.body.should.be.a('object');
                    done();
                });
        });
        it("should NOT GET books details", (done) => {
            chai.request(app)
                .get("/api/getDetails")
                .query({
                    key: "abgstgnsgyygasbb"
                })
                .end((err, data) => {
                    // console.log(data.body);
                    data.should.have.status(404);
                    data.text.should.equal('Not Found');
                    done();
                });
        });
    });

    // GET AUTHOR DETAILS BASED ON AUTHOR KEY
    describe("5) GET /getName", () => {
        it("should GET author details", (done) => {
            chai.request(app)
                .get("/api/getName")
                .query({
                    key: "OL23919A"
                })
                .end((err, data) => {
                    // console.log(data);
                    data.should.have.status(200);
                    data.text.should.equal('J. K. Rowling');
                    done();
                });
        });
        it("should NOT GET author details", (done) => {
            chai.request(app)
                .get("/api/getName")
                .query({
                    key: "abgstgnsgyygasbb"
                })
                .end((err, data) => {
                    // console.log(data); 
                    data.should.have.status(404);
                    data.text.should.equal('Not Found');
                    done();
                });
        });
    });
});