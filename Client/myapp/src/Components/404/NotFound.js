import "./notFound.css";

function NotFound() {
    return (
        <div className="container">
            <div className="row text-center">
                <div className="col-12">
                    <p id="status">404</p>
                </div>
                <div className="col-12">
                    <p id="not-found">Not Found</p>
                </div>
                <div className="col-12">
                    <p id="not-found-msg">The resource requested could not be found on this server!</p>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
