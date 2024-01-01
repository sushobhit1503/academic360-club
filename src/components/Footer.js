import React from "react"
import { Input, Label, Button } from "reactstrap"

class Footer extends React.Component {
    render() {
        return (
            <div className="row row-cols-1 row-col-md-2 row-cols-xl-3 g-3">
                <div className="col">
                    <div className="h3 mb-3">Subscribe to our newsletter</div>
                    <Label>Email Address</Label>
                    <Input className="mb-3" placeholder="Your email address" />
                    <Button>
                        Submit
                    </Button>
                </div>
                <div className="col">
                    <div className="h3 mb-3">Follow our Instagram Channel</div>
                    <i className="fas fa-instagram"></i>
                </div>
                <div className="col">
                    <div>
                        <a>Contact Us</a>
                    </div>
                    <div>
                        <a>Privacy Policy</a>
                    </div>
                    <div>
                        <a>Refund and Cancellation Policy</a>
                    </div>
                    <div>
                        <a>Terms and Conditions</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer