import React from "react";
import { firestore, storage } from "../config";
import firebase from "../config";
import { CardBody, Input, Table, Card, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class Session extends React.Component {
    constructor() {
        super()
        this.state = {
            allCounselors: [],
            searchedSession: "",
            allSessions: [],
            isModal: false,
            name: "",
            organiser: "",
            actualPrice: "",
            discountedPrice: "",
            time: "",
            id: "",
            isDetails: false
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
        }).catch(err => console.log(err.message))
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
    }
    render() {
        const onChange = (e) => {
            const { name, value } = e.target
            this.setState({ [name]: value })
        }
        const changeVisibility = (id, visibility) => {
            firestore.collection("sessions").doc(id).update({
                isDisabled: !visibility
            }).then(() => window.location.reload())
                .catch(err => console.log(err.message))
        }
        const enterSession = (id) => {
            const session = this.state.allSessions.find(x => x.id === id)
            let { name, organiser, discountedPrice, actualPrice, time} = session.data
            this.setState({ name, organiser, discountedPrice, actualPrice, time, id, isDetails: true })
        }
        const editSession = () => {
            this.setState({ isDetails: true })
            const { name, discountedPrice, actualPrice, organiser, time, id } = this.state
            firestore.collection("sessions").doc(id).update({
                name, discountedPrice, actualPrice, organiser, time
            })
        }
        const createSession = () => {
            const { name, discountedPrice, actualPrice, organiser, time } = this.state
            firestore.collection("sessions").doc().set({
                name, discountedPrice, actualPrice, organiser, time,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                sessionViews: 0
            }).then(() => window.location.reload())
                .catch(err => console.log(err.message))
        }
        const filteredArray = this.state.allSessions.filter(user => user.data.name.toLowerCase().includes(this.state.searchedSession.toLowerCase()))
        return (
            <div className="px-xl-5 px-3 py-3" >
                <div className="h1 mb-3">Session Directory</div>
                <div className="d-flex justify-content-between gap-3">
                    <div className="col-xl-4 col-12 mb-3">
                        <Input onChange={onChange} value={this.state.searchedSession} name="searchedSession" placeholder="Search for any session" type="search" />
                    </div>
                    <div>
                        <Button onClick={() => this.setState({ isModal: true })} color="success">
                            Add Session
                        </Button>
                    </div>
                </div>

                <div className="d-none d-md-block">
                    <Table bordered>
                        <thead className="table-active">
                            <tr>
                                <th>
                                    Session Name
                                </th>
                                <th>
                                    Organiser
                                </th>
                                <th>
                                    Discounted Price
                                </th>
                                <th>
                                    Session Views
                                </th>
                                <th>
                                    Session Access
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredArray.map(eachUser => {
                                return (
                                    <tr key={eachUser.id}>
                                        <th scope="row">
                                            {eachUser.data.name}
                                        </th>
                                        <td>
                                            {this.state.allCounselors.find(x => x.id === eachUser.data.organiser).data.name}
                                        </td>
                                        <td>
                                            {eachUser.data.discountedPrice}
                                        </td>
                                        <td>
                                            {eachUser.data.sessionViews}
                                        </td>
                                        <td className="d-flex gap-3">
                                            <Button onClick={() => enterSession(eachUser.id)} color="primary">
                                                View Details
                                            </Button>
                                            {eachUser.data.isDisabled && <Button onClick={() => changeVisibility(eachUser.id, eachUser.data.isDisabled)} color="success">
                                                Enable
                                            </Button>}
                                            {!eachUser.data.isDisabled && <Button onClick={() => changeVisibility(eachUser.id, eachUser.data.isDisabled)} color="danger">
                                                Disable
                                            </Button>}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
                <div className="d-block d-md-none">
                    {filteredArray.map(eachUser => {
                        return (
                            <Card className="mb-3" key={eachUser.id}>
                                <CardBody>
                                    <div className="d-flex justify-content-between gap-3 mb-3">
                                        <div className="h3">{eachUser.data.name}</div>
                                        <div>{eachUser.data.sessionViews} session views</div>
                                    </div>
                                    <div className="mb-3">
                                        <Label className="mb-0">Organiser</Label>
                                        <div className="fw-bold">{this.state.allCounselors.find(x => x.id === eachUser.data.organiser).data.name}</div>
                                    </div>
                                    <div className="mb-3">
                                        <Label className="mb-0">Discounted Price</Label>
                                        <div className="fw-bold">Rs. {eachUser.data.discountedPrice}</div>
                                    </div>
                                    <div className="d-flex justify-content-between gap-3">
                                        <Button className="w-50" onClick={() => enterSession(eachUser.id)} color="primary">
                                            View Details
                                        </Button>
                                        {eachUser.data.isDisabled && <Button onClick={() => changeVisibility(eachUser.id, eachUser.data.isDisabled)} className="w-50" color="success">
                                            Enable
                                        </Button>}
                                        {!eachUser.data.isDisabled && <Button onClick={() => changeVisibility(eachUser.id, eachUser.data.isDisabled)} className="w-50" color="danger">
                                            Disable
                                        </Button>}
                                    </div>
                                </CardBody>
                            </Card>
                        )
                    })}
                </div>
                <Modal isOpen={this.state.isModal} toggle={() => this.setState({ isModal: false })}>
                    <ModalHeader toggle={() => this.setState({ isModal: false })}>Add Session Details</ModalHeader>
                    <ModalBody>
                        <div className="mb-3">
                            <Label>Session Name</Label>
                            <Input placeholder="Enter session name" onChange={onChange} value={this.state.name} name="name" />
                        </div>
                        <div className="mb-3">
                            <Label>Organiser Name</Label>
                            <select className="form-select" onChange={onChange} name="organiser" value={this.state.organiser}>
                                {this.state.allCounselors.map(eachCounselor => {
                                    return (
                                        <option key={eachCounselor.id} value={eachCounselor.id}>{eachCounselor.data.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <Label>Actual Price</Label>
                            <Input placeholder="Enter actual price" onChange={onChange} value={this.state.actualPrice} name="actualPrice" />
                        </div>
                        <div className="mb-3">
                            <Label>Discounted Price</Label>
                            <Input placeholder="Enter discounted price" onChange={onChange} value={this.state.discountedPrice} name="discountedPrice" />
                        </div>
                        <div className="mb-3">
                            <Label>Time (in mins)</Label>
                            <Input placeholder="Enter duration of the session" onChange={onChange} value={this.state.time} name="time" />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={createSession} color="success">
                            Submit
                        </Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.isDetails} toggle={() => this.setState({ isDetails: false })}>
                    <ModalHeader toggle={() => this.setState({ isDetails: false })}>Edit Counselor Profile</ModalHeader>
                    <ModalBody>
                    <div className="mb-3">
                            <Label>Session Name</Label>
                            <Input placeholder="Enter session name" onChange={onChange} value={this.state.name} name="name" />
                        </div>
                        <div className="mb-3">
                            <Label>Organiser Name</Label>
                            <select className="form-select" onChange={onChange} name="organiser" value={this.state.organiser}>
                                {this.state.allCounselors.map(eachCounselor => {
                                    return (
                                        <option key={eachCounselor.id} value={eachCounselor.id}>{eachCounselor.data.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <Label>Actual Price</Label>
                            <Input placeholder="Enter actual price" onChange={onChange} value={this.state.actualPrice} name="actualPrice" />
                        </div>
                        <div className="mb-3">
                            <Label>Discounted Price</Label>
                            <Input placeholder="Enter discounted price" onChange={onChange} value={this.state.discountedPrice} name="discountedPrice" />
                        </div>
                        <div className="mb-3">
                            <Label>Time (in mins)</Label>
                            <Input placeholder="Enter duration of the session" onChange={onChange} value={this.state.time} name="time" />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={editSession} color="danger">
                            Edit
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Session