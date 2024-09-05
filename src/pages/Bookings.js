import React from "react";
import { firestore } from "../config";
import { Table, Card, CardBody, Label } from "reactstrap";
import Moment from "react-moment";

class Bookings extends React.Component {
    constructor() {
        super()
        this.state = {
            allCounselors: [],
            allBookings: [],
            allUsers: [],
            allSessions: []
        }
    }
    componentDidMount() {
        firestore.collection("counselors").get().then(Snapshot => {
            let temp = []
            Snapshot.forEach(document => {
                let obj = {
                    id: document.id,
                    data: document.data()
                }
                temp.push(obj)
            })
            this.setState({ allCounselors: temp })
        })
        firestore.collection("sessions").get().then(Snapshot => {
            let temp = []
            Snapshot.forEach(document => {
                let obj = {
                    id: document.id,
                    data: document.data()
                }
                temp.push(obj)
            })
            this.setState({ allSessions: temp })
        })
        firestore.collection("bookings").get().then(Snapshot => {
            let temp = []
            Snapshot.forEach(document => {
                let obj = {
                    id: document.id,
                    data: document.data()
                }
                temp.push(obj)
            })
            this.setState({ allBookings: temp })
        })
        firestore.collection("users").get().then(Snapshot => {
            let temp = []
            Snapshot.forEach(document => {
                let obj = {
                    id: document.id,
                    data: document.data()
                }
                temp.push(obj)
            })
            this.setState({ allUsers: temp })
        })
    }
    render() {
        // const onChange = (e) => {
        //     const {name, value} = e.target
        //     this.setState ({[name]: value})
        // }
        return (
            <div className="px-xl-5 px-3 py-3">
                <div className="h1 mb-3">User Directory</div>
                {/* <div className="col-xl-4 col-12 mb-3">
                    <Input onChange={onChange} value={this.state.searchedUser} name="searchedUser" placeholder="Search for any booking" type="search" />
                </div> */}
                <div className="d-none d-md-block">
                    <Table bordered>
                        <thead className="table-active">
                            <tr>
                                <th>
                                    Customer Name
                                </th>
                                <th>
                                    Session Name
                                </th>
                                <th>
                                    Boooking Time
                                </th>
                                <th>
                                    Duration (mins)
                                </th>
                                <th>
                                    Payment Id
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.allBookings.length !== 0 && this.state.allBookings.map(eachUser => {
                                console.log (this.state.allUsers)
                                return (
                                    <tr key={eachUser.paymentId}>
                                        <th scope="row">
                                            {this.state.allUsers?.find(x => x.id === eachUser?.data?.userId).data?.name}
                                        </th>
                                        <td>
                                            {this.state.allSessions?.find(x => x.id === eachUser?.data?.sessionId).data?.name}
                                        </td>
                                        <td>
                                            <Moment format="DD-MM-YYYY HH:mm">
                                                {eachUser.data?.bookingTime}
                                            </Moment>
                                        </td>
                                        <td>
                                            {eachUser.data?.sessionTime}
                                        </td>
                                        <td>
                                            {eachUser.data?.paymentId}
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </Table>
                </div>
                {this.state.allBookings.length === 0 &&
                    <div className="text-center">
                        No data to be displayed
                    </div>}
                <div className="d-block d-md-none">
                    {this.state.allBookings.map(eachUser => {
                        return (
                            <Card className="mb-3">
                                <CardBody>
                                    <div className="h3 mb-3">{this.state.allSessions?.find(x => x.id === eachUser.data?.sessionId).data?.name}</div>
                                    <div className="mb-3">
                                        <Label className="mb-0">Session Name</Label>
                                        <div className="fw-bold">{this.state.allSessions?.find(x => x.id === eachUser.data?.sessionId).data?.name}</div>
                                    </div>
                                    <div className="d-flex justify-content-between mb-3">
                                        <div>
                                            <Label className="mb-0">Booking Time</Label>
                                            <div className="fw-bold">
                                                <Moment format="DD-MM-YYYY HH:mm">
                                                    {eachUser.data?.bookingTime}
                                                </Moment>
                                            </div>
                                        </div>
                                        <div>
                                            <Label className="mb-0">Duration (mins)</Label>
                                            <div className="fw-bold">{eachUser.data?.sessionTime}</div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <Label className="mb-0">Payment Id</Label>
                                        <div className="fw-bold">{eachUser.data?.paymentId}</div>
                                    </div>
                                </CardBody>
                            </Card>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Bookings