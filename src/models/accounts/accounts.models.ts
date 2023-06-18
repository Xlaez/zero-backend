import { mongoose } from '@dolphjs/core';
import { Pagination, mongoosePagination } from 'mongoose-paginate-ts';
import { toJSON } from '../plugins';
import { hash, verify } from 'argon2';
import { NextFunction } from 'express';
import { colConstants } from '@/constants';

export interface IAccount extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  img?: string;
  bio?: string;
  accType: string; // merchant or buyer or both
  authType: string;
  authToken: string;
  phoneNo: string;
  isVerified: boolean;
  isSuspended: boolean;
  createdAt: Date;
  updatedAt: Date;
  id: mongoose.Types.ObjectId;
  accountHash: string;
  socials: {
    twitter?: string;
    pinterest?: string;
    facebook?: string;
    instagram?: string;
    website?: string;
  };
  location: {
    country?: string;
    city?: string;
  };
  doesPasswordMatch(password: string): Promise<boolean>;
  isEmailTaken(email: string, excludedUserId: string): Promise<boolean>;
  isNameTaken(name: string): Promise<boolean>;
}

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      required: false,
      private: true, // a marker so the toJSON plugin would omit it
    },
    img: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
      minlength: 50,
    },
    accType: {
      type: String,
      enum: ['merchant', 'buyer', 'both'],
      default: 'both',
      required: false,
    },
    authType: {
      type: String,
      enum: ['sso', 'login', 'gmail', 'facebook'],
      default: 'login',
      required: false,
    },
    authToken: {
      type: String,
      required: false,
    },
    phoneNo: {
      type: Number,
      required: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isSuspended: {
      type: Boolean,
      default: false,
    },
    accountHash: {
      type: String,
      required: false,
    },
    socials: {
      twitter: String,
      pinterest: String,
      facebook: String,
      instagram: String,
      website: String,
    },
    location: {
      country: String,
      city: String,
    },
  },
  { timestamps: true }
);

Schema.plugin(toJSON);
Schema.plugin(mongoosePagination);

Schema.statics.isEmailTaken = async function (email: string, excludedUserId: string): Promise<boolean> {
  const user = await this.findOne({ email, _id: { $ne: excludedUserId } });
  return !!user;
};

Schema.statics.isNameTaken = async function (name: string): Promise<boolean> {
  const user = await this.findOne({ name });
  return !!user;
};

Schema.methods.doesPasswordMatch = async function (password: string): Promise<boolean> {
  return await verify(this.password, password);
};

Schema.pre('save', async function (next: NextFunction) {
  if (this.authType !== 'login') return next();
  if (this.isModified('password')) this.password = await hash(this.password);
  next();
});

export const Accounts: Pagination<IAccounts> = mongoose.model<IAccounts, Pagination<IAccounts>>(
  colConstants.accounts,
  Schema
);
