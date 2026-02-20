 import React, { useEffect, useState } from "react";
import {
  FaPhoneAlt,
  FaRegEye,
  FaWhatsappSquare,
  FaCopy,
  FaWhatsapp,
  FaShareAlt,
  FaEdit,
  FaSave,
  FaTimes
} from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import swal from "sweetalert";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const [profile, setProfile] = useState(true);
  const [questionPaper, setQuestionPaper] = useState(false);
  const [payment, setPayment] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [allQuestionGen, setAllQuestionGen] = useState([]);
  const [referralStats, setReferralStats] = useState({
    shareCount: 0,
    successfulShares: 0,
    totalReferrals: 0,
    totalRewards: 0
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    FirstName: user?.FirstName || "",
    LastName: user?.LastName || "",
    Mobile: user?.Mobile || "",
    whatsAppNumber: user?.whatsAppNumber || "",
    Email: user?.Email || "",
    Country: user?.Country || "",
    State: user?.State || "",
    City: user?.City || ""
  });
  const [bankDetails, setBankDetails] = useState({
    accountNumber: user?.bankDetails?.accountNumber || "",
    ifsc: user?.bankDetails?.ifsc || "",
    bankName: user?.bankDetails?.bankName || "",
    branchName: user?.bankDetails?.branchName || "",
    accountHolderName: user?.bankDetails?.accountHolderName || ""
  });

  const getAllQuestion = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8774/api/teacher/getAllGenQuestionByUserId/${user?._id}/${user?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setAllQuestionGen(res.data.success);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const getReferralStats = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8774/api/admin/getReferralDetails/${user?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setReferralStats(res.data.success.referralStats || {
          shareCount: 0,
          successfulShares: 0,
          totalReferrals: 0,
          totalRewards: 0
        });
      }
    } catch (error) {
      console.error("Error fetching referral stats:", error);
      setReferralStats({
        shareCount: 0,
        successfulShares: 0,
        totalReferrals: 0,
        totalRewards: 0
      });
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset to original values
    setEditedProfile({
      FirstName: user?.FirstName || "",
      LastName: user?.LastName || "",
      Mobile: user?.Mobile || "",
      whatsAppNumber: user?.whatsAppNumber || "",
      Email: user?.Email || "",
      Country: user?.Country || "",
      State: user?.State || "",
      City: user?.City || ""
    });
    setBankDetails({
      accountNumber: user?.bankDetails?.accountNumber || "",
      ifsc: user?.bankDetails?.ifsc || "",
      bankName: user?.bankDetails?.bankName || "",
      branchName: user?.bankDetails?.branchName || "",
      accountHolderName: user?.bankDetails?.accountHolderName || ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setBankDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const updatedData = {
        ...editedProfile,
        id: user._id, // Make sure to include the teacher ID
        bankDetails: {
          accountNumber: bankDetails.accountNumber,
          ifsc: bankDetails.ifsc,
          bankName: bankDetails.bankName,
          branchName: bankDetails.branchName,
          accountHolderName: `${editedProfile.FirstName} ${editedProfile.LastName}`
        }
      };

      const res = await axios.put(
        `http://localhost:8774/api/admin/updateTeacher`,
        updatedData, // Send the data directly as the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (res.status === 200) {
        swal("Success!", "Profile updated successfully!", "success");
        // Update local storage with new data
        const updatedUser = { ...user, ...updatedData };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setIsEditing(false);
        // Optionally refresh the page or user data
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      swal("Error!", error.response?.data?.error || "Failed to update profile. Please try again.", "error");
    }
  }; 

  useEffect(() => {
    if (token) {
      getAllQuestion();
      getReferralStats();
    }
  }, [token]);

  const handleShareClick = async () => {
    try {
      await axios.post(
        `http://localhost:8774/api/admin/trackReferralShare`,
        { teacherId: user?._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getReferralStats();
      setShowShareModal(true);
    } catch (error) {
      console.error("Error tracking referral share:", error);
      setShowShareModal(true);
    }
  };

  const handleCloseShareModal = () => {
    setShowShareModal(false);
  };

  const trackShare = async (platform) => {
    try {
      await axios.post(
        `http://localhost:8774/api/admin/teacher/trackSuccessfulShare`,
        { teacherId: user?._id, platform },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getReferralStats();
    } catch (error) {
      console.error("Error tracking share:", error);
    }
  };

  // const shareViaWhatsApp = () => {
  //   const referralLink = `http://localhost:8774/signup?referral=${user?.teacherId}`;
  //   const message = `Join Pariksha Shikshak using my referral link and get benefits! ${referralLink}`;
    
  //   // PWA-compatible WhatsApp sharing
  //   const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  //   const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    
  //   if (isMobile || isStandalone) {
  //     // For PWA and mobile devices, try multiple WhatsApp URLs
  //     const whatsappUrls = [
  //       `whatsapp://send?text=${encodeURIComponent(message)}`, // Native WhatsApp app
  //       `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, // WhatsApp API
  //       `https://wa.me/?text=${encodeURIComponent(message)}` // WhatsApp web
  //     ];
      
  //     // Try to open native app first
  //     let opened = false;
      
  //     const tryOpenWhatsApp = (url, index = 0) => {
  //       if (opened || index >= whatsappUrls.length) return;
        
  //       const link = document.createElement('a');
  //       link.href = url;
  //       link.target = '_blank';
  //       link.rel = 'noopener noreferrer';
        
  //       // For native app URLs, use a timeout to detect if the app opened
  //       if (url.startsWith('whatsapp://')) {
  //         const timeout = setTimeout(() => {
  //           if (!opened && index < whatsappUrls.length - 1) {
  //             tryOpenWhatsApp(whatsappUrls[index + 1], index + 1);
  //           }
  //         }, 2500);
          
  //         const handleBlur = () => {
  //           opened = true;
  //           clearTimeout(timeout);
  //           window.removeEventListener('blur', handleBlur);
  //         };
          
  //         window.addEventListener('blur', handleBlur);
  //       }
        
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
        
  //       if (!url.startsWith('whatsapp://')) {
  //         opened = true;
  //       }
  //     };
      
  //     tryOpenWhatsApp(whatsappUrls[0]);
  //   } else {
  
  //     const whatsappUrl = `https://web.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  //     window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  //   }
    
  //   trackShare('whatsapp');
  //   handleCloseShareModal();
  // };
 
   
//   const shareViaWhatsApp = () => {
//   const referralLink = `http://localhost:8774/signup?referral=${user?.teacherId}`;
//   const message = `Join Pariksha Shikshak using my referral link and get benefits! ${referralLink}`;
//   const encodedMessage = encodeURIComponent(message);

//   // Always use https links (safe for PWA, mobile, desktop)
//   const whatsappUrls = [
//     `https://wa.me/?text=${encodedMessage}`,                 // Mobile app or web fallback
//     `https://api.whatsapp.com/send?text=${encodedMessage}`,  // WhatsApp API
//     `https://web.whatsapp.com/send?text=${encodedMessage}`   // Desktop web only
//   ];

//   const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

//   if (isMobile) {
//     // Mobile devices: open wa.me (auto redirects to app if installed)
//     window.open(whatsappUrls[0], "_blank", "noopener,noreferrer");
//   } else {
//     // Desktop: open WhatsApp Web
//     window.open(whatsappUrls[2], "_blank", "noopener,noreferrer");
//   }

//   trackShare('whatsapp');
//   handleCloseShareModal();
// };
 
 
 
// const shareViaWhatsApp = () => {
//   const referralLink = `http://localhost:8774/signup?referral=${user?.teacherId}`;
//   const message = `Join Pariksha Shikshak using my referral link and get benefits! ${referralLink}`;
//   const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

//   // Direct navigation for PWA
//   window.location.href = whatsappUrl;

//   trackShare('whatsapp');
//   handleCloseShareModal();
// };
 
 
 
const shareViaWhatsApp = () => {
  const referralLink = `http://localhost:8774/signup?referral=${user?.teacherId}`;
  const message = `Join Pariksha Shikshak using my referral link and get benefits! ${referralLink}`;

  if (navigator.share) {
    // ✅ Works in PWA and mobile browsers
    navigator.share({
      title: 'Pariksha Shikshak',
      text: message,
      url: referralLink,
    })
      .then(() => {
        trackShare('whatsapp');
        handleCloseShareModal();
      })
      .catch((err) => {
        console.error("Share failed, falling back:", err);
        // fallback to WhatsApp if share sheet fails
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
        trackShare('whatsapp');
        handleCloseShareModal();
      });
  } else {
    // ✅ Fallback for desktop / unsupported browsers
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
    trackShare('whatsapp');
    handleCloseShareModal();
  }
};

  const copyReferralLink = () => {
    const referralLink = `http://localhost:8774/signup?referral=${user?.teacherId}`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(referralLink).then(() => {
        trackShare('copy');
        swal("Copied!", "Referral link copied to clipboard!", "success");
      }).catch(() => {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(referralLink);
      });
    } else {
      // Fallback for older browsers
      fallbackCopyTextToClipboard(referralLink);
    }
    handleCloseShareModal();
  };

  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      trackShare('copy');
      swal("Copied!", "Referral link copied to clipboard!", "success");
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
      swal("Error!", "Unable to copy link. Please copy manually.", "error");
    }
    document.body.removeChild(textArea);
  };

  return (
    <div>
      {/* Share Referral Modal */}
      <Modal show={showShareModal} onHide={handleCloseShareModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Share Referral Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <p>Share your referral link and earn rewards!</p>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                value={`http://localhost:8774/signup?referral=${user?.teacherId}`}
                readOnly
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={copyReferralLink}
              >
                <FaCopy /> Copy
              </button>
            </div>
            <div className="d-flex justify-content-center flex-wrap mt-4">
              <Button
                variant="success"
                onClick={shareViaWhatsApp}
                className="m-2"
                size="lg"
              >
                <FaWhatsapp /> Share on WhatsApp
              </Button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseShareModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="container pt-4">
        <div className="row">
          <div className="col-md-12">
            <button
              className="btn"
              style={{
                backgroundColor: "#AC199F",
                color: "#fff",
                padding: "3px 4px",
                marginBottom: "10px",
              }}
              onClick={() => {
                setProfile(true);
                setQuestionPaper(false);
                setPayment(false);
              }}
            >
              Profile
            </button>{" "}
            &nbsp;
            <button
              className="btn"
              style={{
                backgroundColor: "#AC199F",
                color: "#fff",
                padding: "3px 6px",
                marginBottom: "10px",
              }}
              onClick={() => {
                setProfile(false);
                setQuestionPaper(true);
                setPayment(false);
              }}
            >
              Generated Question Paper
            </button>
            &nbsp;
            <button
              className="btn"
              style={{
                backgroundColor: "#AC199F",
                color: "#fff",
                padding: "3px 4px",
                marginBottom: "10px",
              }}
              onClick={handleShareClick}
            >
              <FaShareAlt /> Refer And Earn
            </button>
            <button
              className="btn"
              style={{
                backgroundColor: "green",
                color: "#fff",
                padding: "3px 4px",
                float: "right",
                borderRadius: "10px",
                marginTop: "10px",
              }}
              onClick={() => {
                navigate("/examboard");
              }}
            >
              Quick Generate Question Paper
            </button>
            &nbsp;
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {profile ? (
              <>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <img
                    src="../logo.png"
                    alt=""
                    style={{ width: "300px", borderRadius: "10px" }}
                  />
                  {!isEditing ? (
                    <Button variant="primary" onClick={handleEditProfile}>
                      <FaEdit /> Edit Profile
                    </Button>
                  ) : (
                    <div>
                      <Button variant="success" onClick={handleSaveProfile} className="me-2">
                        <FaSave /> Save
                      </Button>
                      <Button variant="danger" onClick={handleCancelEdit}>
                        <FaTimes /> Cancel
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 ps-5">
                      <label htmlFor="" style={{ color: "rgb(8, 52, 148)" }}>
                        <IoPersonSharp /> &nbsp; Name
                      </label>
                      {isEditing ? (
                        <div className="d-flex">
                          <Form.Control
                            type="text"
                            name="FirstName"
                            value={editedProfile.FirstName}
                            onChange={handleInputChange}
                            className="me-2"
                          />
                          <Form.Control
                            type="text"
                            name="LastName"
                            value={editedProfile.LastName}
                            onChange={handleInputChange}
                          />
                        </div>
                      ) : (
                        <p>
                          {user?.FirstName} {user?.LastName}
                        </p>
                      )}
                      <hr />
                    </div>
                    <div className="col-md-6 ps-5">
                      <label htmlFor="" style={{ color: "rgb(8, 52, 148)" }}>
                        <MdEmail /> &nbsp; Email
                      </label>
                      {isEditing ? (
                        <Form.Control
                          type="email"
                          name="Email"
                          value={editedProfile.Email}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p>{user?.Email}</p>
                      )}
                      <hr />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 ps-5">
                      <label htmlFor="" style={{ color: "rgb(8, 52, 148)" }}>
                        <FaPhoneAlt /> &nbsp; Phone
                      </label>
                      {isEditing ? (
                        <Form.Control
                          type="text"
                          name="Mobile"
                          value={editedProfile.Mobile}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p>{user?.Mobile}</p>
                      )}
                      <hr />
                    </div>
                    <div className="col-md-6 ps-5">
                      <label htmlFor="" style={{ color: "rgb(8, 52, 148)" }}>
                        <FaWhatsappSquare /> &nbsp; WhatsApp Number
                      </label>
                      {isEditing ? (
                        <Form.Control
                          type="text"
                          name="whatsAppNumber"
                          value={editedProfile.whatsAppNumber}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p>{user?.whatsAppNumber}</p>
                      )}
                      <hr />
                    </div>
                    <div className="col-md-6 ps-5">
                      <label htmlFor="" style={{ color: "rgb(8, 52, 148)" }}>
                        <CiCalendarDate /> &nbsp; Registration Date
                      </label>
                      <p>{moment(user?.createdAt)?.format("DD/MM/YYYY")}</p>
                      <hr />
                    </div>
                    <div className="col-md-6 ps-5">
                      <label htmlFor="" style={{ color: "rgb(8, 52, 148)" }}>
                        <CiCalendarDate /> &nbsp; Registration ID
                      </label>
                      <p>{user?.teacherId}</p>
                      <hr />
                    </div>
                    <div className="col-md-6 ps-5">
                      <label htmlFor="" style={{ color: "rgb(8, 52, 148)" }}>
                        <FaShareAlt /> &nbsp; Referral Stats
                      </label>
                      <p>
                        Referrals: {referralStats.totalReferrals || 0}
                      </p>
                      <hr />
                    </div>
                  </div>
                  
                  {/* Bank Details Section */}
                  <div className="row mt-4">
                    <div className="col-12">
                      <h4 style={{ color: "rgb(8, 52, 148)" }}>Bank Details</h4>
                    </div>
                    
                    <div className="col-md-6 ps-5">
                      <label htmlFor="" style={{ color: "rgb(8, 52, 148)" }}>
                        Account Number
                      </label>
                      {isEditing ? (
                        <Form.Control
                          type="text"
                          name="accountNumber"
                          value={bankDetails.accountNumber}
                          onChange={handleBankDetailsChange}
                        />
                      ) : (
                        <p>{user?.bankDetails?.accountNumber || "Not provided"}</p>
                      )}
                      <hr />
                    </div>
                    
                    <div className="col-md-6 ps-5">
                      <label htmlFor="" style={{ color: "rgb(8, 52, 148)" }}>
                        IFSC Code
                      </label>
                      {isEditing ? (
                        <Form.Control
                          type="text"
                          name="ifsc"
                          value={bankDetails.ifsc}
                          onChange={handleBankDetailsChange}
                        />
                      ) : (
                        <p>{user?.bankDetails?.ifsc || "Not provided"}</p>
                      )}
                      <hr />
                    </div>
                    
                    <div className="col-md-6 ps-5">
                      <label htmlFor="" style={{ color: "rgb(8, 52, 148)" }}>
                        Bank Name
                      </label>
                      {isEditing ? (
                        <Form.Control
                          type="text"
                          name="bankName"
                          value={bankDetails.bankName}
                          onChange={handleBankDetailsChange}
                        />
                      ) : (
                        <p>{user?.bankDetails?.bankName || "Not provided"}</p>
                      )}
                      <hr />
                    </div>
                    
                    <div className="col-md-6 ps-5">
                      <label htmlFor="" style={{ color: "rgb(8, 52, 148)" }}>
                        Branch Name
                      </label>
                      {isEditing ? (
                        <Form.Control
                          type="text"
                          name="branchName"
                          value={bankDetails.branchName}
                          onChange={handleBankDetailsChange}
                        />
                      ) : (
                        <p>{user?.bankDetails?.branchName || "Not provided"}</p>
                      )}
                      <hr />
                    </div>
                    
                    <div className="col-md-6 ps-5">
                      <label htmlFor="" style={{ color: "rgb(8, 52, 148)" }}>
                        Account Holder Name
                      </label>
                      {isEditing ? (
                        <p>{`${editedProfile.FirstName} ${editedProfile.LastName}`}</p>
                      ) : (
                        <p>{user?.bankDetails?.accountHolderName || `${user?.FirstName} ${user?.LastName}`}</p>
                      )}
                      <hr />
                    </div>
                  </div>
                </div>
              </>
            ) : questionPaper ? (
              <>
                <div className="mt-5">
                  <Table
                    responsive
                    bordered
                    style={{ width: "-webkit-fill-available" }}
                  >
                    <thead style={{ backgroundColor: "rgb(8, 52, 148)" }}>
                      <tr>
                        <th>S.No</th>
                        <th>Exam Date/Time</th>
                        <th>Name</th>
                        <th>Class/Sub_Class</th>
                        <th>Board</th>
                        <th>Subject</th>
                        <th>Medium</th>
                        <th>Exam Name</th>
                        <th>Generation Date</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {allQuestionGen?.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>
                              {moment(item?.Test_Date).format("DD/MM/YYYY")}{" "}
                              {item?.ExamTime}
                            </td>
                            <td>{item?.Institute_Name}</td>
                            <td>
                              {item?.Class}/{item?.Sub_Class}
                            </td>
                            <td>{item?.Board}</td>
                            <td>{item?.Subject}</td>
                            <td>{item?.Medium}</td>
                            <td>{item?.Exam_Name}</td>
                            <td>
                              {moment(item?.createdAt).format("DD/MM/YYYY")}
                            </td>
                            <td>
                              {item?.status == "Not Complete Staps" ? (
                                <span style={{ color: "red" }}>
                                  {item?.status}
                                </span>
                              ) : item?.status == "Completed" ? (
                                <span style={{ color: "green" }}>
                                  {item?.status}
                                </span>
                              ) : (
                                <span style={{ color: "blue" }}>
                                  {item?.status}
                                </span>
                              )}
                            </td>
                            <td>
                              {item?.status === "Completed" ? (
                                <FaRegEye
                                  className="text-primary"
                                  style={{
                                    cursor: "pointer",
                                    fontSize: "20px",
                                  }}
                                  onClick={() =>
                                    navigate("/admincoverpage", {
                                      state: { item: item },
                                    })
                                  }
                                />
                              ) : (
                                <button
                                  type="button"
                                  className="btn btn-success"
                                  onClick={() => {
                                    if (item?.status == "Up_Comming") {
                                      return navigate("/loginpage5", {
                                        state: item,
                                      });
                                    } else if (item?.status == "Saved Draft") {
                                      return navigate("/blueprint", {
                                        state: item,
                                      });
                                    } else if (
                                      item?.status == "Not Complete Staps"
                                    ) {
                                      return navigate("/loginpage3", {
                                        state: item,
                                      });
                                    }
                                  }}
                                >
                                  Continue
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </>
            ) : payment ? (
              <>
                <div className="mt-5">
                  <Table
                    responsive
                    bordered
                    style={{ width: "-webkit-fill-available" }}
                  >
                    <thead style={{ backgroundColor: "yellowgreen" }}>
                      <tr>
                        <th>S.No</th>
                        <th>Payment Date</th>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>Transaction Details</th>
                        <th>Amount</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>31/02/2024</td>
                        <td>Amandeep Singh</td>
                        <td>Mathematics</td>
                        <td></td>
                        <td>₹ 40</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;