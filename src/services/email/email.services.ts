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
  private to: string;
  private type: string;
  private payload: { name: string; code: string; link: string };
  private html: string;
  constructor(to: string, payload: { name: string; code: string; link: string }, type: string) {
    this.to = to;
    this.payload = payload;
    this.type = type;
  }

  go = async () => {
    switch (this.type) {
      case emailTypesServices.verifyMail:
        this.html = verifyEmailTemplate({ name: this.payload.name, code: this.payload.code, link: this.payload.link });
        break;
      case emailTypesServices.resetPassword:
        this.html = verifyEmailTemplate({ name: this.payload.name, code: this.payload.code, link: this.payload.link });
        break;
      case emailTypesServices.updateEmail:
        this.html = verifyEmailTemplate({ name: this.payload.name, code: this.payload.code, link: this.payload.link });
        break;
    }
    const obj = { from: configs.apps.mail, to: this.to, subject: this.type, html: this.html };
    return transport.sendMail(obj);
  };
}

export default SendMail;
