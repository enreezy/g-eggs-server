const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

router.post("/", async (req, res) => {
  let transport = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: "enriksabalvaro7@gmail.com",
        pass: "enrik123",
      },
    })
  );

  const message = {
    from: req.body.email, // Sender address
    to: "enriksabalvaro7@gmail.com", // List of recipients
    subject: "G-Egg Message", // Subject line
    text: `from ${req.body.email} (${req.body.name}) - ${req.body.message}`, // Plain text body
  };

  transport.sendMail(message, function (err, info) {
    if (err) {
      res.send(err);
    } else {
      res.send("success");
    }
  });
});

module.exports = router;
