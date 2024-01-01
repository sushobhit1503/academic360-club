import React from "react"
import { Button, Input, Label } from "reactstrap"

class ContactUs extends React.Component {
    render () {
        return (
            <div className="text-center">
                <div className="h2 mb-3">Get in Touch</div>
                <Label>Name</Label>
                <Input className="mb-3" placeholder="Your Name" />
                <Label>Your email</Label>
                <Input className="mb-3" placeholder="Your Email Address" />
                <Label>Contact Number</Label>
                <Input className="mb-3" placeholder="Your Contact Number" />
                <Label>Message</Label>
                <Input className="mb-3" placeholder="Enter your message" />
                <Button>
                    Submit
                </Button>
            </div>
        )
    }
}

export default ContactUs