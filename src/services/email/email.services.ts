import { configs } from '@/config';
import { createTransport } from 'nodemailer';
import emailTypesServices from './emailTypes.services';
import { verifyEmailTemplate } from './mjmlConverter.services';

const transport = createTransport({
  service: 'gmail', // configure to smtp or order in production
  auth: {
    type: 'Login',
    user: configs.smtp.mail,
    pass: configs.smtp.pass,
  },
});

/**
 * TODO: update templates
 */

class SendMail {
  private static to: string;
  private static type: string;
  private static payload: { name: string; code: string; link: string };
  private static html: string;
  constructor(to: string, payload: { name: string; code: string; link: string }, type: string) {
    SendMail.to = to;
    SendMail.payload = payload;
    SendMail.type = type;
  }

  static go = async () => {
    switch (SendMail.type) {
      case emailTypesServices.verifyMail:
        SendMail.html = verifyEmailTemplate({ name: this.payload.name, code: this.payload.code, link: this.payload.link });
        break;
      case emailTypesServices.resetPassword:
        SendMail.html = verifyEmailTemplate({ name: this.payload.name, code: this.payload.code, link: this.payload.link });
        break;
      case emailTypesServices.updateEmail:
        SendMail.html = verifyEmailTemplate({ name: this.payload.name, code: this.payload.code, link: this.payload.link });
        break;
    }
    const obj = { from: configs.apps.mail, to: this.to, subject: this.type, html: this.html };
    return transport.sendMail(obj);
  };
}

export default SendMail;
