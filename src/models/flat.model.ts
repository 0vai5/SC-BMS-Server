import mongoose, { Document, Schema } from "mongoose";
import { Flat } from "../schemas/flat.schema";

interface IFlat extends Document, Flat {
  createdAt: Date;
  updatedAt: Date;
}

const FlatSchema: Schema = new Schema<IFlat>(
  {
    flatNumber: {
      type: String,
      required: [true, "Flat number is required"],
      trim: true,
      maxLength: [10, "Flat number cannot exceed 10 characters"],
    },
    floor: {
      type: Number,
      required: [true, "Floor number is required"],
      min: [1, "Floor number must be a positive integer"],
      max: [2, "Floor number cannot exceed 2"],
    },
    ownerName: {
      type: String,
      required: [true, "Owner name is required"],
      trim: true,
    },
    ownerPhone: {
      type: String,
      required: [true, "Owner phone is required"],
      trim: true,
      match: [/^\d{10}$/, "Owner phone must be a valid 10-digit number"],
    },
    rooms: {
      type: Number,
      required: [true, "Rooms number is required"],
      min: [1, "Rooms must be a positive integer"],
      max: [3, "Rooms cannot exceed 3"],
    },
    isOccupied: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const FlatModel = mongoose.model<IFlat>("Flat", FlatSchema);

export default FlatModel;
