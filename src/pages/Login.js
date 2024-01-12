import React from "react"
import { Button, Card, CardBody, Input, Label, InputGroup, InputGroupText } from "reactstrap"
import { firestore } from "../config"
import firebase from "../config"

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            pageState: "register",
            otpHidden: true,
            name: "",
            phoneNumber: "",
            otp: "",
            email: "",
            isLoading: false,
            result: "",
            error: "",
            timer: 30
        }
    }
    render() {
        const onChange = (e) => {
            const { name, value } = e.target
            this.setState({ [name]: value })
        }

        const changePageState = () => {
            if (this.state.pageState === "login")
                this.setState({ pageState: "register", error: "" })
            else
                this.setState({ pageState: "login", error: "" })
        }

        const checkUserExist = () => {
            const { phoneNumber, pageState } = this.state
            firestore.collection("users").where("phoneNumber", "==", phoneNumber).get().then(result => {
                console.log(result);
                if (pageState === "register" && result.docs.length !== 0) {
                    this.setState({ error: "User already exist. Please login" })
                }
                else if (pageState === "login" && result.docs.length === 0) {
                    this.setState({ error: "User does not exist. Please register" })
                }
                else {
                    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
                        "size": "invisible",
                        "callback": (response) => { }
                    });
                    let appVerifier = window.recaptchaVerifier
                    firebase.auth().signInWithPhoneNumber(("+91" + this.state.phoneNumber), appVerifier)
                        .then((confirmationResult) => {
                            this.setState({ result: confirmationResult, otpHidden: false })
                            this.state.timer > 0 && setTimeout(() => {
                                if (this.state.timer <= 10) {
                                    this.setState ({timer: String(this.state.timer - 1).padStart(2, "0")})
                                }
                                else {
                                    this.setState ({timer: this.state.timer - 1})
                                }
                            }, 1000);
                        }).catch((error) => {
                            console.log(error.message);
                        });
                }
            })
        }

        const loginSubmit = () => {
            this.state.result.confirm(this.state.otp).then(result => {
                localStorage.setItem("uid", result.user.uid)
                window.location.href="/"
            }).catch(err => console.log(err.message))
        }

        const registerSubmit = () => {
            const { name, email, phoneNumber } = this.state
            this.state.result.confirm(this.state.otp).then(result => {
                firestore.collection("users").doc(result.user.uid).set({
                    name, email, phoneNumber, createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    id: result.user.uid
                }).then(() => {
                    localStorage.setItem("uid", result.user.uid)
                    window.location.href = "/"
                }).catch(err => console.log(err.message))
            }).catch(err => console.log(err.message))
        }
        return (
            <div className="login-background">
                <div className="main-container py-5 col-12 col-md-6 m-auto">
                    <Card>
                        <CardBody>
                            {this.state.pageState === "login" &&
                                <div>
                                    <div className="h2 text-secondary mb-3">Login</div>
                                    <div className="mb-3">
                                        <Label>Phone Number</Label>
                                        <InputGroup>
                                            <InputGroupText>
                                                +91
                                            </InputGroupText>
                                            <Input onChange={onChange} value={this.state.phoneNumber} name="phoneNumber" placeholder="Please enter your Phone Number" />
                                        </InputGroup>
                                    </div>
                                    {this.state.otpHidden &&
                                        <div>
                                            <Button id="otp-button" onClick={checkUserExist} className="button-submit bg-primary mb-3">
                                                Get OTP
                                            </Button>
                                        </div>}
                                    {!this.state.otpHidden &&
                                        <div>
                                            <div>
                                                <Label>One Time Password</Label>
                                                <Input onChange={onChange} value={this.state.otp} name="otp" placeholder="Please enter OTP" />
                                            </div>
                                            <div className="text-end mb-3">Resend the OTP in {this.state.timer} sec</div>
                                        </div>}
                                    {!this.state.otpHidden &&
                                        <Button onClick={loginSubmit} className="button-submit bg-primary">
                                            Login
                                        </Button>}
                                    <div className="my-3">{this.state.error}</div>
                                    <div className="text-center">Don't have an account? <a onClick={changePageState} className="text-decoration-underline cursor">Click Here</a></div>
                                </div>}
                            {this.state.pageState === "register" &&
                                <div>
                                    <div className="h2 text-secondary mb-3">Register</div>
                                    <div>
                                        <Label>Name</Label>
                                        <Input onChange={onChange} value={this.state.name} name="name" placeholder="Please enter your name" className="mb-3" />
                                    </div>
                                    <div>
                                        <Label>Email Id</Label>
                                        <Input onChange={onChange} value={this.state.email} name="email" placeholder="Please enter your email id" className="mb-3" />
                                    </div>
                                    <div className="mb-3">
                                        <Label>Phone Number</Label>
                                        <InputGroup>
                                            <InputGroupText>
                                                +91
                                            </InputGroupText>
                                            <Input onChange={onChange} value={this.state.phoneNumber} name="phoneNumber" placeholder="Please enter your phone number" />
                                        </InputGroup>
                                    </div>
                                    {this.state.otpHidden &&
                                        <div>
                                            <Button id="otp-buttton" onClick={checkUserExist} className="button-submit bg-primary mb-3">
                                                Get OTP
                                            </Button>
                                        </div>}
                                    {!this.state.otpHidden &&
                                        <div>
                                            <div>
                                                <Label>One Time Password</Label>
                                                <Input onChange={onChange} value={this.state.otp} name="otp" placeholder="Please enter OTP" />
                                            </div>
                                            <div className="text-end mb-3">Resend the OTP in {this.state.timer} sec</div>
                                        </div>}
                                    {!this.state.otpHidden &&
                                        <Button onClick={registerSubmit} className="button-submit bg-primary">
                                            Register
                                        </Button>}
                                    <div className="my-3">{this.state.error}</div>
                                    <div className="text-center">Already a user? <a onClick={changePageState} className="text-decoration-underline cursor">Click Here</a></div>
                                </div>}
                        </CardBody>
                    </Card>
                </div>
                <div id="recaptcha-container"></div>
            </div>

        )
    }
}

export default Login