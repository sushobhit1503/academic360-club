import React from "react";
import { Button, Modal, ModalHeader, Label, Input, ModalBody, ModalFooter, Table, Card, CardBody } from "reactstrap";
import { firestore } from "../config";
import firebase from "../config";

class Appointments extends React.Component {
    constructor() {
        super()
        this.state = {
            isModal: false,
            allCounselors: [],
            organiser: "",
            startTime: "",
            endTime: "",
            allAppointments: []
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
        firestore.collection("timeslots").get().then(Snapshot => {
            let temp = []
            Snapshot.forEach(document => {
                let obj = {
                    id: document.id,
                    data: document.data()
                }
                temp.push(obj)
            })
            this.setState({ allAppointments: temp })
        })
    }
    render() {
        const onChange = (e) => {
            const { name, value } = e.target
            this.setState({ [name]: value })
        }
        const createTimeSlot = () => {
            const { organiser, startTime, endTime } = this.state
            firestore.collection("timeslots").doc().set({
                organiser, startTime, endTime, createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                window.location.reload()
            }).catch(err => console.log(err.message))
        }
        const deleteSession = (id) => {
            firestore.collection("timeslots").doc(id).delete().then(() => window.location.reload()).catch(err => console.log(err.message))
        }
        return (
            <div className="p-xl-5 p-3">
                <div className="d-flex justify-content-between gap-3 mb-3 align-items-center flex-wrap">
                    <div className="h1">Time Slot Directory</div>
                    <Button color="success" onClick={() => this.setState({ isModal: true })}>
                        Add Time Slots
                    </Button>
                </div>
                <div className="d-none d-md-block">
                    <Table bordered>
                        <thead className="table-active">
                            <tr>
                                <th>
                                    Organiser name
                                </th>
                                <th>
                                    Start Time
                                </th>
                                <th>
                                    End Time
                                </th>
                                <th>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.allAppointments.map(eachUser => {
                                return (
                                    <tr key={eachUser.id}>
                                        <th scope="row">
                                            {this.state.allCounselors.find(x => x.id === eachUser.data?.organiser).data?.name}
                                        </th>
                                        <td>
                                            {eachUser.data.startTime}
                                        </td>
                                        <td>
                                            {eachUser.data.endTime}
                                        </td>
                                        <td>
                                            <Button onClick={() => deleteSession(eachUser.id)} color="danger">
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
                <div className="d-block d-md-none">
                    {this.state.allAppointments.map(eachUser => {
                        return (
                            <Card className="mb-3" key={eachUser.id}>
                                <CardBody>
                                    <div className="d-flex justify-content-between gap-3 mb-3">
                                        <div className="h3">
                                            {this.state.allCounselors.find(x => x.id === eachUser.data?.organiser).data?.name}</div>
                                    </div>
                                    <div className="mb-3">
                                        <Label className="mb-0">Start Time</Label>
                                        <div className="fw-bold">{eachUser.data.startTime}</div>
                                    </div>
                                    <div className="mb-3">
                                        <Label className="mb-0">End Time</Label>
                                        <div className="fw-bold">{eachUser.data.endTime}</div>
                                    </div>
                                    <div className="mb-3">
                                        <Button onClick={() => deleteSession(eachUser.id)} color="danger">
                                            Delete
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        )
                    })}
                </div>
                <Modal isOpen={this.state.isModal} toggle={() => this.setState({ isModal: false })}>
                    <ModalHeader toggle={() => this.setState({ isModal: false })}>Add Time Slots</ModalHeader>
                    <ModalBody>
                        <div className="mb-3">
                            <Label>Organiser Name</Label>
                            <select className="form-select" onChange={onChange} name="organiser" value={this.state.organiser}>
                                <option>Select Organiser</option>
                                {this.state.allCounselors.map(eachCounselor => {
                                    return (
                                        <option key={eachCounselor.id} value={eachCounselor.id}>{eachCounselor.data.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <Label>Start Time</Label>
                            <Input placeholder="Enter start time" onChange={onChange} value={this.state.startTime} name="startTime" type="datetime-local" />
                        </div>
                        <div className="mb-3">
                            <Label>End Time</Label>
                            <Input placeholder="Enter end time" onChange={onChange} value={this.state.endTime} name="endTime" type="datetime-local" />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={createTimeSlot} color="success">
                            Submit
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Appointments