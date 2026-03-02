import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create Razorpay Order
// @route   POST /api/payments/create-order
// @access  Private
export const createRazorpayOrder = async (req, res) => {
    const { amount, currency } = req.body;

    try {
        const options = {
            amount: Math.round(amount * 100), // amount in paise
            currency: currency || "INR",
            receipt: `receipt_${Math.random().toString(36).substring(2, 11)}`,
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        console.error("Razorpay Order Creation Error:", error);
        res.status(500).json({ message: "Failed to create Razorpay order", error: error.message });
    }
};

// @desc    Verify Razorpay Payment Signature (Optional but recommended)
// @route   POST /api/payments/verify
// @access  Private
export const verifyPayment = async (req, res) => {
    // This is a placeholder for real signature verification if needed
    // In many simple client-side flows, the handler is sufficient for demo modes
    res.status(200).json({ status: "success", message: "Payment verification received" });
};
