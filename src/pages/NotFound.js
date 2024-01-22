import React from "react"
import NotFoundImage from "../assets/notfound.webp"

class NotFound extends React.Component {
    render() {
        return (
            <div style={{ paddingTop: "120px", paddingBottom: "75px" }} className="main-container">
                <div className="text-center">
                    <img src={NotFoundImage} className="img-fluid mb-3" style={{width:"300px"}} alt="notfound" />
                    <div className="h3 mb-3">Page Not Found</div>
                    <div>Please go to the <a className="text-decoration-none text-secondary" href="/">Home Page</a></div>
                </div>
            </div>
        )
    }
}

export default NotFound