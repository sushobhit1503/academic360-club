import React from "react";
import { Button, Modal, ModalHeader, Label, Input, ModalBody, ModalFooter, Table, Card, CardBody } from "reactstrap";
import { firestore } from "../config";
import firebase from "../config";
import Moment from "react-moment";

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
            window.confirm("Are you sure you want to delete?")
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
                                            <Moment format="DD-MM-YYYY HH:mm">
                                                {eachUser.data.startTime}
                                            </Moment>

                                        </td>
                                        <td>
                                            <Moment format="DD-MM-YYYY HH:mm">
                                                {eachUser.data.endTime}
                                            </Moment>
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
                {this.state.allAppointments.length === 0 &&
                    <div className="text-center">
                        No data to be displayed
                    </div>}
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
                                        <div className="fw-bold">
                                            <Moment format="DD-MM-YYYY HH:mm">
                                                {eachUser.data.startTime}
                                            </Moment></div>
                                    </div>
                                    <div className="mb-3">
                                        <Label className="mb-0">End Time</Label>
                                        <div className="fw-bold">
                                            <Moment format="DD-MM-YYYY HH:mm">
                                                {eachUser.data.endTime}
                                            </Moment></div>
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
                                <option value="">Select Organiser</option>
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
                            <Input max="2099-12-31T23:59" placeholder="Enter end time" onChange={onChange} value={this.state.endTime} name="endTime" type="datetime-local" />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button disabled={!this.state.organiser || !this.state.startTime || !this.state.endTime} onClick={createTimeSlot} color="success">
                            Submit
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Appointments