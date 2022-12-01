import fetch from "node-fetch";

// function to fetch books data from OpenLibrary.org API based on author name
export const getAuthorWorks = async (authorName, limit, offset) => {
    const authorRes = await fetch(`http://openlibrary.org/search.json?author=${authorName.toLowerCase()}&limit=${limit}&offset=${offset}`);
    const { docs, numFound } = await authorRes.json();
    if (docs.length !== 0) {
        let works = [];
        docs.forEach(work => {
            works.push({
                "key": work.key,
                "title": work.title,
                "coverImage": work.cover_i
            });
        });
        return {
            "work_count": numFound,
            "worksData": works
        };
    }
    else
        return null;
}

// function to fetch books data from OpenLibrary.org API based on book title
export const getTitleWorks = async (bookTitle, limit, offset) => {
    const titleRes = await fetch(`http://openlibrary.org/search.json?title=${bookTitle.toLowerCase()}&limit=${limit}&offset=${offset}`);
    const { docs, numFound } = await titleRes.json();
    if (docs.length !== 0) {
        let works = [];
        docs.forEach(work => {
            works.push({
                "key": work.key,
                "title": work.title,
                "coverImage": work.cover_i
            });
        });
        return {
            "work_count": numFound,
            "worksData": works
        };
    }
    else
        return null;
}

// function to fetch books data from OpenLibrary.org API based on subject
export const getSubjectWorks = async (subject, limit, offset) => {
    const subjectRes = await fetch(`http://openlibrary.org/subjects/${subject.toLowerCase()}.json?limit=${limit}&offset=${offset}`);
    const { works, work_count } = await subjectRes.json();
    if (works.length !== 0) {
        let worksData = [];
        works.forEach(work => {
            worksData.push({
                "key": work.key,
                "title": work.title,
                "coverImage": work.cover_id
            });
        });
        return {
            "work_count": work_count,
            "worksData": worksData
        };
    }
    else
        return null;
}

// function to fetch books data from OpenLibrary.org API based on book key
export const getBookDetails = async (key) => {
    const response = await fetch(`https://openlibrary.org/works/${key}.json`);
    const details = await response.json();
    if ("error" in details)
        return null;
    else
        return details;
}

// function to fetch author data from OpenLibrary.org API based on author key
export const getAuthorName = async (key) => {
    const response = await fetch(`https://openlibrary.org/authors/${key}.json`);
    const { name } = await response.json();
    if (name === undefined)
        return null;
    else
        return name;
}