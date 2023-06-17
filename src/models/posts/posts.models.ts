import { mongoose } from '@dolphjs/core';
import { Pagination, mongoosePagination } from 'mongoose-paginate-ts';
import { toJSON } from '../plugins';
import { colConstants } from '@/constants';

export interface IPost extends mongoose.Document {
  title?: string;
  content?: string;
  media?: string;
  isAd: boolean;
  isValid: boolean;
  accountId: string;
  expiresAt: Date;
  createdAt: Date;
}

const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      maxlength: 300,
      required: false,
    },
    isAd: {
      type: Boolean,
      default: false,
    },
    accountId: {
      type: mongoose.Types.ObjectId,
      ref: colConstants.accounts,
      required: true,
    },
    isValid: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      default: new Date().getMonth() + 1,
    },
  },
  { timestamps: true }
);

Schema.plugin(toJSON);
Schema.plugin(mongoosePagination);

export const Posts: Pagination<IPost> = mongoose.model<IPost, Pagination<IPost>>(colConstants.posts, Schema);
