import { z } from "zod";

const MaintenanceSlipSchema = z.object({
  slipNumber: z.number().positive("Slip number must be a positive number"),
  amount: z.number().positive("Amount must be a positive number"),
  date: z
    .date()
    .refine((date) => date <= new Date(), "Date cannot be in the future"),
  month: z.number().int().min(1).max(12, "Month must be between 1 and 12"),
  year: z
    .number()
    .int()
    .min(2000, "Year must be greater than or equal to 2000")
    .max(
      new Date().getFullYear(),
      `Year cannot be greater than ${new Date().getFullYear()}`,
    ),
  status: z.enum(["paid", "unpaid", "overdue"]).default("unpaid"),
});

type MaintenanceSlip = z.infer<typeof MaintenanceSlipSchema>;

export { MaintenanceSlipSchema, MaintenanceSlip };
