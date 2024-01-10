import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText, Button } from 'reactstrap';
import Logo from "../assets/logo.avif"
import withRouter from "../components/withRouter"

class Toolbar extends React.Component {
    constructor() {
        super()
        this.state = {
            isOpen: false,
            activeClassBar: "",
            activeClassButton: "bg-primary"
        }
    }
    componentDidMount() {
        let activeClassBar = ""
        let activeClassButton = ""
        if (window.location.href === "http://localhost:3000/" || window.location.href === "https://academic-360.netlify.app/") {
            window.addEventListener("scroll", () => {
                if (window.scrollY >= 600) {
                    activeClassBar = "bg-primary toolbar-box-shadow"
                    activeClassButton = "bg-tertiary text-secondary"
                }
                this.setState({ activeClassBar, activeClassButton })
            })
        }
        else {
            activeClassBar = "bg-primary toolbar-box-shadow"
            activeClassButton = "bg-tertiary text-secondary"
            this.setState({ activeClassBar, activeClassButton })
        }

    }
    render() {
        const toggle = () => {
            this.setState({ isOpen: !this.state.isOpen })
        }
        return (
            <div>
                <Navbar className={`${this.state.activeClassBar} position-fixed w-100 mobile-background`} expand="md" light style={{ zIndex: 3 }}>
                    <NavbarBrand href="/">
                        <img src={Logo} className='toolbar-logo' />
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="me-auto mb-3 mb-xl-0" navbar>
                            <NavItem className='menu-item'>
                                <NavLink className='text-primary' href="/">Home</NavLink>
                            </NavItem>
                            <NavItem className='menu-item'>
                                <NavLink className='text-primary' href="/counselor-profiles">
                                    Counselor Profiles
                                </NavLink>
                            </NavItem>
                        </Nav>
                        {localStorage.getItem("uid") ?
                            <NavbarText>
                                <Button onClick={() => { localStorage.removeItem("uid"); window.location.reload() }} className={`button-login ${this.state.activeClassButton} mb-3 mb-md-0`}>
                                    Logout
                                </Button>
                            </NavbarText> :
                            <NavbarText>
                                <a href='/login'>
                                    <Button className={`button-login ${this.state.activeClassButton} mb-3 mb-md-0`}>
                                        Login
                                    </Button>
                                </a>
                            </NavbarText>
                        }
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default withRouter(Toolbar)