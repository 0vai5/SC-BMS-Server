import { ZodSchema, SafeParseReturnType } from "zod";

type ValidateResult<T> = {
  success: boolean;
  data?: T;
  error?: SafeParseReturnType<T, T>["error"];
};

const validate = <T>(schema: ZodSchema<T>, data: any): ValidateResult<T> => {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return { success: false, error: result.error };
};

export default validate;
