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
        return (
            <div>
                <div className="row row-cols-1 row-col-md-2 row-cols-xl-3 g-5 bg-secondary px-md-5 p-3">
                    <div className="col">
                        <div className="h3 mb-3">Subscribe to our newsletter</div>
                        <Label>Email Address</Label>
                        <Input className="mb-1" placeholder="Your email address" onChange={onChange} name="email" value={this.state.email} />
                        <div style={{ color: this.state.messageColor, fontWeight: "bold" }}>
                            {this.state.submitMessage}
                        </div>
                        <Button onClick={onSubmit} className="bg-primary button-submit mt-3">
                            Submit
                        </Button>
                    </div>
                    <div className="col text-center">
                        <div className="h3 mb-3">Follow our Instagram Channel</div>
                        <a className="footer-social-media" href="https://www.instagram.com/academic360/"><i className="fa fa-instagram"></i></a>
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
            </div>

        )
    }
}

export default Footer