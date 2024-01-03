import React from "react";
import { firestore, storage } from "../config";
import firebase from "../config";
import { CardBody, Input, Table, Card, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class Counselors extends React.Component {
    constructor() {
        super()
        this.state = {
            allCounselors: [],
            searchedCounselor: "",
            isModal: false,
            name: "",
            phoneNumber: "",
            email: "",
            location: "",
            degree: "Bachelors",
            description: "",
            linkedin: "",
            introduction: "",
            profilePicture: "",
            id: "",
            isDetails: false
        }
    }
    componentDidMount() {
        firestore.collection("counselors").orderBy("profileViews", "desc").get().then(Snapshot => {
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
    }
    render() {
        const onChange = (e) => {
            const { name, value } = e.target
            this.setState({ [name]: value })
        }
        const fileChange = (event) => {
            this.setState({ profilePicture: event.target.files[0] })
        }
        const editCounselor = (id) => {
            const counselor = this.state.allCounselors.find(x => x.id === id)
            let { name, phoneNumber, email, location, description, degree, introduction, linkedin } = counselor.data
            this.setState({ name, phoneNumber, email, location, description, degree, introduction, linkedin, id, isDetails: true })
        }
        const submitProfile = () => {
            const { name, email, phoneNumber, description, introduction, location, linkedin, degree, profilePicture } = this.state
            let profileUrl = ""
            storage.ref(`/images/${profilePicture.name}`).put(profilePicture).on("state_changed", () => {
            }, null, () => {
                storage.ref("images").child(profilePicture.name).getDownloadURL().then(url => {
                    profileUrl = url
                }).catch(err => console.log(err.message))
            })
            firestore.collection("counselors").doc().set({
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                location: location,
                degree: degree,
                description: description,
                linkedin: linkedin,
                profileUrl: profileUrl,
                isDisabled: false,
                introduction: introduction,
                profileViews: 0,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => window.location.reload())
                .catch(err => console.log(err.message))
        }
        const editProfile = () => {
            const { name, email, phoneNumber, description, introduction, location, linkedin, degree, id, profilePicture } = this.state
            let profileUrl = ""
            storage.ref(`/images/${profilePicture.name}`).put(profilePicture).on("state_changed", () => {
            }, null, () => {
                storage.ref("images").child(profilePicture.name).getDownloadURL().then(url => {
                    profileUrl = url
                    firestore.collection("counselors").doc(id).update({
                        name: name,
                        email: email,
                        phoneNumber: phoneNumber,
                        location: location,
                        degree: degree,
                        description: description,
                        linkedin: linkedin,
                        profileUrl: profileUrl,
                        introduction: introduction
                    }).then(() => window.location.reload())
                        .catch(err => console.log(err.message))
                }).catch(err => console.log(err.message))
            })
        }
        const changeVisibility = (id, visibility) => {
            firestore.collection("counselors").doc(id).update({
                isDisabled: !visibility
            }).then(() => window.location.reload())
                .catch(err => console.log(err.message))
        }
        const filteredArray = this.state.allCounselors.filter(user => user.data.name.toLowerCase().includes(this.state.searchedCounselor.toLowerCase()))
        return (
            <div className="px-xl-5 px-3 py-3" >
                <div className="h1 mb-3">Counselor Directory</div>
                <div className="d-flex justify-content-between gap-3">
                    <div className="col-xl-4 col-12 mb-3">
                        <Input onChange={onChange} value={this.state.searchedUser} name="searchedUser" placeholder="Search for any user" type="search" />
                    </div>
                    <div>
                        <Button onClick={() => this.setState({ isModal: true })} color="success">
                            Add Counselor
                        </Button>
                    </div>
                </div>

                <div className="d-none d-md-block">
                    <Table bordered>
                        <thead className="table-active">
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Phone Number
                                </th>
                                <th>
                                    Email Id
                                </th>
                                <th>
                                    Profile Views
                                </th>
                                <th>
                                    Profile Access
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
                                            {eachUser.data.phoneNumber}
                                        </td>
                                        <td>
                                            {eachUser.data.email}
                                        </td>
                                        <td>
                                            {eachUser.data.profileViews}
                                        </td>
                                        <td className="d-flex gap-3">
                                            <Button onClick={() => editCounselor(eachUser.id)} color="primary">
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
                                        <div>{eachUser.data.profileViews} profile views</div>
                                    </div>
                                    <div className="mb-3">
                                        <Label className="mb-0">Phone Number</Label>
                                        <div className="fw-bold">{eachUser.data.phoneNumber}</div>
                                    </div>
                                    <div className="mb-3">
                                        <Label className="mb-0">Email Id</Label>
                                        <div className="fw-bold">{eachUser.data.email}</div>
                                    </div>
                                    <div className="d-flex justify-content-between gap-3">
                                        <Button className="w-50" onClick={() => editCounselor(eachUser.id)} color="primary">
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
                    <ModalHeader toggle={() => this.setState({ isModal: false })}>Add Counselor Profile</ModalHeader>
                    <ModalBody>
                        <div className="mb-3">
                            <Label>Name</Label>
                            <Input placeholder="Enter counselor name" onChange={onChange} value={this.state.name} name="name" />
                        </div>
                        <div className="mb-3">
                            <Label>Phone Number</Label>
                            <Input placeholder="Enter counselor phone number" onChange={onChange} value={this.state.phoneNumber} name="phoneNumber" />
                        </div>
                        <div className="mb-3">
                            <Label>Email</Label>
                            <Input placeholder="Enter counselor eemail address" onChange={onChange} value={this.state.email} name="email" />
                        </div>
                        <div className="mb-3">
                            <Label>Location</Label>
                            <Input placeholder="Enter counselor location" onChange={onChange} value={this.state.location} name="location" />
                        </div>
                        <div className="mb-3">
                            <Label>Degree</Label>
                            <select className="form-select" onChange={onChange} name="degree" value={this.state.degree}>
                                <option value="Bachelors">Bachelors</option>
                                <option value="Masters">Masters</option>
                                <option value="Ph. D">Ph. D</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <Label>Linkedin</Label>
                            <Input placeholder="Enter counselor linkedin id" onChange={onChange} value={this.state.linkedin} name="linkedin" />
                        </div>
                        <div className="mb-3">
                            <Label>Profile Picture</Label>
                            <Input id="fileInput" onChange={fileChange} name="profilePicture" type="file" />
                        </div>
                        <div className="mb-3">
                            <Label>Description</Label>
                            <textarea rows={10} name="description" placeholder="Enter counselor description" onChange={onChange} value={this.state.description} className="form-control">

                            </textarea>
                        </div>
                        <div className="mb-3">
                            <Label>Introduction</Label>
                            <textarea className="form-control" rows={10} placeholder="Enter counselor introduction" onChange={onChange} value={this.state.introduction} name="introduction">

                            </textarea>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={submitProfile} color="success">
                            Submit
                        </Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.isDetails} toggle={() => this.setState({ isDetails: false })}>
                    <ModalHeader toggle={() => this.setState({ isDetails: false })}>Edit Counselor Profile</ModalHeader>
                    <ModalBody>
                        <div className="mb-3">
                            <Label>Name</Label>
                            <Input placeholder="Enter counselor name" onChange={onChange} value={this.state.name} name="name" />
                        </div>
                        <div className="mb-3">
                            <Label>Phone Number</Label>
                            <Input placeholder="Enter counselor phone number" onChange={onChange} value={this.state.phoneNumber} name="phoneNumber" />
                        </div>
                        <div className="mb-3">
                            <Label>Email</Label>
                            <Input placeholder="Enter counselor eemail address" onChange={onChange} value={this.state.email} name="email" />
                        </div>
                        <div className="mb-3">
                            <Label>Location</Label>
                            <Input placeholder="Enter counselor location" onChange={onChange} value={this.state.location} name="location" />
                        </div>
                        <div className="mb-3">
                            <Label>Degree</Label>
                            <select className="form-select" onChange={onChange} name="degree" value={this.state.degree}>
                                <option value="Bachelors">Bachelors</option>
                                <option value="Masters">Masters</option>
                                <option value="Ph. D">Ph. D</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <Label>Linkedin</Label>
                            <Input placeholder="Enter counselor linkedin id" onChange={onChange} value={this.state.linkedin} name="linkedin" />
                        </div>
                        <div className="mb-3">
                            <Label>Profile Picture</Label>
                            <Input id="fileInput" onChange={fileChange} name="profilePicture" type="file" />
                        </div>
                        <div className="mb-3">
                            <Label>Description</Label>
                            <textarea rows={10} name="description" placeholder="Enter counselor description" onChange={onChange} value={this.state.description} className="form-control">

                            </textarea>
                        </div>
                        <div className="mb-3">
                            <Label>Introduction</Label>
                            <textarea className="form-control" rows={10} placeholder="Enter counselor introduction" onChange={onChange} value={this.state.introduction} name="introduction">

                            </textarea>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={editProfile} color="danger">
                            Edit
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Counselors