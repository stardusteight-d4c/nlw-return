import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "62ca59c75b4bb3",
    pass: "58a531c0329dab"
  }
});


export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <empresa@feedget.com>',
      to: 'Gabriel Sena <bellsena@outlook.com>',
      subject,
      html: body,
    })
  };
}