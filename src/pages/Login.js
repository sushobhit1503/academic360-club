import React from "react"
import { Button, Card, CardBody, Input, Label, InputGroup, InputGroupText } from "reactstrap"
import { auth, firestore } from "../config"
import firebase from "../config"
import { countryCode } from "../util/countryCode"

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            pageState: "register",
            name: "",
            phoneNumber: "",
            email: "",
            password: "",
            confirmPassword: "",
            isLoading: false,
            message: "",
            messageColor: "",
            code: "+7 840"
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

        const register = () => {
            const { email, password, name, phoneNumber, code } = this.state
            this.setState({ isLoading: true })
            firestore.collection("users").where("email", "==", email).get().then(docSnap => {
                if (!docSnap.empty) {
                    this.setState({ message: "User already exists. Please login", messageColor: "#DB4437" })
                    setTimeout(() => {
                        this.setState({ message: "", isLoading: false })
                    }, 3000)
                    return
                }
                else {
                    auth.createUserWithEmailAndPassword(email, password).then(user => {
                        firestore.collection("users").doc(user.user.uid).set({
                            name, email, password, phoneNumber, code,
                            createdAt: firebase.firestore.FieldValue.serverTimestamp()
                        }).then(() => {
                            localStorage.setItem("uid", user.user.uid)
                            window.location.href = "/"
                        }).catch(err => {
                            this.setState({ message: err.message, messageColor: "#DB4437" })
                            setTimeout(() => {
                                this.setState({ message: "", isLoading: false })
                            }, 3000)
                        })

                    }).catch(err => {
                        this.setState({ message: err.message, messageColor: "#DB4437" })
                        setTimeout(() => {
                            this.setState({ message: "", isLoading: false })
                        }, 3000)
                    })
                }
            })
        }

        const login = () => {
            const { email, password } = this.state
            this.setState({ isLoading: true })
            firestore.collection("users").where("email", "==", email).get().then(docSnap => {
                if (docSnap.empty) {
                    this.setState({ message: "User doesn't exist. Please register", messageColor: "#DB4437" })
                    setTimeout(() => {
                        this.setState({ message: "", isLoading: false })
                    }, 3000)
                    return
                }
                else {
                    auth.signInWithEmailAndPassword(email, password).then(user => {
                        localStorage.setItem("uid", user.user.uid)
                        window.location.href = "/"
                    }).catch(err => {
                        this.setState({ message: err.message, messageColor: "#DB4437" })
                        setTimeout(() => {
                            this.setState({ message: "", isLoading: false })
                        }, 3000)
                    })
                }
            })
        }

        const forgotPassword = () => {
            const { email } = this.state
            if (!email) {
                this.setState({ message: "Please enter email", messageColor: "#DB4437" })
            }
            else {
                auth.sendPasswordResetEmail(email).then(() => {
                    this.setState({ message: "Password reset email sent", messageColor: "#0F9D58", isLoading: false })
                }).catch(err => {
                    console.log(err.message)
                })
            }

        }


        // }
        if (localStorage.getItem("uid"))
            window.location.href = "/"


        const isRegisterDisabled = !(this.state.name && this.state.email && this.state.phoneNumber && this.state.confirmPassword && this.state.password) || (this.state.confirmPassword !== this.state.password) || this.state.isLoading
        const isLoginDisabled = !(this.state.email && this.state.password) || this.state.isLoading

        return (
            <div className="login-background">
                <div className="main-container py-5 col-12 col-md-6 m-auto">
                    <Card>
                        <CardBody>
                            {this.state.pageState === "login" &&
                                <div>
                                    <div className="h2 text-secondary mb-3">Login</div>
                                    <div className="mb-3">
                                        <Label>Email Id</Label>
                                        <Input onChange={onChange} value={this.state.email} name="email" placeholder="Please enter your email id" />
                                    </div>
                                    <div>
                                        <Label>Password</Label>
                                        <Input onChange={onChange} value={this.state.password} name="password" placeholder="Please enter your password" type="password" className="mb-1" />
                                    </div>
                                    <div className="d-flex justify-content-end gap-1">
                                        Forgot Password? <a onClick={forgotPassword} href="#" className="text-decoration-underline cursor">Click Here</a>
                                    </div>
                                    <Button onClick={login} disabled={isLoginDisabled} className="button-submit bg-primary mt-3">
                                        {this.state.isLoading ? "Loading..." : "Login"}
                                    </Button>
                                    <div className="my-3" style={{ color: this.state.messageColor, fontWeight: "bold" }}>
                                        {this.state.message}
                                    </div>
                                    <div className="text-center">Don't have an account? <a href="#" onClick={changePageState} className="text-decoration-underline cursor">Click Here</a></div>
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
                                    <div className="row row-cols-lg-2 row-cols-1 mb-3">
                                        <div className="col">
                                            <Label>Country</Label>
                                            <Input onChange={onChange} value={this.state.code} name="code" type="select">
                                                {countryCode.map(eachCountry => {
                                                    return (
                                                        <option key={eachCountry.name} value={eachCountry.code}>{eachCountry.name}</option>
                                                    )
                                                })}
                                            </Input>
                                        </div>
                                        <div className="col">
                                            <Label>Phone Number</Label>
                                            <InputGroup>
                                                <InputGroupText>
                                                    {this.state.code}
                                                </InputGroupText>
                                                <Input onChange={onChange} value={this.state.phoneNumber} name="phoneNumber" placeholder="Please enter your phone number" />
                                            </InputGroup>
                                        </div>
                                    </div>
                                    <div className="d-flex gap-3">
                                        <div>
                                            <Label>Password</Label>
                                            <Input onChange={onChange} value={this.state.password} name="password" placeholder="Please enter password" type="password" />
                                        </div>
                                        <div>
                                            <Label>Confirm Password</Label>
                                            <Input onChange={onChange} value={this.state.confirmPassword} name="confirmPassword" placeholder="Please confirm password" type="password" />
                                        </div>
                                    </div>
                                    <Button onClick={register} disabled={isRegisterDisabled} className="button-submit bg-primary mt-3">
                                        {this.state.isLoading ? "Loading..." : "Register"}
                                    </Button>
                                    <div className="my-3" style={{ color: this.state.messageColor, fontWeight: "bold" }}>
                                        {this.state.message}
                                    </div>
                                    <div className="text-center">Already a user? <a href="#" onClick={changePageState} className="text-decoration-underline cursor">Click Here</a></div>
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