import "./about.css";

function About() {
    return (
        <div className="container" id="about-container">
            <h2 className="pt-5" id="explore-heading">About Us</h2>
            <p id="para">
                BookApp is a library catalog, that was developed with the help of <a href="https://openlibrary.org/developers/api" target="blank">Open Library API</a>, with the ultimate goal of making all the published works of humankind available to everyone in the world. While large in scope and ambition, we hope we were able to develop something fruitful.
                <br /><br />
                BookApp lets one search any book based on title, author or subject. One can easily see the book details and add them to their favourites, which will be available to them only once they log in.
                <br /><br />
                Our hope is that individual book readers will love this project and together we can build towards universal access to all knowledge.
            </p>
        </div>
    );
}

export default About;
