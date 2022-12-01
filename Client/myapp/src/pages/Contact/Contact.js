import "./contact.css";

function Contact() {
    return (
        <div className="container mb-5" id="contact-container">
            <h2 className="pt-5" id="explore-heading">Contact Us</h2>
            <div className="row">
                <div className="col-12 col-md-4">
                    <div className="card" >
                        <img src="https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/229426802/original/add5f4a7c68951c493d2b3656024f57ed8b70b53.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title contact-card-title">Amit Sharma</h5>
                            <p className="card-text contact-card-text">Aligarh, Uttar Pradesh</p>
                            <a href="https://www.linkedin.com/in/amit-sharma-047434177/" target="blank">
                                <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="linkedIn" className="linkedIn" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card" >
                        <img src="https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/229426802/original/add5f4a7c68951c493d2b3656024f57ed8b70b53.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title contact-card-title">Aniket Chakraborty</h5>
                            <p className="card-text contact-card-text">Kolkata, West Bengal</p>
                            <a href="https://www.linkedin.com/in/aniket-chakraborty-07a69615a/" target="blank">
                                <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="linkedIn" className="linkedIn" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card" >
                        <img src="https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/229426802/original/add5f4a7c68951c493d2b3656024f57ed8b70b53.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title contact-card-title">Anubhav Sharma</h5>
                            <p className="card-text contact-card-text">Bulandshahr, Uttar Pradesh</p>
                            <a href="#" target="blank">
                                <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="linkedIn" className="linkedIn" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;
