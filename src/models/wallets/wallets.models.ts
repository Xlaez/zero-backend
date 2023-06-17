import { mongoose } from '@dolphjs/core';
import { Pagination, mongoosePagination } from 'mongoose-paginate-ts';
import { toJSON } from '../plugins';
import { colConstants } from '@/constants';

export interface IWallet extends mongoose.Document {
  accountId: mongoose.Schema.Types.ObjectId;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  accountHash: string;
}

const Schema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: colConstants.accounts,
    },
    amount: {
      type: Number,
      default: 1,
      min: 0,
    },
    accountHash: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: colConstants.accounts,
      // private: true,
    },
  },
  { timestamps: true }
);

Schema.plugin(toJSON);

export const Wallets: Pagination<IWallet> = mongoose.model<IWallet, Pagination<IWallet>>(colConstants.wallets, Schema);
