import React from "react"
import { Input, Label, Button } from "reactstrap"
import { firestore } from "../config"
import firebase from "../config"

class Footer extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            submitMessage: "",
            messageColor: ""
        }
    }
    render() {
        const onChange = (e) => {
            const { name, value } = e.target
            this.setState({ [name]: value })
        }

        const onSubmit = () => {
            const { email } = this.state
            if (!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                this.setState({ submitMessage: "Please enter a valid email id", messageColor: "#DB4437" })
                setTimeout(() => {
                    this.setState({ submitMessage: "", email: "" })
                }, 3000)
            }
            else {
                firestore.collection("newsletter").doc().set({
                    email: this.state.email,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => {
                    this.setState({ submitMessage: "You have been added to the subsribers list. Thank you for subscribing to our newsletters.", messageColor: "#0F9D58" })
                    setTimeout(() => {
                        this.setState({ submitMessage: "" })
                    }, 3000)
                }).catch(err => {
                    this.setState({ submitMessage: "Some error occurred. Please try again after sometime.", messageColor: "#DB4437" })
                    setTimeout(() => {
                        this.setState({ submitMessage: "" })
                    }, 3000)
                })
            }
        }
        return (
            <div className="bg-secondary p-md-5 pb-0 pb-md-0 p-3">
                <div className="row row-cols-1 row-col-md-2 row-cols-xl-3 mb-3">
                    <div className="col mb-5">
                        <div className="h3 mb-5">Subscribe to our newsletter</div>
                        <Label>Email Address</Label>
                        <Input className="mb-1" placeholder="Your email address" onChange={onChange} name="email" value={this.state.email} />
                        <div style={{ color: this.state.messageColor, fontWeight: "bold" }}>
                            {this.state.submitMessage}
                        </div>
                        <Button disabled={!this.state.email} onClick={onSubmit} className="bg-primary button-submit mt-3">
                            Submit
                        </Button>
                    </div>
                    <div className="col mb-5">
                        <div className="h3 mb-3">Follow our Instagram Channel</div>
                        <a target="_blank" rel="noreferrer" className="footer-social-media" href="https://www.instagram.com/academic360/"><i className="fa fa-instagram"></i></a>
                    </div>
                    <div className="col mb-5">
                        <div className="h3 mb-3">Some Important Links</div>
                        <div>
                            <a className="footer-links" href="/privacy">Privacy Policy</a>
                        </div>
                        <div>
                            <a className="footer-links" href="/refund">Refund and Cancellation Policy</a>
                        </div>
                        <div>
                            <a className="footer-links" href="/terms">Terms and Conditions</a>
                        </div>
                    </div>
                </div>
                <div className="text-center pb-5">
                    <div>Operated and Managed by RISHABH INTERNATIONAL</div>
                    <div>GSTIN: 06BBZPJ9237K1ZS</div>
                </div>
            </div>

        )
    }
}

export default Footer