import React from "react"
import { Badge, CardBody, Card, Button } from "reactstrap"
import Arpit from "../assets/Arpit.avif"

class Counselor extends React.Component {
    render() {
        return (
            <div>
                <Card>
                    <CardBody className="text-center">
                        <img src={Arpit} className="mb-3 counselor-picture" />
                        <div className="h5">Arrpiit Bissaria</div>
                        <div className="d-flex gap-3 justify-content-center">
                            <Badge color="warning">
                                Australia
                            </Badge>
                            <Badge color="success">
                                Bachelors
                            </Badge>
                        </div>
                        <div className="my-3">
                            Masters degree at the University of Queensland, Australia. Studied Mechanical Engineering at BITS Pilani
                        </div>
                        <Button className="bg-primary">
                            View Profile
                        </Button>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default Counselor