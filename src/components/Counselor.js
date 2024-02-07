import React from "react"
import { Badge, CardBody, Card, Button } from "reactstrap"
import { firestore } from "../config"
import ProfilePlaceholder from "../assets/placeholder.webp"

class Counselor extends React.Component {
    render() {
        const viewProfile = () => {
            firestore.collection("counselors").doc(this.props.id).update({
                profileViews: this.props.profileViews + 1
            }).then(() => {
                window.location.href = `counselor/${this.props.id}`
            }).catch(err => console.log(err.message))
        }
        return (
            <Card>
                <CardBody className="text-center">
                    {!this.props.profilePicture && <img src={ProfilePlaceholder} className="mb-3 counselor-picture" alt="" />}
                    {this.props.profilePicture && <div>
                        <img src={ProfilePlaceholder} className="mb-3 counselor-picture" alt="" />
                        <img src={this.props.profilePicture} className="mb-3 counselor-picture" alt="" style={{position: "absolute", marginLeft: "-250px"}} />
                    </div>}
                    <div className="h5">{this.props.name}</div>
                    <div className="d-flex gap-3 justify-content-center">
                        <Badge color="warning">
                            {this.props.location}
                        </Badge>
                        <Badge color="success">
                            {this.props.degree}
                        </Badge>
                    </div>
                    <div className="my-3 truncate-description">
                        {this.props.description}
                    </div>
                    <Button onClick={viewProfile} className="bg-primary">
                        View Profile
                    </Button>
                </CardBody>
            </Card>
        )
    }
}

export default Counselor