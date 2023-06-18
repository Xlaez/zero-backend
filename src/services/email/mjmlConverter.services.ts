import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import mjml2html from 'mjml';
import { resolve } from 'path';

const verifyEmailMjmlFile = readFileSync(resolve(__dirname, '../../../templates/verifyAccount.mjml')).toString();
export const verifyEmailTemplate = compile(mjml2html(verifyEmailMjmlFile).html);
