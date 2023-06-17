import { mongoose } from '@dolphjs/core';
import { Pagination, mongoosePagination } from 'mongoose-paginate-ts';
import { toJSON } from '../plugins';
import { colConstants } from '@/constants';

export interface IOrder extends mongoose.Document {
  accountId: mongoose.Schema.Types.ObjectId;
  prodId: mongoose.Schema.Types.ObjectId;
  transactionId: mongoose.Schema.Types.ObjectId;
  date: Date;
}

const Schema = new mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: colConstants.accounts,
  },
  prodId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: colConstants.products,
  },
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: colConstants.transactions,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

Schema.plugin(toJSON);
Schema.plugin(mongoosePagination);

export const Orders: Pagination<IOrder> = mongoose.model<IOrder, Pagination<IOrder>>(colConstants.orders, Schema);
