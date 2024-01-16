import React from "react"
import { Button, Card, CardBody, Input, Label } from "reactstrap"
import { firestore } from "../config"
import Image1 from "../assets/who-we-are-1.jpeg"
import Image2 from "../assets/who-we-are-2.jpeg"
import Mission from "../assets/mission.avif"
import Contact from "../assets/contact.jpg"
import firebase from "../config"
import emailjs from "@emailjs/browser"

class Home extends React.Component {
    constructor () {
        super ()
        this.state = {
            name: "",
            email: "",
            phoneNumber: "",
            message: "",
            submitMessage: "",
            messageColor: "",
            characters: 500
        }
    }
    componentDidMount () {
        const uid = localStorage.getItem("uid")
        if (uid) {
            firestore.collection("users").doc(uid).get().then(document => {
                const {name, email, phoneNumber} = document.data()
                this.setState ({name, email, phoneNumber})
            }).catch(err => console.log(err.message))
        }
    }
    render() {
        const onChange = (e) => {
            const {name, value} = e.target
            this.setState ({[name]: value})
        }

        const onSubmit = () => {
            const {name, email, message, phoneNumber} = this.state
            if (phoneNumber.length !== 10) {
                this.setState ({submitMessage: "Please enter a valid phone number", messageColor: "#DB4437"})
                
            }
                
            if (!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                this.setState ({submitMessage: "Please enter a valid email id", messageColor: "#DB4437"})
                setTimeout(() => {
                    this.setState({ submitMessage: "" })
                }, 3000)
            }
            else {
                firestore.collection("contact").doc().set ({
                    name,
                    email,
                    message,
                    phoneNumber,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp ()
                }).then(() => {
                    this.setState({ submitMessage: "Our team will contact you shortly.", messageColor: "#0F9D58" })
                    setTimeout(() => {
                        this.setState({ submitMessage: "" })
                    }, 3000)
                    let templateParams = {
                        from_name: this.state.name,
                        phone_number: this.state.phoneNumber,
                        subject: "Contact Query",
                        reply_to: this.state.email,
                        message: this.state.message
                    }
                    emailjs.send('service_w2cbgtf', 'template_cda84sm', templateParams, 'x0yoXZhLLLAmkfimK')
                        .then(() => {
                            window.location.reload()
                        }).catch(err => console.log(err.message))
                }).catch(err => {
                    this.setState({ submitMessage: "Some error occurred. Please try again after sometime.", messageColor: "#DB4437" })
                    setTimeout(() => {
                        this.setState({ submitMessage: "" })
                    }, 3000)
                })
            }
        }
        return (
            <div>
                <div className="home-background mb-3">
                    <div className="h1 pt-md-5 pt-3 text-secondary">
                        ACADEMIC 360
                    </div>
                    <div className="h4 text-center mb-3 text-primary">
                        Your Gateway to Informed Education Abroad
                    </div>
                    <Button onClick={() => window.location.href="/counselor-profiles"} className="bg-primary h5">
                        Start Counselling
                    </Button>
                </div>
                <div className="main-container">
                    <div className="row row-cols-1 row-cols-md-2 g-3 mt-3">
                        <div className="col">
                            <div className="h2 mb-3">
                                Who We Are
                            </div>
                            <div className="h5 mb-2">
                                Welcome to Academic 360: Your Gateway to Informed Education Abroad
                            </div>
                            <div className="mb-5">
                                At Academic 360, we understand that the journey to studying abroad can be both exciting and challenging.
                                Navigating through various options, understanding admission processes,
                                and addressing specific queries can sometimes be overwhelming.
                                That's why we've crafted a platform that serves as your companion on this educational adventure.
                            </div>
                            <div className="h5 mb-2">
                                1 on 1 Sessions: Your Personalized Guidance
                            </div>
                            <div className="mb-5">
                                One of our unique offerings is the opportunity for students to engage in personalized 1 on 1
                                sessions with consultants. These sessions are designed to address your specific concerns, clear doubts,
                                and provide insights tailored to your educational goals. Our consultants include seasoned professionals
                                in the field as well as current students who have firsthand experience in the very universities you aspire
                                to join.
                            </div>
                            <div className="h5 mb-2">
                                External Consultants and Student Ambassadors: A Diverse Pool of Expertise
                            </div>
                            <div className="mb-5">
                                Our team of consultants comprises not only external experts well-versed in the intricacies
                                of international education but also passionate student ambassadors currently enrolled in
                                universities worldwide. This diverse pool of expertise ensures that you receive a well-rounded perspective,
                                covering both the professional insights and the lived experiences of those who have walked a similar path.
                            </div>
                        </div>
                        <div className="col">
                            <div className="d-md-flex d-none align-items-center gap-3 justify-content-between h-100">
                                <div className="who-image-1">
                                </div>
                                <div className="who-image-2">
                                </div>
                            </div>
                            <div className="d-block d-md-none align-items-center gap-3 justify-content-centercode .
                             h-100">
                                <div className="mb-3">
                                    <img src={Image1} className="who-image" alt="academics" />
                                </div>
                                <div>
                                    <img src={Image2} className="who-image" alt="academics" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center bg-primary my-3 p-3 p-md-5">
                    <div className="h2 mb-3 text-primary">Our Services</div>
                    <div className="text-primary px-3 text-start">
                        Welcome to Academic 360, your go-to platform for seamless international education guidance.
                        Explore diverse consultant profiles, from seasoned professionals to student ambassadors.
                        Our advanced matching ensures personalized connections for your unique needs, be it applications,
                        academics, or cultural integration. Navigate transparent pricing, choose within your budget, and
                        enjoy a user-friendly experience. Engage in secure 1 on 1 sessions, receiving confidential, personalized
                        guidance. Academic 360 is your gateway to a world-class education, ensuring support and success throughout
                        your journey.
                    </div>
                </div>
                <div className="text-center main-container">
                    <div className="h2 mb-3 text-secondary">Why Choose us?</div>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
                        <div className="col">
                            <Card className="h-100">
                                <CardBody>
                                    <div className="h5 mb-2 text-start">Holistic Guidance for Your Journey</div>
                                    <div className="text-start">
                                        At Academic 360, we recognize that studying abroad is a comprehensive experience that goes
                                        beyond academic pursuits. Our guidance is tailored to address the entirety of your educational
                                        journey. We not only provide assistance with application strategies and academic concerns but
                                        also offer insights into cultural adaptation, personal development, and long-term career planning.
                                        We believe in nurturing every aspect of your growth during your international education experience.
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col">
                            <Card className="h-100">
                                <CardBody>
                                    <div className="h5 mb-2 text-start">Community Connection for Support</div>
                                    <div className="text-start">
                                        Beyond the consultancy sessions, Academic 360 offers you a community of individuals who
                                        share your passion for studying abroad. This community includes not only
                                        consultants but also fellow students embarking on similar journeys.
                                        Joining Academic 360 means connecting with a support network that extends beyond
                                        formal consultations. Whether you're seeking advice, sharing experiences, or simply
                                        looking for encouragement, our community is here for you. We believe that building a
                                        supportive network is integral to a successful international education experience, and
                                        Academic 360 is committed to fostering those connections.
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col">
                            <Card className="h-100">
                                <CardBody>
                                    <div className="h5 mb-2 text-start">Diverse Perspectives, Personalized Solutions</div>
                                    <div className="text-start">
                                        Our team brings together a diverse group of consultants, including seasoned
                                        professionals in the field of international education and enthusiastic student
                                        ambassadors currently thriving in universities around the world. This diversity
                                        ensures that you receive a well-rounded perspective. In our 1 on 1 sessions, you
                                        can expect personalized solutions that combine expert insights with the practical
                                        experiences of those who have successfully navigated the challenges and opportunities
                                        of studying abroad. This blend of perspectives is designed to provide you with comprehensive
                                        and tailored guidance.
                                    </div>
                                </CardBody>
                            </Card>
                        </div>

                    </div>
                </div>
                <div className="bg-primary row row-cols-1 row-cols-xl-2 g-3 mt-3 mb-5">
                    <div className="col text-center">
                        <img src={Mission} alt="academics360" className="mission-image" />
                    </div>
                    <div className="col">
                        <div className="h2 mb-3 text-primary">Our Mission</div>
                        <div className="text-primary px-3 px-md-5">
                            Academic 360 is more than just an educational consultancy firm.
                            We are a community of knowledge seekers and experts dedicated to fostering meaningful
                            connections. Our mission is to bridge the gap between students aspiring to pursue education
                            abroad and experienced consultants who can guide them through every step of the way.
                        </div>
                    </div>
                </div>
                <div className="row row-cols-1 row-cols-xl-2 g-3 mb-5 main-container">
                    <div className="col mb-3">
                        <div className="h2 mb-3">Contact Us</div>
                        <div className="mb-3">
                            <Label>Name</Label>
                            <Input onChange={onChange} value={this.state.name} name="name" placeholder="Your Name" />
                        </div>
                        <div className="mb-3">
                            <Label>Your Email</Label>
                            <Input onChange={onChange} value={this.state.email} name="email" placeholder="Your Email Address" />
                        </div>
                        <div className="mb-3">
                            <Label>Your Phone Number</Label>
                            <Input onChange={onChange} value={this.state.phoneNumber} name="phoneNumber" placeholder="Your Phone Number" />
                        </div>
                        <div className="mb-1">
                            <Label>Message</Label>
                            <textarea maxLength={500} className="form-control" onChange={onChange} value={this.state.message} name="message" rows={8} placeholder="Enter your message">

                            </textarea>
                            <div style={{color: "var(--blue)"}}>{500 - this.state.message.length} characters left</div>
                        </div>
                        <div style={{ color: this.state.messageColor, fontWeight: "bold" }}>
                            {this.state.submitMessage}
                        </div>
                        <Button disabled={!this.state.email || !this.state.message || !this.state.name || !this.state.phoneNumber} onClick={onSubmit} className="bg-primary button-submit mt-3">
                            Submit
                        </Button>
                    </div>
                    <div className="col contact-image" style={{marginBottom: "225px"}}>
                        <img src={Contact} alt="academic360"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home