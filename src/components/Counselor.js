import React from "react"
import { Badge, CardBody, Card, Button } from "reactstrap"

class Counselor extends React.Component {
    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <img className="mb-3" />
                        <div className="h3">Arrpiit Bissaria</div>
                        <Badge>
                            Australia
                        </Badge>
                        <Badge>
                            Bachelors
                        </Badge>
                        <div>
                            Masters degree at the University of Queensland, Australia. Studied Mechanical Engineering at BITS Pilani
                        </div>
                        <Button>
                            View Profile
                        </Button>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default Counselor