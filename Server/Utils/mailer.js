const nodemailer = require("nodemailer");


const otpEmailTemplate = ({ otp, username, validityMinutes = 10 }) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2 style="color: #2c3e50;">🔐 Your One-Time Password (OTP)</h2>
      <p>Hello ${username || "User"},</p>
      <p>Use the following One-Time Password (OTP) to proceed with your action:</p>

      <div style="padding: 14px; border: 2px dashed #3498db; background: #f8f9fa; 
                  text-align: center; font-size: 22px; font-weight: bold; color: #2c3e50; 
                  letter-spacing: 2px; margin: 16px 0;">
        ${otp}
      </div>

      <p>This OTP is valid for <b>${validityMinutes} minutes</b>. Please do not share it with anyone.</p>

      <p>If you did not request this, please ignore this email.</p>

      <br/>
      <p style="font-size: 14px; color: #555;">
        Regards,<br/>
        <b>My Blog App Team</b><br/>
        ✉️ support@myblogapp.com
      </p>
    </div>
  `;
};

const transporter = nodemailer.createTransport({
  service: "gmail", // you can replace with Outlook, Yahoo, or SMTP
  auth: {
    user: process.env.EMAIL_USER, // from .env
    pass: process.env.EMAIL_PASS, // app password
  },
});

const sendMail = async (to, subject, data) => {
  try {
    const info = await transporter.sendMail({
      from: `"My Blog App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: otpEmailTemplate(data), // send OTP template
    });
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = sendMail;
