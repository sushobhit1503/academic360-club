import React from "react";
import { firestore } from "../config";
import firebase from "../config";
import { CardBody, Input, Table, Card, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class Coupon extends React.Component {
    constructor() {
        super()
        this.state = {
            allCoupons: [],
            isModal: false,
            couponCode: "",
            couponType: "",
            couponValue: "",
            couponExpiryDate: "",
            couponExpiryCount: 0
        }
    }
    componentDidMount() {
        firestore.collection("coupons").get().then(Snapshot => {
            let temp = []
            Snapshot.forEach(document => {
                let obj = {
                    id: document.id,
                    data: document.data()
                }
                temp.push(obj)
            })
            this.setState({ allCoupons: temp })
        }).catch(err => console.log(err.message))
    }
    render() {
        const onChange = (e) => {
            const { name, value } = e.target
            this.setState({ [name]: value })
        }
        const deleteCoupon = (id) => {
            window.confirm("Are you sure you want to delete the coupon?")
            firestore.collection("coupons").doc(id).delete().then(() => window.location.reload()).catch(err => console.log(err.message))
        }
        const changeCouponActivity = (id, activity) => {
            console.log(activity)
            firestore.collection("coupons").doc(id).update({
                isDisabled: activity
            }).then(() => window.location.reload()).catch(err => console.log(err))
        }
        const createCoupon = () => {
            const { couponCode, couponExpiryCount, couponExpiryDate, couponType, couponValue } = this.state
            firestore.collection("coupons").doc().set({
                code: couponCode,
                type: couponType,
                expiryDate: couponExpiryDate,
                expiryCount: couponExpiryCount,
                value: couponValue,
                isDisabled: false,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => window.location.reload())
                .catch(err => console.log(err.message))
        }
        return (
            <div>
                {this.state.allCoupons && <div className="px-xl-5 px-3 py-3" >
                    <div className="h1 mb-3">Coupons Directory</div>
                    <div className="d-flex justify-content-end mb-3 gap-3">
                        {/* <div className="col-xl-4 col-12 mb-3">
                            <Input onChange={onChange} value={this.state.searchedSession} name="searchedSession" placeholder="Search for any session" type="search" />
                        </div> */}
                        <div>
                            <Button onClick={() => this.setState({ isModal: true })} color="success">
                                Add Coupon
                            </Button>
                        </div>
                    </div>

                    <div className="d-none d-md-block">
                        <Table bordered>
                            <thead className="table-active">
                                <tr>
                                    <th>
                                        Coupon Code
                                    </th>
                                    <th>
                                        Coupon Type
                                    </th>
                                    <th>
                                        Coupon Value
                                    </th>
                                    <th>
                                        Expiry Date
                                    </th>
                                    <th>
                                        Expiry Count
                                    </th>
                                    <th>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.allCoupons.map(eachUser => {
                                    return (
                                        <tr key={eachUser.id}>
                                            <th scope="row">
                                                {eachUser.data?.code}
                                            </th>
                                            <td>
                                                {eachUser.data?.type}
                                            </td>
                                            <td>
                                                {eachUser.data?.value}
                                            </td>
                                            <td>
                                                {eachUser.data?.expiryDate}
                                            </td>
                                            <td>
                                                {eachUser.data?.expiryCount}
                                            </td>
                                            <td className="d-flex gap-3">
                                                <Button onClick={() => deleteCoupon(eachUser.id)} color="danger">
                                                    Delete
                                                </Button>
                                                {eachUser.data?.isDisabled && <Button onClick={() => changeCouponActivity(eachUser.id, false)} color="success">
                                                    Enable
                                                </Button>}
                                                {!eachUser.data?.isDisabled && <Button onClick={() => changeCouponActivity(eachUser.id, true)} color="danger">
                                                    Disable
                                                </Button>}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>
                    {this.state.allCoupons.length === 0 &&
                        <div className="text-center">
                            No data to be displayed
                        </div>}
                    <div className="d-block d-md-none">
                        {this.state.allCoupons.map(eachUser => {
                            return (
                                <Card className="mb-3" key={eachUser.id}>
                                    <CardBody>
                                        <div className="h3">{eachUser.data.code}</div>
                                        <div className="d-flex justify-content-between gap-3 mb-3">
                                            <div>
                                                <Label className="mb-0">Type</Label>
                                                <div className="fw-bold">{eachUser.data.type}</div>
                                            </div>
                                            <div>
                                                <Label className="mb-0">Value</Label>
                                                <div className="fw-bold">{eachUser.data.value}</div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between gap-3 mb-3">
                                            <div>
                                                <Label className="mb-0">Expiry Date</Label>
                                                <div className="fw-bold">{eachUser.data.expiryDate}</div>
                                            </div>
                                            <div>
                                                <Label className="mb-0">Expiry Count</Label>
                                                <div className="fw-bold">{eachUser.data.expiryCount}</div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between gap-3">
                                            <Button onClick={() => deleteCoupon(eachUser.id)} color="danger">
                                                Delete
                                            </Button>
                                            {eachUser.data?.isDisabled && <Button onClick={() => changeCouponActivity(eachUser.id, eachUser.data?.isDisabled)} color="success">
                                                Enable
                                            </Button>}
                                            {!eachUser.data?.isDisabled && <Button onClick={() => changeCouponActivity(eachUser.id, eachUser.data?.isDisabled)} color="danger">
                                                Disable
                                            </Button>}
                                        </div>
                                    </CardBody>
                                </Card>
                            )
                        })}
                    </div>
                    <Modal isOpen={this.state.isModal} toggle={() => this.setState({ isModal: false })}>
                        <ModalHeader toggle={() => this.setState({ isModal: false })}>Add Coupon Details</ModalHeader>
                        <ModalBody>
                            <div className="mb-3">
                                <Label>Coupon Code</Label>
                                <Input placeholder="Enter Coupon Code" onChange={onChange} value={this.state.couponCode} name="couponCode" />
                            </div>
                            <div className="mb-3">
                                <Label>Coupon Type</Label>
                                <select className="form-select" onChange={onChange} name="couponType" value={this.state.couponType}>
                                    <option>Select Coupon Type</option>
                                    <option value="Percentage">Percentage</option>
                                    <option value="Amount">Amount</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <Label>Coupon Expiry Date</Label>
                                <Input placeholder="Enter expiry date" onChange={onChange} value={this.state.couponExpiryDate} name="couponExpiryDate" type="date" />
                            </div>
                            <div className="mb-3">
                                <Label>Coupon Expiry Count</Label>
                                <Input placeholder="Enter expiry count" onChange={onChange} value={this.state.couponExpiryCount} name="couponExpiryCount" />
                            </div>
                            <div className="mb-3">
                                <Label>Coupon Value</Label>
                                <Input placeholder="Enter Coupon Code" onChange={onChange} value={this.state.couponValue} name="couponValue" />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={createCoupon} color="success">
                                Submit
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>}
            </div>
        )
    }
}

export default Coupon