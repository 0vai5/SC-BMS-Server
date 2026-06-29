import { z } from "zod";
import { UserSchema } from "./user.schema";

const LoginSchema = UserSchema.pick({
  email: true,
  password: true,
});

type Login = z.infer<typeof LoginSchema>;

export { LoginSchema, Login };
