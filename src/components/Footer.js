import React from "react"
import { Input, Label, Button } from "reactstrap"

class Footer extends React.Component {
    render() {
        return (
            <div>
                <div className="row row-cols-1 row-col-md-2 row-cols-xl-3 g-5 bg-secondary p-md-5 p-3 mt-5">
                    <div className="col">
                        <div className="h3 mb-3">Subscribe to our newsletter</div>
                        <Label>Email Address</Label>
                        <Input className="mb-3" placeholder="Your email address" />
                        <Button className="bg-primary button-submit">
                            Submit
                        </Button>
                    </div>
                    <div className="col">
                        <div className="h3 mb-3">Follow our Instagram Channel</div>
                        <a><i className="fas fa-instagram"></i></a>
                    </div>
                    <div className="col mb-5">
                        <div className="h3 mb-3">Some Important Links</div>
                        <div>
                            <a className="footer-links" href="/contact">Contact Us</a>
                        </div>
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