import { z } from 'zod';


export const Add_employee_Schema = z.object({
    email: z.string().email().min(2, {message: "Email is required"})
  });
  
export type Add_emp_SchemaType = z.infer<typeof Add_employee_Schema>;



export const LoginSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(3, {message: "password must be greate then 3 characters"})
  });
  
export type LoginSchemaType = z.infer<typeof LoginSchema>;