import { useNavigate } from "react-router-dom";
// allowed only to logged in users, check for the reward systems as well
const ChallengePayment = () => {
  const navigate = useNavigate();
  const handlePayment = async () => {
    const res = await fetch("http://localhost:5000/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const { order } = await res.json();

    const options = {
      key: "rzp_test_cMwlNl5xr2YqvT",
      amount: order.amount,
      currency: "INR",
      name: "21-Day Challenge",
      description: "Entry fee for challenge",
      order_id: order.id,
      handler:  async (response)=> {
        await axios.post("http://localhost:5000/api/verify-payment", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          userId: user._id, // or get from context/auth
        });
        alert("🎉 Payment Successful! Welcome to the challenge!");
        console.log("Payment ID:", response.razorpay_payment_id);
        navigate('/challenge')
        // TODO: Save this in DB or state
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
      },
      theme: {
        color: "#0a9396",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>21-Day Challenge 💪</h2>
      <p>Pay ₹25 to join the challenge and get ₹100 on successful completion!</p>
      <button onClick={handlePayment} style={btnStyle}>
        Pay ₹25 & Join
      </button>
    </div>
  );
};

const btnStyle = {
  backgroundColor: "#0a9396",
  color: "#fff",
  padding: "10px 20px",
  fontSize: "16px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default ChallengePayment;
