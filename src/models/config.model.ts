import mongoose, { Document, Schema } from "mongoose";

interface ISettings extends Document {
  maintenanceAmount: number;
  maintenanceSlipNumber: number;
  expenseSlipNumber: number;
}

const SettingsSchema: Schema = new Schema<ISettings>(
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

const SettingsModel = mongoose.model<ISettings>("Settings", SettingsSchema);

export default SettingsModel;
