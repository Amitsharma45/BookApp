import "./spinner.css";

function Spinner() {
    return (
        <div className="d-flex align-items-center" id="spinner">
            <div className="spinner-border mx-auto" id="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner;