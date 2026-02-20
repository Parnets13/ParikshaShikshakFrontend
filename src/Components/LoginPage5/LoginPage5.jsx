import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "../LoginPage5/LoginPage5.css";
import { Button, FormLabel, Row, Modal, Spinner } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const LoginPage5 = () => {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [questioStatus, setQuestionStatus] = useState("Genrated");
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");  
  console.log('tokeen', token)
  const navigate = useNavigate();
  const [School_Logo, setSchool_Logo] = useState("");
  const [Institute_Name, setInstitute_Name] = useState("");
  const [Subject, setSubject] = useState("");
  const [Test_Date, setTest_Date] = useState("");
  const [Size_ofthe_Question, setSize_ofthe_Question] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [quenCount, setquecount] = useState(1);
  const [Individual, setIndividual] = useState("Individual");

  const [bluePData, setbluePdata] = useState([]);
  
  // Subscription state
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);

  // Check if user has active subscription for this class/exam/subject
  const checkUserSubscription = async () => {
    try {
      const res = await axios.post("http://localhost:8774/api/admin/checkSubscription", {
        userId: user?._id,
        subclassName: state?.Sub_Class,
        examinationName: state?.Exam_Name,
        subjectName: state?.Subject,
      });
      
      console.log("Subscription check response:", res.data);
      
      console.log("Full subscription response:", res.data);
      console.log("hasSubscription field:", res.data.hasSubscription);
      
      if (res.data.hasSubscription === true) {
        setHasActiveSubscription(true);
        setSubscriptionData(res.data);
        console.log("✅ Active subscription found and state set:", res.data);
      } else {
        setHasActiveSubscription(false);
        setSubscriptionData(null);
        console.log("❌ No active subscription:", res.data.message);
      }
    } catch (error) {
      console.log("Subscription check error:", error);
      setHasActiveSubscription(false);
    }
  };

  const generate = async () => {
    try {
      setLoading(true);
      
      // Re-check subscription status before proceeding (to ensure latest state)
      let currentSubscription = null;
      let hasSubscription = false;
      
      try {
        const subCheck = await axios.post("http://localhost:8774/api/admin/checkSubscription", {
          userId: user?._id,
          subclassName: state?.Sub_Class,
          examinationName: state?.Exam_Name,
          subjectName: state?.Subject,
        });
        
        console.log("Generate - Subscription check:", subCheck.data);
        console.log("hasSubscription value:", subCheck.data.hasSubscription);
        
        if (subCheck.data.hasSubscription === true) {
          hasSubscription = true;
          currentSubscription = subCheck.data;
          console.log("Setting hasSubscription to TRUE");
        }
      } catch (subErr) {
        console.log("Subscription check failed:", subErr);
      }
      
      console.log("Final hasSubscription:", hasSubscription);
      console.log("Final currentSubscription:", currentSubscription);

      const config = {
        url: "/teacher/upadeteQuestionPaper",
        baseURL: "http://localhost:8774/api",
        method: "put",
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        data: {
          School_Logo: School_Logo,
          Institute_Name: Institute_Name, 
          Subject: Subject,
          Test_Date: Test_Date,
          Size_ofthe_Question: Size_ofthe_Question,
          id: state?._id,
          authId: user?._id,
          Pay_Id: bluePData[0]?.blueprintId ? bluePData[0]?.blueprintId : "",
          Pay_Amount: hasSubscription ? 0 : (bluePData[0]?.blueprintId ? bluePData[0]?.price * quenCount : ""),
          status: questioStatus,
          Individual: Individual,
          numberOfPaper: quenCount,
        },
      };

      const res = await axios(config);
      
      if (res.status == 200) {
        localStorage.setItem("questionPaperData", JSON.stringify({ ...res.data.success, BlueName: bluePData[0]?.blName }));
        
        // If user has active subscription, skip payment and use paper from subscription
        if (hasSubscription && currentSubscription) {
          try {
            // Deduct paper from subscription
            await axios.post("http://localhost:8774/api/admin/usePaper", {
              userId: user?._id,
              subclassName: state?.Sub_Class,
              examinationName: state?.Exam_Name,
              subjectName: state?.Subject,
            });
            
            swal({
              title: "Success!",
              text: `Question paper generated! You have ${currentSubscription.remainingPapers - 1} papers remaining for ${state?.Exam_Name}.`,
              icon: "success",
              button: "OK",
            }).then(() => {
              navigate("/teacher-cover-page");
            });
          } catch (subError) {
            console.log("Error using subscription paper:", subError);
            swal({
              title: "Error!",
              text: "Failed to use subscription. Please try again.",
              icon: "error",
              button: "OK",
            });
          }
          setLoading(false);
          return;
        }

        // No subscription - proceed with payment
        const paymentAmount = bluePData[0]?.price * quenCount;
        console.log("No subscription - proceeding to payment");
        const paymentConfig = {
          url: "/api/Teacher/addpaymentphonepay",
          method: "post",
          baseURL: "http://localhost:8774/",
          headers: { "content-type": "application/json" },
          data: {
            userId: user?._id, 
            email: user?.Email,
            username: user?.name,
            Mobile: user?.phone || "",
            amount: paymentAmount,
            failedUrl: "/loginpage5",
            successUrl: "/teacher-cover-page"
          },
        };

        let phonePePayment = await axios(paymentConfig);
        if (phonePePayment.status === 200) {
          return window.location.href = phonePePayment.data.url;
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error.response) {
        swal({
          title: "Oops!",
          text: "Payment failed please try again after some time!",
          icon: "error",
          button: "OK!",
        });
      }
    }
  };

  const [subject, setsubject] = useState([]);
  const getSubject = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getAllSujects"
      );
      if (res.status == 200) {
        setsubject(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSubject();
  }, []);

  const upcomingStaus = async () => {
    try {
      const config = {
        url: "/teacher/upadeteQuestionPaper",
        baseURL: "http://localhost:8774/api",
        method: "put",
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        
        data: {
          id: state?._id,
          authId: user?._id,
          status: "Up_Comming",
        },
      };

      let res = await axios(config);
    } catch (error) {
      console.log(error);
    }
  };

  const getBluePrint = async () => {
    try {
      const config = {
        url: "/admin/getBluePrintGetByTeacherRequired",
        baseURL: "http://localhost:8774/api",
        method: "put",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          authId: user?._id,
          board: state?.Board,
          medium: state?.Medium,
          className: state?.Class,
          SubClassName: state?.Sub_Class,
          subjects: state?.Subject,
          ExameName: state?.Exam_Name,
        },
      };

      let res = await axios(config);
      console.log("Blueprint response:", res.data);

      if (res.status == 200) {
        setbluePdata(res.data.success);
        console.log("Blueprint data set:", res.data.success);
      }
    } catch (error) {
      console.log("Blueprint error:", error);
      swal({
        title: "Oops!",
        text: error.response?.data?.error || "Blueprint not found",
        icon: "error",
        button: "OK!",
      });
    }
    upcomingStaus();
  };

  useEffect(() => {
    if (token && state) {
      getBluePrint();
      checkUserSubscription();
    }
  }, [token, state]);

  return (
    <div>
      <div className="container p-3">
        <div>
          <div className="loginpage5">
            <div className="row">
              <div className="col-md-12 yoihjij ">
                <Form className="pe-2 pt-3">
                  <Form.Group controlId="formFile" className="mb-2">
                    <div style={{ textAlign: "center" }}>
                      <h5>-: School Details :-</h5>
                    </div>
                    {state?.userType == "Teacher" ? (
                      <>
                        <Row>
                          <div className="col-12 mb-2 d-flex justify-content-between align-items-center">
                            <Form.Label
                              className="fs-6 fw-bold mt-2 "
                              style={{ letterSpacing: "0.5px" }}
                            >
                              School Logo :
                            </Form.Label>
                            <div className="">
                              <img
                                style={{
                                  width: "142px",
                                  height: "139px",
                                  borderRadius: "50%",
                                }}
                                src={`${state?.School_Logo}`}
                                alt="school logo"
                              />
                            </div>
                          </div>
                        </Row>

                        <Row>
                          <div className="col-12 mb-2 d-flex justify-content-between align-items-center">
                            <Form.Label
                              className="fs-6 fw-bold mt-2 "
                              style={{ letterSpacing: "0.5px" }}
                            >
                              Institute_Name :
                            </Form.Label>

                            <div>
                              <h6>
                                {state?.Institute_Name} {state?.SchoolAddress}
                              </h6>
                            </div>
                          </div>
                        </Row>
                      </>
                    ) : (
                      <></>
                    )}

                    <Row>
                      <div className="col-12 mb-2 d-flex justify-content-between align-items-end">
                        <Form.Label
                          className="fs-6 fw-bold mt-2 "
                          style={{ letterSpacing: "0.5px" }}
                        >
                          Board :
                        </Form.Label>

                        <div>
                          <h6>{state?.Board}</h6>
                        </div>
                      </div>
                    </Row>
                    <Row>
                      <div className="col-12 mb-2 d-flex justify-content-between align-items-center">
                        <Form.Label
                          className="fs-6 fw-bold mt-2 "
                          style={{ letterSpacing: "0.5px" }}
                        >
                          Medium :
                        </Form.Label>

                        <div>
                          <h6>{state?.Medium}</h6>
                        </div>
                      </div>
                    </Row>
                    <Row>
                      <div className="col-12 mb-2 d-flex justify-content-between align-items-center">
                        <Form.Label
                          className="fs-6 fw-bold mt-2 "
                          style={{ letterSpacing: "0.5px" }}
                        >
                          Subject :
                        </Form.Label>

                        <div>
                          <h6>{state?.Subject}</h6>
                        </div>
                      </div>
                    </Row>
                    <Row>
                      <div className="col-12 mb-2 d-flex justify-content-between align-items-center">
                        <Form.Label
                          className="fs-6 fw-bold mt-2 "
                          style={{ letterSpacing: "0.5px" }}
                        >
                          Exam Name :
                        </Form.Label>

                        <div>
                          <h6>{state?.Exam_Name}</h6>
                        </div>
                      </div>
                    </Row>
                    <Row>
                      <div className="col-12 mb-2 d-flex justify-content-between align-items-center">
                        <Form.Label
                          className="fs-6 fw-bold mt-2 "
                          style={{ letterSpacing: "0.5px" }}
                        >
                          Exam Date :
                        </Form.Label>

                        <div>
                          <h6>{state?.Test_Date}</h6>
                        </div>
                      </div>
                    </Row>
                    <Row>
                      <div className="col-12 mb-2 d-flex justify-content-between align-items-center">
                        <Form.Label
                          className="fs-6 fw-bold mt-2 "
                          style={{ letterSpacing: "0.5px" }}
                        >
                          Exam Time :
                        </Form.Label>

                        <div>
                          <h6>{state?.ExamTime}</h6>
                        </div>
                      </div>
                    </Row>
                    <Row>
                      <div className="col-12 mb-2 d-flex justify-content-between align-items-center">
                        <Form.Label
                          className="fs-6 fw-bold mt-2 "
                          style={{ letterSpacing: "0.5px" }}
                        >
                          Paper Size :
                        </Form.Label>

                        <div>
                          <h6>{state?.Size_ofthe_Question}</h6>
                        </div>
                      </div>
                    </Row>
                    {state?.userType == "Teacher" ? (
                      <Row>
                        <div style={{ textAlign: "left", padding: "0px 12px" }}>
                          <div className="col-8 mb-4">
                            <input
                              type="radio"
                              name="fav_language"
                              checked={Individual == "Individual"}
                              onClick={() => {
                                setquecount(1);
                                setIndividual("Individual");
                              }}
                            />{" "}
                            &nbsp;
                            <Button
                              style={{
                                backgroundColor: "#ff5200",
                                border: "none",
                              }}
                              onClick={() => {
                                setquecount(1);
                                setIndividual("Individual");
                              }}
                            >
                              Individual
                            </Button>
                          </div>
                          <div className="col-12 mb-4">
                            <input
                              type="radio"
                              name="fav_language"
                              checked={Individual == "No.of Student"}
                              onClick={() => setIndividual("No.of Student")}
                            />{" "}
                            &nbsp;
                            <Button
                              variant="success"
                              style={{ backgroundColor: "green" }}
                              onClick={() => setIndividual("No.of Student")}
                            >
                              No.of Student
                            </Button>
                            {Individual == "No.of Student" ? (
                              <div style={{ float: "right", width: "100px" }}>
                                <input
                                  type="number"
                                  className="vi_0"
                                  min={1}
                                  value={quenCount}
                                  onChange={(e) => setquecount(e.target.value)}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </Row>
                    ) : (
                      <></>
                    )}

                    {/* Subscription Info */}
                    {hasActiveSubscription && subscriptionData && (
                      <Row>
                        <div className="col-12 mb-3">
                          <div style={{
                            background: "linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)",
                            border: "1px solid #28a745",
                            borderRadius: "10px",
                            padding: "15px",
                            textAlign: "center"
                          }}>
                            <p style={{ margin: 0, color: "#155724", fontWeight: "600" }}>
                              ✅ Active Subscription: {subscriptionData.subscriptionName}
                            </p>
                            <p style={{ margin: "5px 0 0", color: "#155724", fontSize: "14px" }}>
                              {subscriptionData.remainingPapers} papers remaining for {subscriptionData.examinationName}
                            </p>
                          </div>
                        </div>
                      </Row>
                    )}

                    {bluePData.length == 0 ? (
                      <></>
                    ) : !hasActiveSubscription ? (
                      <Row>
                        <div className="col-12 mb-2 d-flex justify-content-around align-items-center">
                          <Form.Label
                            className="fs-6 fw-bold mt-2 "
                            style={{ letterSpacing: "0.5px" }}
                          >
                            Price :
                          </Form.Label>

                          <div>
                            <h6>
                              ₹{(bluePData[0]?.price * quenCount)?.toFixed(2)}
                            </h6>
                          </div>
                        </div>
                      </Row>
                    ) : null}
                  </Form.Group>

                  <div className="d-flex justify-content-center">
                    <Button
                      variant="secondary"
                      style={{
                        background: "gray",
                        margin: "20px",
                      }}
                      onClick={() => {
                        navigate(-1);
                      }}
                    >
                      Edit
                    </Button>
                    {bluePData.length == 0 ? (
                      <></>
                    ) : (
                      <Button
                        style={{
                          background: hasActiveSubscription ? "#28a745" : "green",
                          margin: "20px",
                        }}
                        onClick={() => generate()}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Spinner size="sm" /> Processing...
                          </>
                        ) : hasActiveSubscription ? (
                          "Generate (Free)"
                        ) : (
                          "Pay Now"
                        )}
                      </Button>
                    )}
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage5;
