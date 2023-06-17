import { mongoose } from '@dolphjs/core';
import { Pagination, mongoosePagination } from 'mongoose-paginate-ts';
import { toJSON } from '../plugins';
import { colConstants } from '@/constants';

export interface IProduct extends mongoose.Document {
  title: string;
  descr: string;
  imgs: Array<string>;
  features: {
    sizes?: Array<string>;
    colours?: Array<string>;
    weights?: Array<string>;
  };
  merchantId: mongoose.Types.ObjectId;
  id: mongoose.Types.ObjectId;
  createdAt: Date;
  isSoldOut: boolean;
  markSoldOut(prodId: string): Promise<Boolean>;
}

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [3, 'title cannot be less than 3 characters'],
    maxlength: [20, 'title cannot be more than 20 characters'],
  },
  descr: {
    type: String,
    required: true,
    maxlength: [150, 'description cannot be more than 150 characters'],
  },
  imgs: {
    type: [String],
  },
  features: {
    sizes: {
      type: [String], //Eg: ['12kg', '14kg']
    },
    colours: {
      type: [String],
    },
    weights: {
      type: [String],
    },
  },
  merchantId: {
    type: mongoose.Types.ObjectId,
    ref: colConstants.accounts,
    required: true,
  },
  isSoldOut: {
    type: Boolean,
    default: false,
  },
});

Schema.plugin(toJSON);
Schema.plugin(mongoosePagination);

Schema.statics.markSoldOut = async function (prodId: string) {
  const prod = await this.updateOne({ _id: prodId }, { isSoldOut: true });
  return !!prod;
};

export const Products: Pagination<IProduct> = mongoose.model<IProduct, Pagination<IProduct>>(colConstants.products, Schema);
