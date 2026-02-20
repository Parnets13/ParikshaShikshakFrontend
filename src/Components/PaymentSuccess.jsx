// import React, { useEffect, useState, useCallback } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; 
// import "../styles/payment.css";
// import axios from "axios";
// import swal from "sweetalert"; 


// const PaymentSuccess = (props) => {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   // Extract query parameters
//   const transactionId = searchParams.get("transactionId");
//   const userId = searchParams.get("userID");

//   // State for payment status and details
//   const [paymentStatus, setPaymentStatus] = useState(null); // e.g., "COMPLETED" or "FAILED"
//   const [paymentDetails, setPaymentDetails] = useState(null); // Store the full payment data

//   const checkPaymentStatus = useCallback(async () => {
//     try {
//       // Construct API endpoint
//       const url = `http://localhost:8774/api/Teacher/checkPayment/${transactionId}/${userId}`;

//       // Make the GET request
//       const response = await axios.get(url);
//       console.log("Payment response : ", response);
//       if (response.status === 200) {
//         const paymentData = response.data.success;
//         setPaymentDetails(paymentData);

//         if (paymentData.status === "COMPLETED") {
//           localStorage.removeItem("basket");
//           setPaymentStatus("COMPLETED");

//           // Send PDF receipt via email
//           try {
//             await axios.post("http://localhost:8774/api/admin/send-receipt", {
//               username: paymentData.username,
//               email: paymentData.email,
//               amount: paymentData.amount,
//               transactionId: paymentData.transactionId,
//             });
//             console.log("Receipt email sent successfully");
//           } catch (emailErr) {
//             console.error("Failed to send receipt email:", emailErr.message);
//           }

//           setTimeout(() => {
//             navigate(response.data.success.successUrl);
//           }, 1000);
//         } else {
//           setPaymentStatus("FAILED");
//           setTimeout(() => {
//             navigate(response.data.success.failedUrl);
//           }, 1000);
//         }
//       } else {
//         // Handle unexpected response
//         swal({
//           title: "Payment Verification Failed",
//           text: "Unable to verify your payment status. Please contact support.",
//           icon: "error",
//           button: "OK",
//         });
//       }
//     } catch (error) {
//       // Handle API errors
//       console.error("Error checking payment status:", error);
//       swal({
//         title: "Error!",
//         text: "Unable to verify payment status. Please try again.",
//         icon: "error",
//         button: "OK",
//       });
//     }
//   }, [transactionId, userId, navigate]);

//   useEffect(() => {
//     // Call payment status check when component mounts
//     if (transactionId && userId) {
//       checkPaymentStatus();
//     } else {
//       navigate("/");
//     }
//   }, [transactionId, userId, navigate, checkPaymentStatus]);

//   return (
//     <div className="payment-success-container">
//       {paymentStatus === "COMPLETED" ? (
//         <>
//           <FaCheckCircle className="payment-success-icon" />
//           <h1 className="payment-success-title">Payment Successful!</h1>
//           <p className="payment-success-message">
//             Thank you for your payment, <strong>{paymentDetails?.username}</strong>.
//           </p>
//           <p className="payment-success-message">Amount: ₹{paymentDetails?.amount}</p>
//         </>
//       ) : paymentStatus === "FAILED" ? (
//         <>
//           <FaTimesCircle className="payment-failed-icon" />
//           <h1 className="payment-failed-title">Payment Failed</h1>
//           <p className="payment-failed-message">
//             We could not process your payment. Please try again.
//           </p>
//         </>
//       ) : (
//         <p>Loading payment status...</p>
//       )}
//     </div>
//   );
// };

// export default PaymentSuccess;
    
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from "axios";
import swal from "sweetalert";
import "../styles/payment.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Extract parameters
  const transactionId = searchParams.get("transactionId");
  const userId = searchParams.get("userID");
  
  // State
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const checkPaymentStatus = useCallback(async () => {
    try {
      // 1. Verify payment
      const paymentUrl = `http://localhost:8774/api/Teacher/checkPayment/${transactionId}/${userId}`;
      const paymentRes = await axios.get(paymentUrl);
      
      if (!paymentRes.data.success) throw new Error("Payment verification failed");
      
      const paymentData = paymentRes.data.success;
      setPaymentDetails(paymentData);

      if (paymentData.status === "COMPLETED") {
        localStorage.removeItem("basket");
        setPaymentStatus("COMPLETED");

        // 2. Save user subscription if this was a subscription purchase
        const pendingSubscription = localStorage.getItem("pendingSubscription");
        if (pendingSubscription) {
          try {
            const subscriptionData = JSON.parse(pendingSubscription);
            await axios.post(
              "http://localhost:8774/api/admin/saveUserSubscription",
            {
                userId: userId,
                subscriptionId: subscriptionData._id,
                paymentId: paymentData.paymentId || "",
                transactionId: paymentData.transactionId,
              },
              {
                headers: { "Content-Type": "application/json" },
              }
            );
            localStorage.removeItem("pendingSubscription");
            console.log("Subscription saved successfully");
          } catch (subErr) {
            console.error("Subscription saving failed:", subErr);
          }
        }

        // 3. Send receipt
        try {
          await axios.post(
            "http://localhost:8774/api/admin/send-receipt",
            {
              username: paymentData.username,
              email: paymentData.email,
              amount: paymentData.amount,
              transactionId: paymentData.transactionId
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );
        } catch (emailErr) {
          console.error("Receipt sending failed (non-critical):", emailErr);
        }

        // 4. Redirect after delay
        setTimeout(() => navigate(paymentData.successUrl), 3000);
      } else {
        setPaymentStatus("FAILED");
        setTimeout(() => navigate(paymentData.failedUrl), 3000);
      }
    } catch (error) {
      console.error("Payment error:", error);
      swal({
        title: "Error!",
        text: "Payment verification failed. Please contact support.",
        icon: "error",
        button: "OK",
      }).then(() => navigate("/"));
    }
  }, [transactionId, userId, navigate]);

  useEffect(() => {
    if (transactionId && userId) {
      checkPaymentStatus();
    } else {
      navigate("/");
    }
  }, [transactionId, userId, navigate, checkPaymentStatus]);

  return (
    <div className="payment-success-container">
      {paymentStatus === "COMPLETED" ? (
        <>
          <FaCheckCircle className="payment-success-icon" />
          <h1>Payment Successful!</h1>
          <p>Thank you, {paymentDetails?.username}!</p>
          <p>₹{paymentDetails?.amount} paid successfully.</p>
          <p>Receipt sent to {paymentDetails?.email}</p>
        </>
      ) : paymentStatus === "FAILED" ? (
        <>
          <FaTimesCircle className="payment-failed-icon" />
          <h1>Payment Failed</h1>
          <p>Please try again or contact support.</p>
        </>
      ) : (
        <div className="payment-loading">
          <div className="spinner"></div>
          <p>Processing your payment...</p>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
