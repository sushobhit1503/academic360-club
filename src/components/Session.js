import React from "react";
import { Card, CardBody } from "reactstrap";
import { firestore } from "../config";

class Session extends React.Component {
    render() {
        const sessionViews = () => {
            firestore.collection("sessions").doc(this.props.id).update({
                sessionViews: this.props.sessionViews + 1
            }).then(() => {
                window.location.href = `/session/${this.props.id}`
            }).catch(err => console.log(err.message))
        }
        return (
            <div>
                <Card className="cursor" onClick={sessionViews}>
                    <CardBody>
                        <img />
                        <div className="h5 mb-1">{this.props.name}</div>
                        <div>
                            <span className="actual-price me-2"><i className="bi bi-currency-rupee"></i>{this.props.actualPrice}</span>
                            <i className="bi bi-currency-rupee"></i>{this.props.discount} | {this.props.time}</div>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default Session