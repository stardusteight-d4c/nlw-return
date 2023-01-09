import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";
import dotenv from "dotenv";

dotenv.config();

const transport = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.ethereal.email",
  auth: {
    user: "stardusteight.d4cc@gmail.com",
    pass: process.env.TWO_STEP_VERIF_PASS, // get in google Two-step verification
    // 1. Google Account 2. Security > Enable two-step verification 3. Generate app password
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <stardusteight.d4cc@gmail.com>",
      to: "stardusteight.d4cc@gmail.com",
      subject,
      html: body,
    });
  }
}
