import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
    const { message } = req.body;

    // Dummy response logic
    let response = "I'm a placeholder bot. I received your message: " + message;

    if (message.toLowerCase().includes("saffron")) {
        response = "Saffron is our specialty! We offer premium Kashmiri saffron. Would you like to see our products?";
    } else if (message.toLowerCase().includes("price")) {
        response = "Our prices start from ₹1,499 for 1g of Royal Saffron Threads. Check the Products page for more details.";
    }

    res.json({ response });
});

export default router;
