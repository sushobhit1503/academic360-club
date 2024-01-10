import React from "react";
import { firestore } from "../config";
import firebase from "../config";
import { ScheduleMeeting } from 'react-schedule-meeting';
import withRouter from "../components/withRouter"
import { Button } from "reactstrap";
import emailjs from "@emailjs/browser"
import Moment from "react-moment";

const availableTimeslots = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((id) => {
    return {
        id,
        startTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(9, 0, 0, 0)),
        endTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(17, 0, 0, 0)),
    };
});

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
            userDetails: {}
        }
    }
    componentDidMount() {
        firestore.collection("users").doc(localStorage.getItem("uid")).get().then(document => {
            this.setState({ userDetails: document.data() })
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
                                startTime: new Date(new Date(new Date().setDate(15)).setHours(parseInt(eachSlot.startTime.substring(1)), parseInt(eachSlot.startTime.substring(4)), 0, 0)),
                                endTime: new Date(new Date(new Date().setDate(15)).setHours(parseInt(eachSlot.endTime.substring(1)), parseInt(eachSlot.endTime.substring(4)), 0, 0)),
                            };
                        });
                        this.setState({ availableTimeSlots })
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
            const { userDetails, sessionId, selectedDate } = this.state
            const options = {
                key: "rzp_test_RzYQGECWiji4Ln", // change when making live
                currency: "INR",
                amount: this.state.sessionDetails.discountedPrice * 100,
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
                        bookingTime: selectedDate
                    }).then(() => {
                        let templateParams = {
                            from_name: userDetails.email,
                            to_name: userDetails.name,
                            subject: "Appointment Booking Confirmation",
                            reply_to: "official.academic360@gmail.com",
                            message: "Congratulations!! Your appointment has been booked."
                        }
                        emailjs.send('service_w2cbgtf', 'template_oevwn69', templateParams, 'x0yoXZhLLLAmkfimK')
                            .then(() => {
                                window.location.reload()
                            }).catch(err => console.log(err.message))
                    }).catch(err => console.log(err.message))
                    window.location.href = "/"
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
        return (
            <div style={{ paddingTop: "120px", paddingBottom: "75px" }} className="main-container">
                <div className="row row-cols-1 row-cols-md-2 g-3 mb-3">
                    <div className="col-12 col-md-8">
                        <div className="h5 ms-3">Select Date and Time:</div>
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
                            <i style={{width:"20px"}} className="fa fa-calendar session-icons"></i>
                            <div className="fw-bold"><Moment format="D MMM YYYY HH : MM">
                                {this.state.selectedDate.startTime}
                            </Moment></div>
                        </div>
                        <div className="d-flex gap-3 align-items-center mb-3">
                            <i style={{width:"20px"}} className="fa fa-clock-o session-icons"></i>
                            <div className="fw-bold">{this.state.sessionDetails.time} minutes</div>
                        </div>
                        <div className="d-flex gap-3 align-items-center mb-3">
                            <i style={{width:"20px"}} className="fa fa-map-marker session-icons"></i>
                            <div className="fw-bold">Online meeting link will be shared after payment.</div>
                        </div>
                        <div>
                            <Button onClick={showRazorpay} className="button-submit" color="success">
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