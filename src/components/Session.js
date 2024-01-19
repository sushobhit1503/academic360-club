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
            <Card className="session-card cursor h-100" onClick={sessionViews}>
                <CardBody>
                    <div className="h5">{this.props.name}</div>
                    <div>
                        <span className="actual-price me-2"><i className="fa fa-inr me-1"></i>{this.props.actualPrice}</span>
                        <i className="fa fa-inr me-1"></i>{this.props.discount} <span className="mx-2">|</span>  {this.props.time} minutes</div>
                </CardBody>
            </Card>
        )
    }
}

export default Session