import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // SMTP server
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: "2024.mohd.bhati@ves.ac.in",
      to,
      subject,
      text,
    });
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};
