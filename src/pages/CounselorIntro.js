import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../config";
import Session from "../components/Session";
import { Tooltip } from "reactstrap";
import ProfilePlaceholder from "../assets/placeholder.webp"

const CounselorIntro = () => {
    const { id } = useParams()
    const [counselor, setCounselor] = useState({})
    const [sessions, setSessions] = useState([])
    const [isOpen, setOpen] = useState(false)
    useEffect(() => {
        firestore.collection("counselors").doc(id).get().then(document => {
            setCounselor(document.data())
        })
        firestore.collection("sessions").where("organiser", "==", id).get().then(Snapshot => {
            let temp = []
            Snapshot.forEach(document => {
                let obj = {
                    id: document.id,
                    data: document.data()
                }
                temp.push(obj)
            })
            setSessions(temp)
        })
    }, [])
    return (
        <div className="page-start">
            <div className="my-5 main-container">
                <div className="row row-cols-1 row-cols-md-2 g-3 mb-5">
                    <div className="col-12 col-md-4 text-center">
                        {!counselor.profileUrl && <img src={ProfilePlaceholder} className="mb-3 counselor-picture" alt="profile" />}
                        {counselor.profileUrl && <img src={counselor.profileUrl} className="mb-3 counselor-picture" alt="profile" />}
                        <div className="h4">{counselor.name}</div>
                    </div>
                    <div className="col-12 col-md-8">
                        <div className="h4 mb-5">About Me</div>
                        <a target="_blank" id="TooltipExample" href={counselor.linkedin} className="mb-3 linkedin-icon">
                            <i className="fa fa-linkedin"></i>
                        </a>
                        <Tooltip
                            isOpen={isOpen}
                            target="TooltipExample"
                            toggle={() => setOpen(!isOpen)}
                        >
                           {counselor.name}'s LinkedDonein Profile
                        </Tooltip>
                        <div className="mt-3">
                            {counselor.introduction}
                        </div>
                    </div>
                </div>
                <div className="h5">Sessions</div>
                {sessions.length === 0 &&
                    <div className="mb-3 text-tertiary">
                        No sessions available currently. Sessions would be updated soon
                    </div>}
                <div className="row row-cols-1 row-cols-md-3 g-3">
                    {sessions.map(eachSession => {
                        return (
                            <div className="col" key={eachSession.id}>
                                <Session name={eachSession.data.name}
                                    actualPrice={eachSession.data.actualPrice}
                                    discount={eachSession.data.discountedPrice} time={eachSession.data.time}
                                    sessionViews={eachSession.data.sessionViews}
                                    id={eachSession.id} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

    )
}

export default CounselorIntro