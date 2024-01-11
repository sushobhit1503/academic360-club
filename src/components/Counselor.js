import React from "react"
import { Badge, CardBody, Card, Button } from "reactstrap"
import { firestore } from "../config"

class Counselor extends React.Component {
    render() {
        const viewProfile = () => {
            firestore.collection("counselors").doc(this.props.id).update ({
                profileViews: this.props.profileViews + 1 
            }).then (() => {
                window.location.href = `counselor/${this.props.id}`
            }).catch (err => console.log(err.message))
        }
        return (
            <div className="h-100">
                <Card className="h-100">
                    <CardBody className="text-center">
                        <img src={this.props.profilePicture} className="mb-3 counselor-picture" />
                        <div className="h5">{this.props.name}</div>
                        <div className="d-flex gap-3 justify-content-center">
                            <Badge color="warning">
                                {this.props.location}
                            </Badge>
                            <Badge color="success">
                                {this.props.degree}
                            </Badge>
                        </div>
                        <div className="my-3">
                            {this.props.description}
                        </div>
                        <Button onClick={viewProfile} className="bg-primary">
                            View Profile
                        </Button>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default Counselor