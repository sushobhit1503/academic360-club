import React from "react";
import { firestore } from "../config";
import { CardBody, Input, Table, Card, Label} from "reactstrap";

class Users extends React.Component {
    constructor() {
        super()
        this.state = {
            allUsers: [],
            searchedUser: ""
        }
    }
    componentDidMount() {
        firestore.collection("users").get().then(Snapshot => {
            let temp = []
            Snapshot.forEach(document => {
                temp.push(document.data())
            })
            this.setState({ allUsers: temp })
        }).catch(err => console.log(err.message))
    }
    render() {
        const onChange = (e) => {
            const { name, value } = e.target
            this.setState({ [name]: value })
        }
        const filteredArray = this.state.allUsers.filter(user => user.name.toLowerCase().includes(this.state.searchedUser.toLowerCase()))
        return (
            <div className="px-xl-5 px-3 py-3">
                <div className="h1 mb-3">User Directory</div>
                <div className="col-xl-4 col-12 mb-3">
                    <Input onChange={onChange} value={this.state.searchedUser} name="searchedUser" placeholder="Search for any user" type="search" />
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
                                {/* <th>
                                    View Details
                                </th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredArray.map(eachUser => {
                                return (
                                    <tr key={eachUser.id}>
                                        <th scope="row">
                                            {eachUser.name}
                                        </th>
                                        <td>
                                            {eachUser.phoneNumber}
                                        </td>
                                        <td>
                                            {eachUser.email}
                                        </td>
                                        {/* <td>
                                            <Button color="primary">
                                                View Details
                                            </Button>
                                        </td> */}
                                    </tr>
                                )
                            })}

                        </tbody>
                    </Table>
                </div>
                {filteredArray.length === 0 &&
                    <div className="text-center">
                        No data to be displayed
                    </div>}
                <div className="d-block d-md-none">
                    {filteredArray.map(eachUser => {
                        return (
                            <Card className="mb-3">
                                <CardBody>
                                    <div className="h3 mb-3">{eachUser.name}</div>
                                    <div className="mb-3">
                                        <Label className="mb-0">Phone Number</Label>
                                        <div className="fw-bold">{eachUser.phoneNumber}</div>
                                    </div>
                                    <div className="mb-3">
                                        <Label className="mb-0">Email Id</Label>
                                        <div className="fw-bold">{eachUser.email}</div>
                                    </div>
                                    {/* <Button className="w-100" color="primary">
                                View Details
                            </Button> */}
                                </CardBody>
                            </Card>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Users