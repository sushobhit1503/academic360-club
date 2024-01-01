import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText, Button } from 'reactstrap';

class Toolbar extends React.Component {
    constructor() {
        super()
        this.state = {
            isOpen: false
        }
    }
    render() {
        const toggle = () => {
            this.setState({ isOpen: !this.state.isOpen })
        }
        return (
            <div>
                <Navbar expand="md" light fixed >
                    <NavbarBrand href="/">Academic 360</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="me-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/counselor-profiles">
                                    Counselor Profiles
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <NavbarText>
                            <Button>
                                Login
                            </Button>
                        </NavbarText>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Toolbar