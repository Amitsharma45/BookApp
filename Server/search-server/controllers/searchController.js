import {
    getAuthorWorks, getTitleWorks, getSubjectWorks, getBookDetails, getAuthorName
} from "../repos/searchRepo.js";

// controller to get books based on author name
export const getWorksByAuthor = (req, res) => {
    getAuthorWorks(req.query.author, req.query.limit, req.query.offset).then(data => {
        if (data !== null)
            res.status(200).send(data);
        else
            res.status(404).send('Not Found');
    });
};

// controller to get books based on book title
export const getWorksByTitle = (req, res) => {
    getTitleWorks(req.query.title, req.query.limit, req.query.offset).then(data => {
        if (data !== null)
            res.status(200).send(data);
        else
            res.status(404).send('Not Found');
    });
}

// controller to get books based on subject
export const getWorksBySubject = (req, res) => {
    getSubjectWorks(req.query.subject, req.query.limit, req.query.offset).then(data => {
        if (data !== null)
            res.status(200).send(data);
        else
            res.status(404).send('Not Found');
    });
}

// controller to get details of a book based on book key
export const getBookDetail = (req, res) => {
    getBookDetails(req.query.key).then(data => {
        if (data !== null)
            res.status(200).send(data);
        else
            res.status(404).send('Not Found');
    });
}

// controller to get author names based on author keys
export const getName = (req, res) => {
    getAuthorName(req.query.key).then(data => {
        if (data !== null)
            res.status(200).send(data);
        else
            res.status(404).send('Not Found');
    });
}