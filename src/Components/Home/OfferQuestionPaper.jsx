import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Button, Badge } from "react-bootstrap";
import axios from "axios";
import { FaCheckCircle, FaBook, FaRupeeSign, FaCrown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function OfferQuestionPaper() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const getActiveSubscriptions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:8774/api/admin/getActiveSubscriptions"
      );
      if (res.status === 200) {
        const validSubs = (res.data.success || []).filter(
          (sub) => sub && sub._id && sub.subscriptionName && sub.price
        );
        setSubscriptions(validSubs);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Get user's purchased subscriptions
  const getUserSubscriptions = async () => {
    if (!user?._id) return;
    try {
      const res = await axios.get(
        `http://localhost:8774/api/admin/getUserSubscriptions/${user._id}`
      );
      if (res.status === 200) {
        setUserSubscriptions(res.data.success || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getActiveSubscriptions();
    getUserSubscriptions();
  }, []);

  // Check if user already has this subscription
  const isAlreadyPurchased = (subscriptionId) => {
    return userSubscriptions.some(
      (us) => us.subscriptionId?._id === subscriptionId || us.subscriptionId === subscriptionId
    );
  };

  const handleBuyNow = async (subscription) => {
    if (!user || !token) {
      swal({
        title: "Login Required",
        text: "Please login to purchase a subscription",
        icon: "warning",
        buttons: ["Cancel", "Login"],
      }).then((willLogin) => {
        if (willLogin) {
          navigate("/login", { state: { returnUrl: "/offerquestionpaper" } });
        }
      });
      return;
    }

    if (isAlreadyPurchased(subscription._id)) {
      swal({
        title: "Already Purchased",
        text: "You already have this subscription active!",
        icon: "info",
        button: "OK",
      });
      return;
    }

    try {
      setProcessingId(subscription._id);

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
          amount: subscription.price,
          subscriptionId: subscription._id,
          subscriptionName: subscription.subscriptionName,
          failedUrl: "/offerquestionpaper",
          successUrl: "/offerquestionpaper",
        },
      };

      localStorage.setItem("pendingSubscription", JSON.stringify(subscription));

      const phonePePayment = await axios(paymentConfig);
      if (phonePePayment.status === 200 && phonePePayment.data.url) {
        window.location.href = phonePePayment.data.url;
      } else {
        throw new Error("Payment URL not received");
      }
    } catch (error) {
      console.log(error);
      swal({
        title: "Oops!",
        text:
          error.response?.data?.error ||
          "Payment failed. Please try again later!",
        icon: "error",
        button: "OK",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const getTotalPapers = (examinations) => {
    if (!examinations || examinations.length === 0) return 0;
    return examinations.reduce(
      (sum, exam) => sum + (exam.questionPapers || 0),
      0
    );
  };

  const cardColors = [
    { gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", light: "#f0e6ff" },
    { gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", light: "#ffe6ec" },
    { gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", light: "#e6f7ff" },
    { gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", light: "#e6fff5" },
    { gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", light: "#fff5e6" },
    { gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)", light: "#fff0f5" },
  ];

  return (
    <div style={{ background: "linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)", minHeight: "100vh", paddingBottom: "50px" }}>
      <Container>
        {/* User's Active Subscriptions */}
        {userSubscriptions.length > 0 && (
          <div className="pt-5 pb-3">
            <h4 className="text-center mb-4" style={{ color: "#28a745" }}>
              <FaCrown className="me-2" /> Your Active Subscriptions
            </h4>
            <Row className="justify-content-center mb-4">
              {userSubscriptions.map((us, idx) => (
                <Col key={us._id} sm={12} md={6} lg={4} className="mb-3">
                  <div
                    style={{
                      background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
                      borderRadius: "15px",
                      padding: "20px",
                      color: "#fff",
                    }}
                  >
                    <h5 style={{ fontWeight: "700" }}>{us.subscriptionName}</h5>
                    <p style={{ fontSize: "14px", opacity: 0.9, marginBottom: "10px" }}>
                      📚 {us.subclassName}
                    </p>
                    <div>
                      {us.examinations?.map((exam, i) => (
                        <div key={i} className="d-flex justify-content-between align-items-center mb-1">
                          <span style={{ fontSize: "13px" }}>{exam.examinationName}</span>
                          <Badge bg="light" text="dark">
                            {exam.totalPapers - exam.usedPapers}/{exam.totalPapers} left
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <p style={{ fontSize: "12px", marginTop: "10px", opacity: 0.8 }}>
                      Expires: {new Date(us.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                </Col>
              ))}
            </Row>
            <hr />
          </div>
        )}

        {/* Available Plans */}
        <div className={userSubscriptions.length > 0 ? "pb-4" : "pt-5 pb-4"}>
          <h2 className="text-center mb-2" style={{ fontWeight: "700", color: "#2c3e50" }}>
            {userSubscriptions.length > 0 ? "Get More Plans" : "Choose Your Plan"}
          </h2>
          <p className="text-center text-muted mb-5">
            Select the perfect subscription plan for your exam preparation
          </p>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3 text-muted">Loading subscription plans...</p>
            </div>
          ) : subscriptions.length === 0 ? (
            <div className="text-center py-5">
              <FaBook size={50} color="#ccc" />
              <p className="mt-3 text-muted">No subscription plans available.</p>
            </div>
          ) : (
            <Row className="justify-content-center">
              {subscriptions.map((sub, index) => {
                const colorScheme = cardColors[index % cardColors.length];
                const totalPapers = getTotalPapers(sub.examinations);
                const purchased = isAlreadyPurchased(sub._id);

                return (
                  <Col key={sub._id} sm={12} md={6} lg={4} className="mb-4">
                    <div
                      style={{
                        background: "#fff",
                        borderRadius: "20px",
                        overflow: "hidden",
                        boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        cursor: "pointer",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-10px)";
                        e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.1)";
                      }}
                    >
                      {purchased && (
                        <div
                          style={{
                            position: "absolute",
                            top: "15px",
                            right: "15px",
                            background: "#28a745",
                            color: "#fff",
                            padding: "5px 12px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: "600",
                            zIndex: 1,
                          }}
                        >
                          ✓ Purchased
                        </div>
                      )}

                      <div
                        style={{
                          background: colorScheme.gradient,
                          padding: "30px 20px",
                          textAlign: "center",
                          color: "#fff",
                        }}
                      >
                        <h4 style={{ fontWeight: "700", marginBottom: "15px", fontSize: "1.4rem" }}>
                          {sub.subscriptionName}
                        </h4>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <FaRupeeSign size={28} />
                          <span style={{ fontSize: "3rem", fontWeight: "800", lineHeight: 1 }}>
                            {sub.price}
                          </span>
                        </div>
                        <p style={{ marginTop: "10px", opacity: 0.9, fontSize: "14px" }}>
                          {totalPapers} Question Papers Included
                        </p>
                      </div>

                      <div style={{ padding: "25px 20px", flex: 1 }}>
                        <div
                          style={{
                            background: colorScheme.light,
                            padding: "12px 15px",
                            borderRadius: "10px",
                            marginBottom: "20px",
                            textAlign: "center",
                          }}
                        >
                          <span style={{ fontWeight: "600", color: "#555" }}>
                            📚 {sub.subclassName}
                          </span>
                        </div>

                        <div>
                          <p style={{ fontWeight: "600", color: "#333", marginBottom: "12px" }}>
                            What's Included:
                          </p>
                          {sub.examinations?.map((exam, idx) => (
                            <div
                              key={idx}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "10px 0",
                                borderBottom: idx < sub.examinations.length - 1 ? "1px solid #eee" : "none",
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <FaCheckCircle color="#28a745" size={16} />
                                <span style={{ color: "#555", fontSize: "14px" }}>
                                  {exam.examinationName}
                                  {exam.subjectName && (
                                    <span style={{ color: "#888", fontSize: "12px" }}>
                                      {" "}({exam.subjectName})
                                    </span>
                                  )}
                                </span>
                              </div>
                              <span
                                style={{
                                  background: "#e8f5e9",
                                  color: "#2e7d32",
                                  padding: "4px 10px",
                                  borderRadius: "15px",
                                  fontSize: "12px",
                                  fontWeight: "600",
                                }}
                              >
                                {exam.questionPapers} Papers
                              </span>
                            </div>
                          ))}
                        </div>

                        {sub.description && (
                          <p style={{ marginTop: "15px", color: "#777", fontSize: "13px", fontStyle: "italic" }}>
                            {sub.description}
                          </p>
                        )}
                      </div>

                      <div style={{ padding: "0 20px 25px" }}>
                        <Button
                          onClick={() => handleBuyNow(sub)}
                          disabled={processingId === sub._id || purchased}
                          style={{
                            width: "100%",
                            background: purchased ? "#6c757d" : processingId === sub._id ? "#ccc" : colorScheme.gradient,
                            border: "none",
                            padding: "14px",
                            borderRadius: "12px",
                            fontWeight: "600",
                            fontSize: "16px",
                          }}
                        >
                          {processingId === sub._id ? (
                            <>
                              <Spinner size="sm" className="me-2" />
                              Processing...
                            </>
                          ) : purchased ? (
                            "Already Purchased"
                          ) : (
                            "Subscribe Now"
                          )}
                        </Button>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          )}
        </div>
      </Container>
    </div>
  );
}

export default OfferQuestionPaper;
