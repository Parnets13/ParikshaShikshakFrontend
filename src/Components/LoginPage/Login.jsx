import React, { useState } from "react";
import { Button, InputGroup, Modal, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
// import "../LoginPage3/LoginPage3.css";
import { FaEyeSlash, FaPhoneAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../../assets/logo.png";
import Button1 from "../Button1";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaRegBuilding } from "react-icons/fa";
// import { MdEmail } from "react-icons/md";
// import { IoLocationSharp } from "react-icons/io5";
// import Button from "../Button";
const Login = () => {
  const navigate = useNavigate("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  //post
  const [Mobile, setMobile] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const TeacherLogin = async () => {
    try {
      if (!Email)
        return swal({
          title: "oops!",
          text: "Please Enter the Email ID",
          icon: "error",
          button: "Ok!",
        });
      if (!Password)
        return swal({
          title: "oops!",
          text: "Please Enter Password",
          icon: "error",
          button: "Ok!",
        });
      const config = {
        url: "/admin/loginTeacher",
        method: "post",
        baseURL: "http://localhost:8774/api",
        headers: {
          "Content-type": "application/json",
          // Authorization:`Bearer ${token}`,
        },
        data: {
          Mobile: Mobile,
          Email: Email,
          Password: Password,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        swal({
          title: "Yeah!!",
          text: "Successfully Logged In",
          icon: "success",
          button: "OK!",
        });
        localStorage.setItem("user", JSON.stringify(res.data.success));
        localStorage.setItem("token", res.data.token);
        setTimeout(() => {
          return navigate("/examboard");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      return swal({
        title: "oops",
        text: error.response.data.error,
        icon: "error",
        button: "Try Again",
      });
    }
  };

  const [PasswordShow1, setPasswordShow1] = useState(false);
  const [PasswordShow, setPasswordShow] = useState(false);
  const [confirmpasswordshow, setconfirmpasswordshow] = useState("");

  const [Optmail, setOptmail] = useState("");
  const SendOtp = async () => {
    if (!Optmail) {
      handleClose();
    }
    if (!Optmail) {
      return swal({
        title: "Yeah!!",
        text: "Please enter Exist mail id",
        icon: "error",
        button: "OK!",
      });
    }
    try {
      const config = {
        url: "/otp/sendOtpRegisterEmail",
        method: "post",
        baseURL: "http://localhost:8774/api",
        headers: { "content-type": "application/json" },
        data: {
          email: Optmail,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        handleClose();
        swal({
          title: "Yeah!!",
          text: res.data.success,
          icon: "success",
          button: "OK",
        }).then(() => {
          // This block executes after the user clicks the "OK" button
          handleShow1();
        });
      }
    } catch (error) {
      handleClose();
      swal({
        title: "Error!!",
        text: error.response.data.error,
        icon: "error",
        button: "OK!",
      });
    }
  };

  const [OTPSubmit, setOTPSubmit] = useState("");
  const OtmSubmit = async () => {
    try {
      const config = {
        url: "/otp/verifyEmail",
        method: "post",
        baseURL: "http://localhost:8774/api",
        headers: { "content-type": "application/json" },
        data: {
          email: Optmail,
          otp: OTPSubmit,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        handleClose1();
        swal({
          title: "Yeah!!",
          text: res.data.success,
          icon: "success",
          button: "OK",
        }).then(() => {
          handleShow2();
        });
      }
    } catch (error) {
      handleClose1();
      swal({
        title: "Error!!",
        text: error.response.data.error,
        icon: "error",
        button: "OK!",
      });
    }
  };
  const [CPassword, setCPassword] = useState("");
  const UpdatePassword = async () => {
    if (Password !== CPassword) {
      return alert("Password is not mathch");
    }
    try {
      const config = {
        url: "/admin/updatepassword",
        method: "put",
        baseURL: "http://localhost:8774/api",
        headers: { "content-type": "application/json" },
        data: {
          Email: Optmail,
          Password: Password,
          CPassword: CPassword,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        handleClose2();
        swal({
          title: "Yeah!!",
          text: res.data.success,
          icon: "success",
          button: "OK",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="box-lg">
      <div className="container p-3">
        <div>
          <div className="box">
            <div className="row">
              <div className="col-md-6">
                <div
                  className="bg-img "
                  // style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <div className="line-1">
                    <h2 className="alfa-slab " style={{ color: "#5140EB" }}>
                      Welcome To,
                    </h2>
                    <img src={logo} alt=" " className="w-50" />

                    <h3
                      className=" space-mono-regular fw-normal text-light"
                      style={{ textAlign: "center", fontSize: "14px" }}
                    >
                      If you are a New User Please Register Here
                    </h3>
                    <div className="d-flex justify-content-center">
                      <a href="/signup" style={{ textDecoration: "none" }}>
                        <Button1 text={"Register"} />
                      </a>
                    </div>

                    <div
                      className="border border-white mt-5 contact-width p-3 login-contact contact-info2"
                      style={{
                        backdropFilter: "blur(10px)",
                        maxWidth: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <h2 style={{ fontSize: "16px" }} className="text-light">
                        Contact Information
                      </h2>

                      {/* Company */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "14px",
                          gap: "4px",
                        }}
                      >
                        {/* You can swap FaRegBuilding with any icon you prefer */}
                        <FaRegBuilding className="text-light" />
                        <b className="text-light">Company:</b>
                        <span
                          style={{ marginLeft: "5px", fontSize: "14px" }}
                          className="text-light"
                        >
                          Arivu Bodhi<br/> Shikshak Talent LLP
                        </span>
                      </div>

                      {/* Email */} 
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "14px",
                          gap: "4px",
                        }}
                      >
                        <MdEmail className="text-light" />
                        <b className="text-light">Email:</b>
                        <span
                          style={{ marginLeft: "5px", fontSize: "14px" }}
                          className="text-light"
                        >
                          ganesh.m@shikshakworld.com
                        </span>
                      </div>

                      {/* Phone */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "14px",
                          gap: "4px",
                        }}
                      >
                        <FaPhoneAlt className="text-light mr-2" />
                        <b className="text-light">Phone:</b>
                        <span
                          style={{ marginLeft: "5px", fontSize: "14px" }}
                          className="text-light"
                        >
                          +91 73378 75208
                        </span>
                      </div>

                      {/* Address */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "14px",
                        }}
                      >
                        <IoLocationSharp className="mt-1 text-light" />
                        <b className="text-light">Address:</b>
                        <div
                          style={{ marginLeft: "5px", fontSize: "14px" }}
                          className="text-light"
                        >
                          1138, 1st Floor, 20th Main Road,
                        </div>
                      </div>
                      <div
                        style={{ marginLeft: "5px", fontSize: "14px" }}
                        className="text-light"
                      >
                        53rd Cross 7th Block, Rajajinagar,
                      </div>
                      <div
                        style={{ marginLeft: "5px", fontSize: "14px" }}
                        className="text-light"
                      >
                        Bengaluru – 560010
                      </div>
                    </div>

                    {/* <div
                      className="border border-white mt-5 contact-width p-3"
                      style={{ backdropFilter: "blur(10px)", maxWidth: "100%" }}
                    >
                      <h2 style={{ fontSize: "20px" }} className="text-light">
                        Contact Information
                      </h2>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "start",
                          fontSize: "16px",
                        }}
                      >
                        <FaPhoneAlt className="text-white mr-2" />
                        <b className="text-light">Phone:</b>
                        <span
                          style={{ marginLeft: "5px" }}
                          className="text-white"
                        >
                          +91 73378 75208
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "start",
                          fontSize: "16px",
                        }}
                      >
                        <MdEmail className="text-white" />
                        <b className="text-light">Email:</b>
                        <span
                          style={{ marginLeft: "5px" }}
                          className="text-white"
                        >
                          ganesh.m@shikshakworld.com
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "start",
                          flexWrap: "wrap",
                          fontSize: "16px",
                        }}
                      >
                        <IoLocationSharp className="mt-1 text-white" />
                        <b className="text-light">Address:</b>
                        <div
                          style={{
                            marginLeft: "5px",
                            // wordWrap: "break-word",
                            maxWidth: "100%",
                          }}
                          className="text-light"
                        >
                          1138, 1st Floor, 20th Main Road, 53rd Cross 7th Block,
                          Rajajinagar, Bengaluru - 560010
                        </div>
                      </div>
                    </div> */}

                    {/* <div
                      className="border border-white mt-5 contact-width p-3 login-contact"
                      style={{
                        backdropFilter: "blur(10px)",
                        maxWidth: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        // marginLeft: "35px",
                      }}
                    >
                      <h2 style={{ fontSize: "20px" }} className="text-light">
                        Contact Information
                      </h2>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "start",
                          fontSize: "16px",
                          gap: "4px",
                        }}
                      >
                        <FaPhoneAlt className="text-white mr-2" />
                        <b className="text-light">Phone:</b>
                        <span
                          style={{ marginLeft: "5px" }}
                          className="text-white"
                        >
                          +91 73378 75208
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "16px",
                          gap: "4px",
                        }}
                      >
                        <MdEmail className="text-white" />
                        <b className="text-light">Email:</b>
                        <span
                          style={{ marginLeft: "5px" }}
                          className="text-white"
                        >
                          ganesh.m@shikshakworld.com
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "16px",
                        }}
                      >
                        <IoLocationSharp className="mt-1 text-white" />
                        <b className="text-light">Address:</b>
                        <div
                          style={{
                            marginLeft: "5px",
                          }}
                          className="text-light"
                        >
                          1138, 1st Floor, 20th Main Road,
                        </div>
                      </div>
                      <div
                        style={{
                          marginLeft: "5px",
                          fontSize: "16px",
                        }}
                        className="text-light"
                      >
                        53rd Cross 7th Block, Rajajinagar,
                      </div>
                      <div
                        style={{
                          marginLeft: "5px",
                          fontSize: "16px",
                        }}
                        className="text-light"
                      >
                        Bengaluru - 560010
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="page2-content-display">
                  <h4
                    style={{ textAlign: "center" }}
                    className="space-mono-bolder"
                  >
                    Sign In
                  </h4>
                  <hr></hr>

                  <Row>
                    <div className="col-10 mb-2">
                      <Form.Label className="lato-regular">Email Id</Form.Label>
                      <InputGroup className="mb-2">
                        <Form.Control
                          className="login-input"
                          type="email"
                          placeholder="Enter email or mobile number"
                          aria-label="email"
                          aria-describedby="basic-addon1"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </InputGroup>
                    </div>
                  </Row>
                  <Row>
                    <div className="col-10 mb-2">
                      <Form.Group
                        className="mb-2"
                        controlId="formGroupPassword"
                      >
                        <Form.Label className="lato-regular">
                          Password
                        </Form.Label>
                        <InputGroup className="col-lg-3 mb-2">
                          <Form.Control
                            type={PasswordShow ? "text" : "password"}
                            className="login-input"
                            placeholder="Password"
                            aria-describedby="basic-addon1"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          {PasswordShow ? (
                            <button
                              onClick={() => setPasswordShow(!PasswordShow)}
                              className="passbtn"
                            >
                              <FaEye style={{ color: "white" }} />
                            </button>
                          ) : (
                            <button
                              onClick={() => setPasswordShow(!PasswordShow)}
                              className="passbtn"
                            >
                              <FaEyeSlash style={{ color: "white" }} />
                            </button>
                          )}
                        </InputGroup>
                      </Form.Group>
                    </div>
                  </Row>
                  <div>
                    <h6
                      style={{
                        display: "flex",
                        padding: "0 4px",
                        cursor: "pointer",
                      }}
                      onClick={handleShow}
                    >
                      Forgot Password?
                    </h6>
                  </div>
                  <Row>
                    <div
                      style={{
                        float: "right",
                        display: "flex",
                        justifyContent: "center",
                        padding: "0px 100px",
                      }}
                    >
                      {/* <a
                      href="/examboard"
                      style={{
                        
                        textDecoration:"none",
                        color:"white"
                      }}
                    > */}
                      {/* <Button
                        variant=""
                        style={{ backgroundColor: "green", color: "white" }}
                        onClick={() => {
                          TeacherLogin();
                        }}
                      >
                        Log in
                      </Button> */}
                      <a
                        onClick={() => {
                          TeacherLogin();
                        }}
                      >
                        <Button1 text={"Log In"} />
                      </a>
                      {/* </a> */}
                    </div>
                    {/* <div className="d-flex align-items-center">
                      <p style={{ fontSize: "12px" }}>Any Query.. </p>{" "}
                      &nbsp;&nbsp;
                      <Link
                        to="/contactus"
                        style={{ fontSize: "12px" }}
                        className="mb-3"
                      >
                        click here
                      </Link>
                    </div> */}
                  </Row>
                </div>
                <br />
              </div>

              <div
                className="border border-white mt-5 contact-width p-3 login-contact  contact-info"
                style={{
                  backdropFilter: "blur(10px)",
                  maxWidth: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h2 style={{ fontSize: "16px" }} className="text-dark">
                  Contact Information
                </h2>

                {/* Company */}
                {/* <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "14px",
                    gap: "4px",
                  }}
                >
            
                  <FaRegBuilding className="text-dark" />
                  <b className="text-dark">Company:</b>
                  <span
                    style={{ marginLeft: "5px", fontSize: "14px" }}
                    className="text-dark"
                  >
                    Arivu Bodhi Shikshak Talent LLP
                  </span>
                </div> */} 
                {/* Company */}
<div
  style={{
    display: "flex",
    alignItems: "flex-start",
    fontSize: "14px",
    gap: "4px",
  }}
>
  <FaRegBuilding className="text-dark" />
  <b className="text-dark">Company:</b>
  <div style={{ marginLeft: "5px", fontSize: "14px" }} className="text-dark">
    <span style={{ display: "block" }}>Arivu Bodhi Shikshak</span>
    <span style={{ display: "block" }}>Talent LLP</span>
  </div>
</div>

                {/* Email */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "14px",
                    gap: "4px",
                  }}
                >
                  <MdEmail className="text-dark" />
                  <b className="text-dark">Email:</b>
                  <span
                    style={{ marginLeft: "5px", fontSize: "14px" }}
                    className="text-dark"
                  >
                    ganesh.m@shikshakworld.com
                  </span>
                </div>

                {/* Phone */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "14px",
                    gap: "4px",
                  }}
                >
                  <FaPhoneAlt className="text-dark mr-2" />
                  <b className="text-dark">Phone:</b>
                  <span
                    style={{ marginLeft: "5px", fontSize: "14px" }}
                    className="text-dark"
                  >
                    +91 73378 75208
                  </span>
                </div>

                {/* Address */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "14px",
                  }}
                >
                  <IoLocationSharp className="mt-1 text-dark" />
                  <b className="text-dark">Address:</b>
                  <div
                    style={{ marginLeft: "5px", fontSize: "14px" }}
                    className="text-dark"
                  >
                    1138, 1st Floor, 20th Main Road,
                  </div>
                </div>
                <div
                  style={{ marginLeft: "5px", fontSize: "14px" }}
                  className="text-dark"
                >
                  53rd Cross 7th Block, Rajajinagar,
                </div>
                <div
                  style={{ marginLeft: "5px", fontSize: "14px" }}
                  className="text-dark"
                >
                  Bengaluru – 560010
                </div>
              </div>
              
            </div>
          </div>
        </div>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "9999999" }}
        >
          <Modal.Header>
            <Modal.Title>Forgot Password </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label style={{ display: "flex", padding: "0 4px" }}>
                  Email Id
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email Id"
                  onChange={(e) => setOptmail(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant=""
              style={{
                backgroundColor: "navy",
                border: "1px solid navy",
                color: "white",
              }}
              onClick={SendOtp}
            >
              Send
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={show1}
          onHide={handleClose1}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "9999999", borderRadius: "none" }}
        >
          <Modal.Header
            style={{ backgroundColor: "navy", borderRadius: "unset" }}
          >
            <Modal.Title style={{ color: "white" }}> Enter OTP</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Control
                  type="text"
                  placeholder="Enter OTP"
                  onChange={(e) => setOTPSubmit(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              style={{
                backgroundColor: "green",
                border: "1px solid green",
                color: "white",
              }}
              onClick={OtmSubmit}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={show2}
          onHide={handleClose2}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "9999999", borderRadius: "none" }}
        >
          <Modal.Header
            style={{ backgroundColor: "navy", borderRadius: "unset" }}
          >
            <Modal.Title style={{ color: "white" }}>
              Update Password
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-2" controlId="formGroupPassword">
                <Form.Label>
                  Password<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <InputGroup className="col-lg-3 mb-2">
                  <Form.Control
                    type={PasswordShow ? "text" : "password"}
                    className="login-input"
                    placeholder="Password"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {PasswordShow ? (
                    <button
                      onClick={() => setPasswordShow(!PasswordShow)}
                      className="passbtn"
                    >
                      <FaEye style={{ color: "white" }} />
                    </button>
                  ) : (
                    <button
                      onClick={() => setPasswordShow(!PasswordShow)}
                      className="passbtn"
                    >
                      <FaEyeSlash style={{ color: "white" }} />
                    </button>
                  )}
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-2" controlId="formGroupPassword">
                <Form.Label>
                  Confirm Password<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <InputGroup className="col-lg-3 mb-2">
                  <Form.Control
                    type={PasswordShow1 ? "text" : "password"}
                    className="login-input"
                    placeholder="Password"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setCPassword(e.target.value)}
                  />
                  {PasswordShow1 ? (
                    <button
                      onClick={() => setPasswordShow1(!PasswordShow1)}
                      className="passbtn"
                    >
                      <FaEye style={{ color: "white" }} />
                    </button>
                  ) : (
                    <button
                      onClick={() => setPasswordShow1(!PasswordShow1)}
                      className="passbtn"
                    >
                      <FaEyeSlash style={{ color: "white" }} />
                    </button>
                  )}
                </InputGroup>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              style={{
                backgroundColor: "green",
                border: "1px solid green",
                color: "white",
              }}
              onClick={UpdatePassword}
            >
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Login;
