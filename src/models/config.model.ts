import mongoose, { Document, Schema } from "mongoose";

interface IConfig extends Document {
  maintenanceAmount: number;
  slipNumber: number;
}

const ConfigSchema: Schema = new Schema<IConfig>(
  {
    maintenanceAmount: {
      type: Number,
      required: [true, "Maintenance amount is required"],
      min: [0, "Maintenance amount must be a positive number"],
    },
    slipNumber: {
      type: Number,
      required: [true, "Slip number is required"],
      min: [0, "Slip number must be a positive number"],
    },
  },
  {
    timestamps: true,
  },
);

const ConfigModel = mongoose.model<IConfig>("Config", ConfigSchema);

export { ConfigModel, IConfig };
