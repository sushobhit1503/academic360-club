import React from "react";
import Counselor from "../components/Counselor";

class CounselorProfile extends React.Component {
    constructor () {
        super ()
        this.state = {

        }
    }
    render () {
        return (
            <div>
                <div className="text-center bg-primary mb-3 h1">
                    Counselor Profiles
                </div>
                <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3 mb-3">
                    <div className="col">
                        <Counselor />
                    </div>
                    <div className="col">
                        <Counselor />
                    </div>
                    <div className="col">
                        <Counselor />
                    </div>
                </div>
            </div>
        )
    }
}

export default CounselorProfile