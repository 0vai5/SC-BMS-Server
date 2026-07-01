import { z } from "zod";

const FlatSchema = z.object({
  flatNumber: z
    .string()
    .trim()
    .min(1, "Flat number is required")
    .max(10, "Flat number cannot exceed 10 characters"),
  floor: z
    .number()
    .int()
    .min(1, "Floor must be a positive integer")
    .max(2)
    .min(1, "Floor must be a positive integer"),
  ownerName: z
    .string()
    .trim()
    .min(1, "Owner name is required")
    .max(50, "Owner name cannot exceed 50 characters"),
  ownerPhone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Owner phone must be a valid 10-digit number"),
  rooms: z
    .number()
    .int()
    .min(1, "Rooms must be a positive integer")
    .max(3, "Rooms cannot exceed 3")
    .min(2, "Rooms must be a positive integer"),
  isOccupied: z.boolean().default(true),
  isDeleted: z.boolean().default(false),
});

const FlatUpdateSchema = FlatSchema.partial({
    ownerName: true,
    ownerPhone: true,
    isOccupied: true,
    isDeleted: true,
});

type Flat = z.infer<typeof FlatSchema>;
type FlatUpdate = z.infer<typeof FlatUpdateSchema>;


export { FlatSchema, FlatUpdateSchema, Flat, FlatUpdate };
