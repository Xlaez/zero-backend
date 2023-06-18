import { mongoose } from '@dolphjs/core';
import { Pagination, mongoosePagination } from 'mongoose-paginate-ts';
import { toJSON } from '../plugins';
import { colConstants } from '@/constants';

interface ICartProd extends mongoose.Document {
  prodId: mongoose.Schema.Types.ObjectId;
  merchantId: mongoose.Schema.Types.ObjectId;
  nb: number; // total product
  cost: number;
}

export interface ICart extends mongoose.Document {
  accountId: mongoose.Schema.Types.ObjectId;
  products: Array<ICartProd>;
  totalCost: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * I am creating a new schema for products so that it scales vertically and not horizontally
 */
const ProductSchema = new mongoose.Schema(
  {
    prodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: colConstants.products,
      required: true,
    },
    merchantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: colConstants.accounts,
      reequired: true,
    },
    nb: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      default: 0,
    },
  },
  { _id: false, id: false }
);

const Schema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: colConstants.accounts,
      required: true,
    },
    products: [ProductSchema],
    totalCost: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

Schema.plugin(toJSON);
Schema.plugin(mongoosePagination);

export const Carts: Pagination<ICart> = mongoose.model<ICart, Pagination<ICart>>(colConstants.carts, Schema);
