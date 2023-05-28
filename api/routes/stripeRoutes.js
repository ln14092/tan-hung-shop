const router = require("express").Router();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const Order = require("../models/Order");

router.post("/payment", async (req, res) => {
  try {
    const { amount, tokenId } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_data: {
        type: "card",
        card: {
          token: tokenId,
        },
      },
      confirm: true,
    });

    // const order = new Order({
    //   userId,
    //   products,
    //   amount,
    //   address,
    // });

    // const savedOrder = await order.save();

    // res.status(200).json({ success: true, order: savedOrder });

    res.status(200).json(paymentIntent);
  } catch (error) {
    console.error("Lỗi khi xử lý thanh toán:", error);
    res.status(500).json({ error: "Lỗi khi xử lý thanh toán" });
  }
});

module.exports = router;
