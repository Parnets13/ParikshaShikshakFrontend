import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../Navbar/Navbar.css";
import { CgProfile } from "react-icons/cg";
import { FaRegUserCircle } from "react-icons/fa";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import logo from './../../assets/logo.png';

const Navbarr = () => {
  const Navigate = useNavigate("");
  const user = JSON.parse(localStorage.getItem("user"));

  const logOut = () => {
    swal({
      title: "Yeah!",
      text: "Successfully Logged Out",
      icon: "success",
      button: "Ok!",
    });
    setTimeout(() => {
      window.location.assign("/login");
    }, 5000);
    localStorage.removeItem("user");
  };
  return (
    <div>
      <Navbar expand="lg" className="" style={{ backgroundColor: "#E17D1F" }}>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="" style={{ width: "150px", height:'80px' }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
            <div 
                 className="d-flex align-items-center navItems" 
                 style={{fontSize:"16px",color:"white"}}>
                 <Link style={{color:"white",textDecoration:"none"}} to="/offerquestionpaper"><span>Buy</span></Link> 
                </div> &nbsp;&nbsp;
                <div class="vertical-line"></div>&nbsp;&nbsp;
        
                 <div 
                 className="d-flex align-items-center navItems" 
                 style={{fontSize:"16px",color:"white"}}>
                 <Link style={{color:"white",textDecoration:"none"}} to="/tutorial"><span>Tutorial</span></Link> 
                </div> &nbsp;&nbsp;
                <div class="vertical-line"></div>&nbsp;&nbsp;
              {user ? (
                 <div 
                 className="d-flex align-items-center navItems" 
                 style={{fontSize:"16px",color:"white"}}>
                 <Link style={{color:"white",textDecoration:"none"}} to="/questionandanswerview"><span>Assessment</span></Link> 
                </div>
              ):("")}
             
              <div class="dropdown">
                <span class="dropbtn">
                  <CgProfile color="#fff" />{" "}
                  <span className="fs-6 text-light mt-4">
                    {user?.FirstName} {user?.LastName}
                  </span>
                </span>
                <div class="dropdown-content">
                  <a href="/profile">Profile</a>
                  <a
                    href="/login"
                    onClick={() => {
                      logOut();
                    }}
                  >
                    Logout
                  </a>
                </div>
              </div>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navbarr;
