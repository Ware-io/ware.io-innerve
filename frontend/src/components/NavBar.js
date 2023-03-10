import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LOGO from "../wareIo.png"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom"
import {LinkContainer} from 'react-router-bootstrap'


export default function NavBar () {
    return(
        <>
            <Navbar style={{ position : "absolute", top : "0", width : "100%" }} collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
      <Navbar.Brand as={Link} to="/">
            <img
              alt=""
              src={LOGO}
              width="35"
              height="35"
              className="d-inline-block align-top"
            />{' '}
            WARE.IO
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/add">Add Packages</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/iadd">Instant Add</Nav.Link>
            <Nav.Link eventKey={2} as={Link} to="/map">
              Warehouse Map
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </>
    )
}