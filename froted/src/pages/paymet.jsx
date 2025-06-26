import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const ChallengePayment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePayment = async () => {
    if (!user) {
      toast.error("Please sign in to join the challenge!");
      navigate("/signin");
      return;
    }

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
      handler: async (response) => {
        try {
          await axios.post("http://localhost:5000/api/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            userId: user._id,
          });

          toast.success("🎉 Payment Successful! You're in!");
          navigate("/challenge");
        } catch (err) {
          console.error("Payment verification failed:", err.response?.data || err.message);
          toast.error("Payment verification failed.");
        }
      },
      prefill: {
        name: user?.username || "Guest",
        email: user?.email || "guest@example.com",
      },
      theme: {
        color: "#0a9396",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-pink-100 px-4 py-10">
      <div className="max-w-2xl bg-white p-8 rounded-xl shadow-xl text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">🚀 21-Day YouTube Challenge</h1>
        <p className="text-gray-600 text-lg">
          Build consistency, show up every day, and grow your presence on YouTube.
        </p>

        <ul className="text-left text-gray-700 space-y-2 bg-gray-50 p-4 rounded-lg border">
          <li>✅ Upload 1 video every day for 21 days</li>
          <li>✅ Track your progress daily in your dashboard</li>
          <li>✅ Earn ₹100 reward if you complete all 21 days</li>
          <li>✅ Get ₹25 entry refunded + ₹75 bonus</li>
          <li>⛔ Miss a day = restart challenge</li>
          <li>🎁 Bonus prizes for most consistent creators</li>
        </ul>

        <div className="text-xl font-semibold text-green-700">
          💰 Entry Fee: ₹25 &nbsp;&nbsp;&nbsp; 🎉 Reward: ₹100
        </div>

        <button
          onClick={handlePayment}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg text-lg transition"
        >
          Join Challenge Now 🚀
        </button>

        <p className="text-gray-500 text-sm mt-2">
          * Once payment is done, you’ll be redirected to your challenge dashboard.
        </p>
      </div>
    </div>
  );
};

export default ChallengePayment;
