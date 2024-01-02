import React from "react"
import { Button, Card, CardBody, Input, Label } from "reactstrap"

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
            isLoading: false
        }
    }
    render() {
        const onChange = (e) => {
            const { name, value } = e.target
            this.setState({ [name]: value })
        }

        const changePageState = () => {
            if (this.state.pageState === "login")
                this.setState({ pageState: "register" })
            else
                this.setState({ pageState: "login" })
        }
        return (
            <div className="main-container my-3 mb-5 col-12 col-md-6 m-auto">
                <Card>
                    <CardBody>
                        {this.state.pageState === "login" &&
                            <div>
                                <div className="h2 text-secondary mb-3">Login</div>
                                <div className="mb-3">
                                    <Label>Phone Number</Label>
                                    <Input onChange={onChange} value={this.state.phoneNumber} name="phoneNumber" placeholder="Please enter your Phone Number" />
                                </div>
                                {this.state.otpHidden &&
                                    <div>
                                        <Button className="button-submit bg-primary mb-3">
                                            Get OTP
                                        </Button>
                                    </div>}
                                {!this.state.otpHidden &&
                                    <div>
                                        <div>
                                            <Label>One Time Password</Label>
                                            <Input onChange={onChange} value={this.state.otp} name="otp" placeholder="Please enter OTP" />
                                        </div>
                                        <div className="text-end mb-3">Resend the OTP in 00:26 sec</div>
                                    </div>}
                                {!this.state.otpHidden &&
                                    <Button className="button-submit bg-primary">
                                        Login
                                    </Button>}
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
                                <div>
                                    <Label>Phone Number</Label>
                                    <Input onChange={onChange} value={this.state.phoneNumber} name="phoneNumber" placeholder="Please enter your phone number" className="mb-3" />
                                </div>
                                {this.state.otpHidden &&
                                    <div>
                                        <Button className="button-submit bg-primary mb-3">
                                            Get OTP
                                        </Button>
                                    </div>}
                                {!this.state.otpHidden &&
                                    <div>
                                        <div>
                                            <Label>One Time Password</Label>
                                            <Input onChange={onChange} value={this.state.otp} name="otp" placeholder="Please enter OTP" />
                                        </div>
                                        <div className="text-end mb-3">Resend the OTP in 00:26 sec</div>
                                    </div>}
                                {!this.state.otpHidden &&
                                    <Button className="button-submit bg-primary">
                                        Login
                                    </Button>}
                                <div className="text-center">Already a user? <a onClick={changePageState} className="text-decoration-underline cursor">Click Here</a></div>
                            </div>}
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default Login