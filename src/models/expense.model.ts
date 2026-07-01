import mongoose, { Schema, Document } from "mongoose";
import { Expense } from "../schemas/expense.schema";

interface IExpense extends Document, Expense {
  createdAt: Date;
  updatedAt: Date;
}

const ExpenseSchema: Schema = new Schema<IExpense>({
    expenseType: {
        type: String,
        required: true,
        trim: true,
        max: 50
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    approvedBy: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    paidTo: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    isVariable: {
        type: Boolean,
        default: false
    },
    isMonthly: {
        type: Boolean,
        default: true
    },
    thisMonth: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const ExpenseModel = mongoose.model<IExpense>("Expense", ExpenseSchema);

export default ExpenseModel
