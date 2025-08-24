import { useForm } from 'react-hook-form';
import { formSchema, type formData } from '../validation/validationSchema';
import type { FormData } from '../models/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';
import { type RootState, saveForm } from '../store/store';
import { toBase64 } from '../utils/convertToBse64';
import '../styles/Form.css';

interface HookFormProps {
    onClose: () => void;
}

export default function HookForm({ onClose }: HookFormProps) {
    const countries = useSelector((state: RootState) => state.countries);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
    } = useForm<formData>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
    });

    const password = watch('password', '');

    const getStrength = (pwd: string) => {
        let score = 0;
        if (pwd.length >= 8) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
        if (/[^a-zA-Z0-9]/.test(pwd)) score++;
        return score;
    };

    const strength = getStrength(password);
    const strengthLabel = [
        'Too weak',
        'Weak',
        'Medium',
        'Strong',
        'Very strong',
    ][strength];

    const onSubmit = async (data: formData) => {
        const file = data.picture?.[0] as File;

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
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="form-heading">React Hook Form</div>

            <div className="form-item">
                <label htmlFor="name">Name</label>
                <input id="name" {...register('name')} />
                {errors.name && (
                    <span className="error-message">{errors.name.message}</span>
                )}
            </div>
            <div className="form-item">
                <label htmlFor="age">Age</label>
                <input
                    id="age"
                    type="number"
                    {...register('age', { valueAsNumber: true })}
                />
                {errors.age && (
                    <span className="error-message">{errors.age.message}</span>
                )}
            </div>
            <div className="form-item">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" {...register('email')} />
                {errors.email && (
                    <span className="error-message">
                        {errors.email.message}
                    </span>
                )}
            </div>

            <div className="form-item">
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    type="password"
                    {...register('password')}
                />
                {errors.password && (
                    <span className="error-message">
                        {errors.password.message}
                    </span>
                )}

                {password && (
                    <div className={`password-strength strength-${strength}`}>
                        {strengthLabel}
                    </div>
                )}
            </div>
            <div className="form-item">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    id="confirmPassword"
                    type="password"
                    {...register('confirmPassword')}
                />

                {errors.confirmPassword && (
                    <span className="error-message">
                        {errors.confirmPassword.message}
                    </span>
                )}
            </div>

            <div className="form-item">
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

                {errors.gender && (
                    <span className="error-message">
                        {errors.gender.message}
                    </span>
                )}
            </div>

            <div className="form-item">
                <label htmlFor="terms">
                    <input id="terms" type="checkbox" {...register('terms')} />
                    Accept Terms & Conditions
                </label>

                {errors.terms && (
                    <span className="error-message">
                        {errors.terms.message}
                    </span>
                )}
            </div>

            <div className="form-item">
                <label htmlFor="picture">Picture (PNG/JPEG, max 5MB)</label>
                <input
                    id="picture"
                    type="file"
                    accept=".png,.jpeg,.jpg"
                    {...register('picture')}
                />

                {errors.picture && (
                    <span className="error-message">
                        {errors.picture.message}
                    </span>
                )}
            </div>

            <div className="form-item">
                <label htmlFor="country">Country</label>
                <input id="country" list="countries" {...register('country')} />
                <datalist id="countries">
                    {countries.map((ct: string) => (
                        <option key={ct} value={ct} />
                    ))}
                </datalist>

                {errors.country && (
                    <span className="error-message">
                        {errors.country.message}
                    </span>
                )}
            </div>
            <button type="submit" disabled={!isValid}>
                Submit
            </button>
        </form>
    );
}
