import React from "react";
import SuccessImage from "../assets/icegif-727.gif"
import { Navigate } from "react-router-dom";

class Success extends React.Component {
    render() {
        const goToHome = () => {
            localStorage.removeItem("success")
            window.location.href = "/"
        }
        if (!localStorage.getItem("success"))
            return <Navigate to="/" />
        else
            return (
                <div className="text-center page-start">
                    <img src={SuccessImage} className="mb-3" style={{ width: "300px", borderRadius: "300px", marginTop: "50px" }} alt="academic" />
                    <div className="h3">Congratulations !! Your booking is confirmed</div>
                    <div className="mb-3">A confirmation email has been sent to your registered email.</div>
                    <div className="mb-5">
                        <a href="#" className="text-decoration-none text-secondary" onClick={goToHome}>Click Here</a> to go to HomePage
                    </div>
                </div>
            )
    }
}

export default Success