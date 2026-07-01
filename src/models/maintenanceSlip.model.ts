import mongoose, { Schema, Document } from "mongoose";
import { MaintenanceSlip } from "../schemas/maintenanceSlip.schema";

interface IExpense extends Document, MaintenanceSlip {
  flatId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const MaintenanceSlipSchema: Schema = new Schema<IExpense>(
  {
    slipNumber: {
      type: Number,
      required: [true, "Slip number is required"],
      min: [1, "Slip number must be a positive number"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount must be a positive number"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      validate: {
        validator: function (value: Date) {
          return value <= new Date();
        },
        message: "Date cannot be in the future",
      },
    },
    month: {
      type: Number,
      required: [true, "Month is required"],
      min: [1, "Month must be between 1 and 12"],
      max: [12, "Month must be between 1 and 12"],
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: [2000, "Year must be greater than or equal to 2000"],
      max: [
        new Date().getFullYear(),
        `Year cannot be greater than ${new Date().getFullYear()}`,
      ],
    },
    status: {
      type: String,
      enum: ["paid", "unpaid", "overdue"],
      default: "unpaid",
    },
    flatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flat",
      required: [true, "Flat ID is required"],
    },
  },
  {
    timestamps: true,
  },
);

const MaintenanceSlipModel = mongoose.model<IExpense>(
  "MaintenanceSlip",
  MaintenanceSlipSchema,
);

export default MaintenanceSlipModel;
