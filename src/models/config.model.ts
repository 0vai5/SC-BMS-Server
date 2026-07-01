import mongoose, { Document, Schema } from "mongoose";

interface IConfig extends Document {
  maintenanceAmount: number;
  maintenanceSlipNumber: number;
  expenseSlipNumber: number;
}

const ConfigSchema: Schema = new Schema<IConfig>(
  {
    maintenanceAmount: {
      type: Number,
      required: [true, "Maintenance amount is required"],
      min: [0, "Maintenance amount must be a positive number"],
    },
    maintenanceSlipNumber: {
      type: Number,
      required: [true, "Maintenance slip number is required"],
      min: [0, "Maintenance slip number must be a positive number"],
    },
    expenseSlipNumber: {
      type: Number,
      required: [true, "Expense slip number is required"],
      min: [0, "Expense slip number must be a positive number"],
    },
  },
  {
    timestamps: true,
  },
);

const ConfigModel = mongoose.model<IConfig>("Config", ConfigSchema);

export { ConfigModel, IConfig };
