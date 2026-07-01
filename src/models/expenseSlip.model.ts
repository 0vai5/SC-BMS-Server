import mongoose, { Schema, Document, Types } from "mongoose";
import { ExpenseSlip } from "../schemas/expense.schema";

interface IExpenseSlip extends Document, ExpenseSlip {
  expenseId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ExpenseSlipSchema: Schema = new Schema<IExpenseSlip>(
  {
    expenseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense",
      required: [true, "Expense ID is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount must be a positive number"],
    },
    slipNumber: {
      type: Number,
      required: [true, "Slip number is required"],
      min: [1, "Slip number must be a positive number"],
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
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
  },
  {
    timestamps: true,
  },
);

const ExpenseSlipModel = mongoose.model<IExpenseSlip>("ExpenseSlip", ExpenseSlipSchema);

export default ExpenseSlipModel;
