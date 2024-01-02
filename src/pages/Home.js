import React from "react";
import { firestore } from "../config";
import { Card, CardBody } from "reactstrap";

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            totalUsers: 0,
            totalSessions: 0,
            totalCounselors: 0
        }
    }
    componentDidMount() {
        firestore.collection("users").get().then(Snapshot => {
            this.setState ({totalUsers: Snapshot.size})
        }).catch(err => console.log(err.message))
        firestore.collection("sessions").get().then(Snapshot => {
            this.setState ({totalSessions: Snapshot.size})
        }).catch(err => console.log(err.message))
        firestore.collection("counselors").get().then(Snapshot => {
            this.setState ({totalCounselors: Snapshot.size})
        }).catch(err => console.log(err.message))
    }
    render() {
        return (
            <div className="px-xl-5 px-3 py-3">
                <div className="row row-cols-1 row-cols-md-3 g-3">
                    <div className="col">
                        <Card>
                            <CardBody className="text-center">
                                <div className="h1">{this.state.totalUsers}</div>
                                <div className="h4">Total Users</div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col">
                        <Card>
                            <CardBody className="text-center">
                                <div className="h1">{this.state.totalCounselors}</div>
                                <div className="h4">Total Counselors</div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col">
                        <Card>
                            <CardBody className="text-center">
                                <div className="h1">{this.state.totalSessions}</div>
                                <div className="h4">Total Sessions</div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home