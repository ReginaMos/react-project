import { z } from 'zod';

export const formSchema = z
    .object({
        name: z.string().regex(/^[A-Z]/, 'Name must start with uppercase'),
        age: z.number().min(0, 'Age must be non-negative'),
        email: z.string().email('Invalid email, use email@email.com schema'),
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
            .instanceof(File)
            .refine(
                (file) => ['image/png', 'image/jpeg'].includes(file.type),
                'Only PNG or JPEG'
            )
            .refine((file) => file.size <= 5 * 1024 * 1024, 'Max size is 5MB'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords must match',
        path: ['confirmPassword'],
    });

export type formData = z.infer<typeof formSchema>;
