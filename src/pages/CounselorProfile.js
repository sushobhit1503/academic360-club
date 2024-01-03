import React from "react";
import Counselor from "../components/Counselor";
import { firestore } from "../config";

class CounselorProfile extends React.Component {
    constructor() {
        super()
        this.state = {
            allCounselors: []
        }
    }
    componentDidMount() {
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
    render() {
        return (
            <div>
                <div className="text-center bg-primary mb-3 h1 text-primary p-3 py-5 p-xl-5 mt-3">
                    Counselor Profiles
                </div>
                <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3 mb-5 p-3">
                    {this.state.allCounselors.map(eachCounselor => {
                        return (
                            <div className="col" key={eachCounselor.id}>
                                <Counselor 
                                name={eachCounselor.data.name}
                                id={eachCounselor.id}
                                location={eachCounselor.data.location}
                                introduction={eachCounselor.data.introduction}
                                description={eachCounselor.data.description}
                                profilePicture={eachCounselor.data.profilePicture}
                                degree={eachCounselor.data.degree}
                                profileViews={eachCounselor.data.profileViews} />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default CounselorProfile