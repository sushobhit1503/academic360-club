import React from "react";
import { firestore } from "../config";
import { Card, CardBody, Table, Label } from "reactstrap";

class Queries extends React.Component {
    constructor() {
        super()
        this.state = {
            allQueries: []
        }
    }
    componentDidMount() {
        firestore.collection("contact").get().then(Snapshot => {
            let temp = []
            Snapshot.forEach(document => {
                temp.push(document.data())
            })
            this.setState({ allQueries: temp })
        }).catch(err => console.log(err.message))

    }
    render() {
        return (
            <div className="p-xl-5 p-3">
                <div className="d-none d-md-block">
                    <Table bordered>
                        <thead className="table-active">
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Email
                                </th>
                                <th>
                                    Phone Number
                                </th>
                                <th>
                                    Message
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.allQueries.map(eachUser => {
                                return (
                                    <tr key={eachUser.message}>
                                        <th scope="row">
                                            {eachUser.name}
                                        </th>
                                        <td>
                                            {eachUser.email}
                                        </td>
                                        <td>
                                            {eachUser.phoneNumber}
                                        </td>
                                        <td>
                                            {eachUser.message}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
                <div className="d-block d-md-none">
                    {this.state.allQueries.map(eachUser => {
                        return (
                            <Card className="mb-3" key={eachUser.message}>
                                <CardBody>
                                    <div className="d-flex justify-content-between gap-3 mb-3">
                                        <div className="h3">{eachUser.name}</div>
                                    </div>
                                    <div className="mb-3">
                                        <Label className="mb-0">Phone Number</Label>
                                        <div className="fw-bold">{eachUser.phoneNumber}</div>
                                    </div>
                                    <div className="mb-3">
                                        <Label className="mb-0">Email</Label>
                                        <div className="fw-bold">{eachUser.email}</div>
                                    </div>
                                    <div className="mb-3">
                                        <Label className="mb-0">Message</Label>
                                        <div className="fw-bold">{eachUser.message}</div>
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

export default Queries