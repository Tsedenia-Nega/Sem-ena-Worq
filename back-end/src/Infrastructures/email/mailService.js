import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

class MailService {
  constructor() {
    
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
      },
    });
  }

  async sendEmail(to, subject, text) {
    try {
      const mailOptions = {
        from: `Admin Portal <${process.env.EMAIL_USER}>`, // Custom display name
        to: to,
        subject: subject,
        text: text,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log("Email sent:", info.messageId);
      return info;
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }
  }

  async sendPasswordResetEmail(to, resetToken) {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const subject = "Password Reset Request";
    const text = `We received a request to reset your password. Click the link below to reset your password:\n\n${resetLink}\n\nIf you did not request this, please ignore this email.`;

    return await this.sendEmail(to, subject, text);
  }
}

export default new MailService();
