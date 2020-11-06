import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./style.css";

export default function NavBar(props) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>Employee Directory</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>
        {props.children}
      </Navbar.Collapse>
    </Navbar>
  );
}
