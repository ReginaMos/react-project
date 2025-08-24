import { z } from 'zod';

export const formSchema = z
    .object({
        name: z.string().regex(/^[A-Z]/, 'Name must start with uppercase'),
        age: z.number().min(0, 'Age must be non-negative'),
        email: z.string().email('Invalid email, use email@email.com'),
        password: z
            .string()
            .min(8, 'Password too short')
            .regex(/[A-Z]/, 'Must contain a uppercase')
            .regex(/[a-z]/, 'Must contain a lowercase')
            .regex(/[0-9]/, 'Must contain a number')
            .regex(/[!@#$%^&*]/, 'Must contain a special char'),
        confirmPassword: z.string(),
        gender: z.enum(['male', 'female']),
        terms: z.boolean().refine((val) => val === true, {
            message: 'Must accept terms',
        }),
        country: z.string().nonempty('Country required'),
        picture: z
            .instanceof(FileList)
            .refine((files) => files.length > 0, {
                message: 'File is important',
            })
            .refine(
                (files) =>
                    files.length > 0 &&
                    ['image/png', 'image/jpeg'].includes(files[0].type),
                {
                    message: 'Only PNG or JPEG',
                }
            )
            .refine(
                (files) => files.length > 0 && files[0].size <= 5 * 1024 * 1024,
                {
                    message: 'Max size is 5MB',
                }
            ),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords must match',
        path: ['confirmPassword'],
    });

export type formData = z.infer<typeof formSchema>;
