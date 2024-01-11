import React from "react";
import { Button, Modal, ModalHeader, Label, Input, ModalBody, ModalFooter } from "reactstrap";
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
            endTime: ""
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
        return (
            <div className="p-xl-5 p-3">
                <div className="d-flex justify-content-between gap-3 mb-3 align-items-center">
                    <div className="h1">Time Slot Directory</div>
                    <Button color="success" onClick={() => this.setState({ isModal: true })}>
                        Add Time Slots
                    </Button>
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