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
                <Navbar className='bg-transparent position-fixed w-100' expand="md" light>
                    <NavbarBrand href="/">Academic 360</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="me-auto" navbar>
                            <NavItem className='menu-item'>
                                <NavLink className='text-primary' href="/">Home</NavLink>
                            </NavItem>
                            <NavItem className='menu-item'>
                                <NavLink className='text-primary' href="/counselor-profiles">
                                    Counselor Profiles
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <NavbarText>
                            <a href='/login'>
                                <Button className='button-login bg-primary'>
                                    Login
                                </Button>
                            </a>
                        </NavbarText>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Toolbar