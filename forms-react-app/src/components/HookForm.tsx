import { useForm } from 'react-hook-form';
import { formSchema, type formData } from '../validation/validationSchema';
import type { FormData } from '../models/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';
import { type RootState, saveForm } from '../store/store';
import { toBase64 } from '../utils/convertToBse64';

interface HookFormProps {
    onClose: () => void;
}

export default function HookForm({ onClose }: HookFormProps) {
    const countries = useSelector((state: RootState) => state.countries);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<formData>({ resolver: zodResolver(formSchema) });

    const onSubmit = async (data: formData) => {
        const file = data.picture as unknown as File;

        try {
            const base64 = await toBase64(file);
            const updatedData: FormData = {
                ...data,
                picture: base64,
            };
            saveForm(updatedData);

            console.log('Submitted:', updatedData);
            onClose();
        } catch (err) {
            console.error('Ошибка при чтении файла:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name">Name</label>
                <input id="name" {...register('name')} />
                {errors.name && <span>{errors.name.message}</span>}
            </div>
            <div>
                <label htmlFor="age">Age</label>
                <input id="age" type="number" {...register('age')} />
                {errors.age && <span>{errors.age.message}</span>}
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" {...register('email')} />
                {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    {...register('password')}
                />
                {errors.password && <span>{errors.password.message}</span>}
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    id="confirmPassword"
                    type="password"
                    {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                    <span>{errors.confirmPassword.message}</span>
                )}
            </div>

            <div>
                <span>Gender:</span>
                <label htmlFor="male">
                    <input
                        id="male"
                        type="radio"
                        value="male"
                        {...register('gender')}
                    />
                    Male
                </label>
                <label htmlFor="female">
                    <input
                        id="female"
                        type="radio"
                        value="female"
                        {...register('gender')}
                    />
                    Female
                </label>
                {errors.gender && <span>{errors.gender.message}</span>}
            </div>

            <div>
                <label htmlFor="terms">
                    <input id="terms" type="checkbox" {...register('terms')} />
                    Accept Terms & Conditions
                </label>
                {errors.terms && <span>{errors.terms.message}</span>}
            </div>

            <div>
                <label htmlFor="picture">Picture (PNG/JPEG, max 5MB)</label>
                <input
                    id="picture"
                    type="file"
                    accept=".png,.jpeg,.jpg"
                    {...register('picture')}
                />
                {errors.picture && <span>{errors.picture.message}</span>}
            </div>

            <div>
                <label htmlFor="country">Country</label>
                <input id="country" list="countries" {...register('country')} />
                <datalist id="countries">
                    {countries.map((ct: string) => (
                        <option key={ct} value={ct} />
                    ))}
                </datalist>
                {errors.country && <span>{errors.country.message}</span>}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}
