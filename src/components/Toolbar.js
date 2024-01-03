import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class Toolbar extends React.Component {
    constructor () {
        super ()
        this.state = {
            isOpen: false
        }
    }
    render() {
        const toggle = () => {
            this.setState ({isOpen: !this.state.isOpen})
        }
        return (
            <div>
                <Navbar dark color='dark' expand="md">
                    <NavbarBrand href="/">Academics360</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="me-auto" navbar>
                            <NavItem>
                                <NavLink href="/users">Users</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/counselors">
                                    Counselors
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/sessions">Sessions</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Toolbar;