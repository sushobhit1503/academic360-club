import React from "react"
import LandingPageImage from "../assets/home-page-landing.avif"
import { Button, Card, CardBody, Input, Label } from "reactstrap"

class Home extends React.Component {
    render() {
        return (
            <div>
                <div className="h1 mt-md-5 mt-3 mb-0 text-center text-secondary">
                    ACADEMIC 360
                </div>
                <div className="h4 mb-5 text-center text-secondary">
                    Your Gateway to Informed Education Abroad
                </div>
                <div className="text-center mb-5 main-container">
                    <img src={LandingPageImage} alt="academic" className="img-fluid" />
                </div>
                <div className="row row-cols-1 row-cols-md-2 g-3 mb-5 main-container">
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

                    </div>
                </div>
                <div className="text-center bg-primary mb-5 p-3 p-md-5">
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
                <div className="text-center mb-5">
                    <div className="h2 mb-3 text-secondary">Why Choose us?</div>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3 px-3">
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
                <div className="bg-primary row row-cols-1 row-cols-md-2 g-3 mb-5">
                    <div className="col">
                        <img />
                    </div>
                    <div className="col py-5">
                        <div className="h2 mb-3 text-primary px-3 px-md-5">Our Mission</div>
                        <div className="text-primary px-3 px-md-5">
                            Academic 360 is more than just an educational consultancy firm.
                            We are a community of knowledge seekers and experts dedicated to fostering meaningful
                            connections. Our mission is to bridge the gap between students aspiring to pursue education
                            abroad and experienced consultants who can guide them through every step of the way.
                        </div>
                    </div>
                </div>
                <div className="row row-cols-1 row-cols-md-2 g-3 mb-5 px-md-5 px-3">
                    <div className="col">
                        <div className="h2 mb-3">Contact Us</div>
                        <div className="mb-3">
                            <Label>Name</Label>
                            <Input placeholder="Your Name" />
                        </div>
                        <div className="mb-3">
                            <Label>Your email</Label>
                            <Input placeholder="Your Email Address" />
                        </div>
                        <div className="mb-3">
                            <Label>Message</Label>
                            <Input placeholder="Enter your message" />
                        </div>
                        <Button className="bg-primary button-submit">
                            Submit
                        </Button>
                    </div>
                    <div className="col">

                    </div>
                </div>
            </div>
        )
    }
}

export default Home