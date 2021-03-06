import React, { Component, Fragment } from "react";
import "../App.css";
import logo from "../images/munchy_logo.png";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../actions/authAction";
import { register } from "../actions/authAction";
import { clearErrors } from "../actions/errorActions";
import Logout from "./Logout";
import {} from "@fortawesome/free-solid-svg-icons";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from 'react-router-dom'
// import "bootstrap/dist/css/bootstrap.min.css";

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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  DropdownItem,
} from "reactstrap";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      navCollapsed: true,
      showNavbar: false,
      modal: false,
      className: "navbar-header center",
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
    this.updateClass();
  }
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { navCollapsed } = this.state;
    const AuthNav = (
      <Fragment>
        <NavItem>
          <span>{/* { user ? `Welcome ${user.firstName}` : '' } */}</span>
        </NavItem>
      </Fragment>
    );
    return (
      <div className="bottomBorder" data-testid="upper">
        <Navbar className="header" data-testid="upper2" dark expand="sm">
          <a href="/">
            <img className="logo" src={logo} alt="" />
          </a>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} data-testid="upper3" navbar>
            {isAuthenticated ? (
              <Nav className="ml-auto" navbar>

              
              <NavItem className="nav-list">
              <Link to="/dashboard">
              <NavLink href="/dashboard">Dashboard</NavLink>
              </Link>
            </NavItem>
            <NavItem className="nav-list">
            <Link to="/recipes">
              <NavLink href="/recipes">My recipes</NavLink>
              </Link>
            </NavItem>

                

                <NavItem>
                  <UncontrolledDropdown data-testid="navbar" nav inNavbar>
                    <DropdownToggle nav caret>
                      <FontAwesomeIcon icon={faUserAlt} /> My Account
                    </DropdownToggle>

                    <DropdownMenu
                      className="account_nav"
                      data-testid="drop"
                      right
                    >
                      {/*<DropdownItem className ="account_nav">
                        {AuthNav}
                      </DropdownItem>
                    <DropdownItem divider />*/}
                

                      <DropdownItem
                        className="account_nav"
                        data-testid="nav-link"
                      >
                        <Logout />
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </NavItem>

               { /*<NavItem className="nav-list">
                <NavLink href="/dashboard">Dashboard</NavLink>
                  </NavItem>*/}
              </Nav>
            ) : (
              <div className="header">
                <Nav className={this.state.className} navbar>
                  <NavItem className="nav-list">
                    <NavLink href="/">Home</NavLink>
                  </NavItem>

                  

                  <NavItem className="nav-list">
                    <NavLink href="/login">Sign in</NavLink>
                  </NavItem>

                  <NavItem className="nav-list">
                    <NavLink href="/signup">Sign up</NavLink>
                  </NavItem>
                </Nav>
              </div>
            )}
          </Collapse>
        </Navbar>
      </div>
    );
  }

  updateClass() {
    let className = this.state.className;
    let splitClassName = className.split(" ");
    if (splitClassName.length > 1) {
      className = "navbar-header";
    } else {
      className = "navbar-header center";
    }
    this.setState({ className });
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAthenticated,
  error: state.error,
  auth: state.auth,
});

export default connect(mapStateToProps, { login, register, clearErrors })(
  Header
);
