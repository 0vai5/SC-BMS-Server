import { z } from "zod";

const ExpenseSchema = z.object({
  expenseType: z
    .string()
    .trim()
    .min(1, "Expense type is required")
    .max(50, "Expense type cannot exceed 50 characters"),
  amount: z.number().positive("Amount must be a positive number"),
  approvedBy: z
    .string()
    .trim()
    .min(1, "Approved by is required")
    .max(50, "Approved by cannot exceed 50 characters"),
  paidTo: z
    .string()
    .trim()
    .min(1, "Paid to is required")
    .max(50, "Paid to cannot exceed 50 characters"),
  isVariable: z.boolean().default(false),
  isMonthly: z.boolean().default(true),
  thisMonth: z.boolean().default(false),
  date: z
    .date()
    .refine((date) => date <= new Date(), "Date cannot be in the future"),
  isDeleted: z.boolean().default(false),
});

const UpdateExpenseSchema = ExpenseSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  "At least one field must be provided for update",
);

const ExpenseSlipSchema = z.object({
  expenseId: z.string().trim().min(1, "Expense ID is required"),
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
  status: z.enum(["paid", "unpaid"]).default("unpaid"),
});

type Expense = z.infer<typeof ExpenseSchema>;
type UpdateExpense = z.infer<typeof UpdateExpenseSchema>;
type ExpenseSlip = z.infer<typeof ExpenseSlipSchema>;

export {
  ExpenseSchema,
  UpdateExpenseSchema,
  Expense,
  UpdateExpense,
  ExpenseSlipSchema,
  ExpenseSlip,
};
