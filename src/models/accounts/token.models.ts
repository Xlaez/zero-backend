import { mongoose } from '@dolphjs/core';
import { toJSON } from '../plugins';
import { Pagination } from 'mongoose-paginate-ts';
import { colConstants } from '@/constants';

export interface IToken extends mongoose.Document {
  token: string; // refresh token or verification token
  accountId: mongoose.Schema.Types.ObjectId;
  type: string;
  expires: Date;
  blacklisted: boolean;
}

const Schema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
      enum: ['refresh', 'verification'], // refresh token and verification token
      default: 'refresh',
    },
    expires: {
      type: Date,
      default: new Date().getMinutes() + 30,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false, id: false }
);

Schema.plugin(toJSON);

Schema.methods.hasExpired = async function (currentDate: Date) {
  // if(this.expires)
};

export const Tokens: Pagination<IToken> = mongoose.model<IToken, Pagination<IToken>>(colConstants.tokens, Schema);
