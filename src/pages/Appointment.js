import React from "react";
import { firestore } from "../config";
import firebase from "../config";
import { ScheduleMeeting, timeSlotDifference } from 'react-schedule-meeting';
import withRouter from "../components/withRouter"
import { Button, Collapse, Input } from "reactstrap";
import emailjs from "@emailjs/browser"
import Moment from "react-moment";
import { bookedSlots, finalSlots } from "../util/bookedSlots";
import { checkValidity } from "../util/checkCoupon";

class Appointment extends React.Component {
    constructor() {
        super()
        this.state = {
            sessionDetails: {},
            sessionId: "",
            allTimeSlots: [],
            bookedTimeSlots: [],
            availableTimeSlots: [],
            selectedDate: "",
            userDetails: {},
            allCounselors: [],
            allCoupons: [],
            isCollapseOpen: false,
            couponMessage: "",
            couponColor: "",
            couponCode: "",
            priceToPay: 0
        }
    }
    componentDidMount() {
        firestore.collection("users").doc(localStorage.getItem("uid")).get().then(document => {
            this.setState({ userDetails: document.data() })
        })
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
        })
        firestore.collection("bookings").where("sessionId", "==", this.props.params.sessionId).get().then(Snapshot => {
            let temp = []
            Snapshot.forEach(document => {
                temp.push(document.data())
            })
            this.setState({ bookedTimeSlots: temp })
        })
        firestore.collection("sessions").doc(this.props.params.sessionId).get().then(document => {
            this.setState({ sessionDetails: document.data(), sessionId: this.props.params.sessionId }, () => {
                firestore.collection("timeslots").where("organiser", "==", this.state.sessionDetails.organiser).get().then(Snapshot => {
                    let temp = []
                    Snapshot.forEach(document => {
                        temp.push(document.data())
                    })
                    this.setState({ allTimeSlots: temp }, () => {
                        const availableTimeSlots = this.state.allTimeSlots.map((eachSlot) => {
                            return {
                                id: eachSlot.createdAt,
                                startTime: new Date(eachSlot.startTime),
                                endTime: new Date(eachSlot.endTime),
                            };
                        });
                        const bookedSlotTimings = bookedSlots(this.state.bookedTimeSlots)
                        const pendingSlotTimings = timeSlotDifference(availableTimeSlots, bookedSlotTimings)
                        const finalSlotTimings = finalSlots(pendingSlotTimings, this.state.sessionDetails)
                        this.setState({ availableTimeSlots: finalSlotTimings })
                    })
                }).catch(err => console.log(err.message))
            })
        }).catch(err => console.log(err.message))

    }
    render() {
        const showRazorpay = async () => {
            const res = await loadScript(
                "https://checkout.razorpay.com/v1/checkout.js"
            );
            if (!res) return;
            const { userDetails, sessionId, selectedDate, sessionDetails, allCounselors } = this.state
            const options = {
                key: "rzp_test_RzYQGECWiji4Ln", // change when making live
                currency: "INR",
                amount: this.state.priceToPay * 100,
                name: "Academics 360",
                description: `Payment for ${this.state.sessionDetails.name}`,
                image: "", // put image url here
                //   callback_url: "https://academics360.club/",
                handler: function async(response) {
                    console.log(response);
                    firestore.collection("bookings").doc().set({
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        paymentId: response.razorpay_payment_id,
                        userId: localStorage.getItem("uid"),
                        sessionId: sessionId,
                        bookingTime: selectedDate.startTime.toISOString(),
                        sessionTime: parseInt(sessionDetails.time)
                    }).then(() => {
                        let templateParams = {
                            from_name: userDetails.email,
                            to_name: userDetails.name,
                            subject: "Appointment Booking Confirmation | Academics360",
                            reply_to: "official.academic360@gmail.com",
                            organiser: allCounselors.find(x => x.id === sessionDetails.organiser).data?.name,
                            time: JSON.stringify(selectedDate),
                            location: sessionDetails.link
                        }
                        emailjs.send('service_w2cbgtf', 'template_oevwn69', templateParams, 'x0yoXZhLLLAmkfimK')
                            .then(() => {
                                window.location.href = "/"
                            }).catch(err => console.log(err.message))
                    }).catch(err => console.log(err.message))
                },
                prefill: {
                    name: this.state.userDetails.name,
                    email: this.state.userDetails.email,
                    contact: this.state.userDetails.phoneNumber,
                },
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        };
        const loadScript = (src) => {
            return new Promise((resolve) => {
                const script = document.createElement("script");
                script.src = src;
                script.onload = () => {
                    resolve(true);
                };
                script.onerror = () => {
                    resolve(false);
                };
                document.body.appendChild(script);
            });
        };
        const onChange = (e) => {
            const { name, value } = e.target
            this.setState({ [name]: value })
        }
        const checkCoupon = () => {
            const {couponCode, allCoupons} = this.state
            const couponExist = allCoupons.find(obj => obj.data.code === couponCode)
            if (!couponExist) {
                this.setState ({couponMessage: "The coupon does not exist", couponColor: "#DB4437"})
            }
            if (couponExist) {
                const checkValidityCoupon = checkValidity (couponExist.data, this.state.sessionDetails.discountedPrice)
                if (!checkValidityCoupon.status)
                    this.setState ({couponMessage: "The coupon has expired", couponColor: "#DB4437"})
                else {
                    this.setState ({couponMessage: `Coupon code applied successfully. Rs. ${checkValidityCoupon.amountSaved} saved`, couponColor: "#0F9D58", priceToPay: checkValidityCoupon.value})
                }
            }
        }
        return (
            <div style={{ paddingTop: "120px", paddingBottom: "75px" }} className="main-container">
                <div className="row row-cols-1 row-cols-md-2 g-3 mb-3">
                    <div className="col-12 col-md-8">
                        <div className="h5 ms-3">Schedule your appointment</div>
                        <ScheduleMeeting
                            borderRadius={10}
                            primaryColor="#052778"
                            eventDurationInMinutes={15}
                            availableTimeslots={this.state.availableTimeSlots}
                            onStartTimeSelect={(object) => this.setState({ selectedDate: object },
                                () => console.log(this.state.selectedDate))}
                        />
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="h3">{this.state.sessionDetails.name}</div>
                        <div className="d-flex gap-3 align-items-center mb-3">
                            <i style={{ width: "20px" }} className="fa fa-calendar session-icons"></i>
                            <div className="fw-bold">
                                {this.state.selectedDate.startTime ?
                                    <Moment format="D MMM YYYY HH : mm">
                                        {this.state.selectedDate.startTime}
                                    </Moment> : "-- : --"}
                            </div>
                        </div>
                        <div className="d-flex gap-3 align-items-center mb-3">
                            <i style={{ width: "20px" }} className="fa fa-clock-o session-icons"></i>
                            <div className="fw-bold">{this.state.sessionDetails.time} minutes</div>
                        </div>
                        <div className="d-flex gap-3 align-items-center mb-3">
                            <i style={{ width: "20px" }} className="fa fa-map-marker session-icons"></i>
                            <div className="fw-bold">Online meeting link will be shared after payment.</div>
                        </div>
                        <div className="mb-3">
                            <a onClick={() => { this.setState({ isCollapseOpen: !this.state.isCollapseOpen }) }}
                                className="text-secondary text-decoration-none mb-3" href="#">
                                Have any coupon code?
                            </a>
                            <Collapse isOpen={this.state.isCollapseOpen}>
                                <div className="d-flex justify-content-between gap-3 align-items-center">
                                    <Input onChange={onChange} name="couponCode" value={this.state.couponCode} placeholder="Enter coupon code" />
                                    <div onClick={checkCoupon} className="text-secondary fw-bold cursor">
                                        Check
                                    </div>
                                </div>
                            </Collapse>
                            <div style={{ color: `${this.state.couponColor}` }}>
                                {this.state.couponMessage}
                            </div>
                        </div>
                        <div>
                            <Button disabled={this.state.selectedDate === ""} onClick={showRazorpay} className="button-submit" color="success">
                                Book Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Appointment) 