import React from "react";
import { Label, Input, Button } from "reactstrap";

class SecurityPage extends React.Component {
    constructor() {
        super()
        this.state = {
            userId: "rishab82507",
            password: "CH$ck460",
            enteredUserId: "",
            enteredPassword: ""
        }
    }
    render() {
        const onSubmit = () => {
            const {userId, password, enteredPassword, enteredUserId} = this.state
            if (userId === enteredUserId && password === enteredPassword) {
                const object = {
                    access: true,
                    valid: new Date()
                }
                localStorage.setItem("adminAccess", JSON.stringify(object))
                window.location.href = "/"
            }
        }
        const onChange = (e) => {
            const {name, value} = e.target
            this.setState ({[name]: value})
        }
        return (
            <div className="px-xl-5 px-3 py-3 col-xl-4 col-12 m-auto">
                <div className="h1">Security Page</div>
                <div className="mb-3">
                    <Label>Enter Username</Label>
                    <Input placeholder="Enter username" onChange={onChange} value={this.state.enteredUserId} name="enteredUserId" />
                </div>
                <div className="mb-3">
                    <Label>Enter Password</Label>
                    <Input placeholder="Enter password" onChange={onChange} value={this.state.enteredPassword} name="enteredPassword" type="password" />
                </div>
                <Button onClick={onSubmit} color="success">
                    Log in
                </Button>
            </div>
        )
    }
}

export default SecurityPage