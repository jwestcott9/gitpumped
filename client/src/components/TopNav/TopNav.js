import React, { Component } from "react";
import API from "../../utils/API";
import "./style.css";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";



export default class Navigation extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            loggedIn: false
        };
    }

    componentDidMount() {
        API.isLoggedIn().then(user => {
            if (user.data.loggedIn) {
                this.setState({
                    loggedIn: true
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    logout() {
        API.logout().then((data)=> {
            window.location.pathname = "/"
        }).catch((err)=> {
            console.log(err)
        })
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    // componentDidMount () {
    //     window.onscroll = () => {
    //         this.setState({ currentScrollHeight: window.scrollY})
    //     };
    // }

    render() {
        return(

            <div>
                <Navbar className="navbar" light expand="md" sticky="top">
                    <NavbarBrand href="/" className="titleFont"><i className="fas fa-dumbbell"></i><strong>GitPumped</strong></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/"><i className="fas fa-home light-text"></i></NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    <i className="fas fa-user light-text"></i>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    {this.state.loggedIn ? (
                                        <>
                                            <DropdownItem>
                                                <NavLink href="/profile">Profile</NavLink>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <NavLink onClick={this.logout}>Logout</NavLink>
                                            </DropdownItem>
                                        </>
                                    ) : (
                                        <>
                                            <DropdownItem>
                                                <NavLink href="/login">login</NavLink>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <NavLink href="/signup">signup</NavLink>
                                            </DropdownItem>
                                        </>
                                    )}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>

        );
    }
    // render() {
    //     const opacity =Math.min(100 / this.state.currentScrollHeight, 1)
    //     return <div style={{opacity}} id="navbar"></div>
    // }
}

