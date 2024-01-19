import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../config";
import Session from "../components/Session";
import { Tooltip } from "reactstrap";

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
                        <img src={counselor.profileUrl} className="counselor-picture mb-3" />
                        <div className="h4">{counselor.name}</div>
                    </div>
                    <div className="col-12 col-md-8">
                        <div className="h4 mb-5">About Me</div>
                        <a target="_blank"  id="TooltipExample" href={counselor.linkedin} className="mb-3 linkedin-icon">
                            <i className="fa fa-linkedin"></i>
                        </a>
                        <Tooltip
                            isOpen={isOpen}
                            target="TooltipExample"
                            toggle={() => setOpen(!isOpen)}
                        >
                            Linkedin Profile
                        </Tooltip>
                        <div className="mt-3">
                            {counselor.introduction}
                        </div>
                    </div>
                </div>
                <div className="h5 mb-3">Sessions</div>
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