import { mongoose } from '@dolphjs/core';
import { Pagination } from 'mongoose-paginate-ts';
import { toJSON } from '../plugins';
import { colConstants } from '@/constants';

export interface ITransaction extends mongoose.Document {
  id: mongoose.Schema.Types.ObjectId;
  receiver: mongoose.Schema.Types.ObjectId;
  sender: mongoose.Schema.Types.ObjectId;
  amount: mongoose.Schema.Types.ObjectId;
  time: Date;
}

const Schema = new mongoose.Schema(
  {
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: colConstants.accounts,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: colConstants.accounts,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    time: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: false }
);

Schema.plugin(toJSON);

export const Transactions: Pagination<ITransaction> = mongoose.model<ITransaction, Pagination<ITransaction>>(
  colConstants.transactions,
  Schema
);
