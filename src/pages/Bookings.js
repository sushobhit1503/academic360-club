import React from "react";
import { firestore } from "../config";
import firebase from "../config";

class Bookings extends React.Component {
    constructor () {
        super ()
        this.state = {
            
        }
    }
    componentDidMount () {
        firestore.collection("counselors").get().then(Snapshot => {
            let temp = []
            Snapshot.forEach(document => {
                let obj = {
                    id: document.id,
                    data: document.data()
                }
                temp.push(obj)
            })
            this.setState({ allCounselors: temp })
        })
    }
    render () {
        return (
            <div>

            </div>
        )
    }
}

export default Bookings