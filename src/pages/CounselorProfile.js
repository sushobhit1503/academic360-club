import React from "react";
import Counselor from "../components/Counselor";
import { firestore } from "../config";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

class CounselorProfile extends React.Component {
    constructor() {
        super()
        this.state = {
            allCounselors: [],
            isLoading: true
        }
    }
    componentDidMount() {
        localStorage.removeItem("success")
        firestore.collection("counselors").get().then(Snapshot => {
            let temp = []
            Snapshot.forEach(document => {
                let obj = {
                    id: document.id,
                    data: document.data()
                }
                temp.push(obj)
            })
            this.setState({ allCounselors: temp, isLoading: false })
        }).catch(err => console.log(err.message))
    }
    render() {
        return (
            <div className="page-start">
                <div className="text-center bg-primary h1 text-primary p-5 mb-5">
                    Counselor Profiles
                </div>
                <div className="main-container">
                    {this.state.isLoading ?
                        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3 mb-5">
                            <div className="col">
                                <Skeleton height={300} />
                            </div>
                            <div className="col">
                                <Skeleton height={300} />
                            </div>
                            <div className="col">
                                <Skeleton height={300} />
                            </div>
                        </div> :
                        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3 mb-5">
                            {this.state.allCounselors.map(eachCounselor => {
                                return (
                                    <div className="col" key={eachCounselor.id}>
                                        <Counselor
                                            name={eachCounselor.data.name}
                                            id={eachCounselor.id}
                                            location={eachCounselor.data.location}
                                            introduction={eachCounselor.data.introduction}
                                            description={eachCounselor.data.description}
                                            profilePicture={eachCounselor.data.profileUrl}
                                            degree={eachCounselor.data.degree}
                                            profileViews={eachCounselor.data.profileViews} />
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default CounselorProfile