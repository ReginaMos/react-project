import React from 'react';
import { formSchema } from '../validation/validationSchema';
import { connect } from 'react-redux';
import { type RootState, saveForm } from '../store/store';
import { toBase64 } from '../utils/convertToBse64';
import type { FormData } from '../models/models';
import '../styles/Form.css';

interface UncontrolledFormProps {
    countries: string[];
    saveForm: (data: FormData) => void;
    onClose: () => void;
}

interface UncontrolledFormState {
    errors: Record<string, string[] | undefined>;
}

class UncontrolledForm extends React.Component<
    UncontrolledFormProps,
    UncontrolledFormState
> {
    private formRef: React.RefObject<HTMLFormElement | null>;
    state: UncontrolledFormState = { errors: {} };

    constructor(props: UncontrolledFormProps) {
        super(props);
        this.formRef = React.createRef<HTMLFormElement>();
        this.state = { errors: {} };
    }

    handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!this.formRef.current) return;

        const raw = new FormData(this.formRef.current);
        const fileInput =
            this.formRef.current.querySelector<HTMLInputElement>('#picture');

        const saveData = {
            name: String(raw.get('name') ?? ''),
            age: Number(raw.get('age') ?? 0),
            email: String(raw.get('email') ?? ''),
            password: String(raw.get('password') ?? ''),
            confirmPassword: String(raw.get('confirmPassword') ?? ''),
            gender: String(raw.get('gender') ?? ''),
            terms: raw.has('terms'),
            country: String(raw.get('country') ?? ''),
            picture: fileInput?.files ?? new FileList(),
        };

        const parseResult = formSchema.safeParse(saveData);

        if (!parseResult.success) {
            const errors = parseResult.error.flatten().fieldErrors;
            this.setState({ errors });
            return;
        }

        const validData = parseResult.data;

        if (validData.picture.length > 0) {
            const base64 = await toBase64(validData.picture[0]);
            const updatedData: FormData = {
                ...validData,
                picture: base64,
            };

            this.props.saveForm(updatedData);
        }

        this.setState({ errors: {} });
        this.props.onClose();
    };

    render() {
        const { errors } = this.state;
        const { countries } = this.props;

        return (
            <form
                ref={this.formRef}
                onSubmit={this.handleSubmit}
                className="form"
            >
                <div className="form-heading">Uncontrolled Form</div>

                <div className="form-item">
                    <label htmlFor="name">Name:</label>
                    <input id="name" type="text" name="name" />
                    {errors.name && (
                        <span className="error-message">{errors.name}</span>
                    )}
                </div>

                <div className="form-item">
                    <label htmlFor="age">Age:</label>
                    <input id="age" type="number" name="age" />
                    {errors.age && (
                        <span className="error-message">{errors.age}</span>
                    )}
                </div>

                <div className="form-item">
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="email" name="email" />
                    {errors.email && (
                        <span className="error-message">{errors.email}</span>
                    )}
                </div>

                <div className="form-item">
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="password" name="password" />

                    {errors.password && (
                        <span className="error-message">{errors.password}</span>
                    )}
                </div>

                <div className="form-item">
                    <label htmlFor="confirmPassword">Repeat password:</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                    />
                    {errors.confirmPassword && (
                        <span className="error-message">
                            {errors.confirmPassword}
                        </span>
                    )}
                </div>

                <div className="form-item">
                    <fieldset>
                        <legend>Gender:</legend>
                        <label htmlFor="male">
                            <input
                                id="male"
                                type="radio"
                                name="gender"
                                value="male"
                            />
                            Male
                        </label>
                        <label htmlFor="female">
                            <input
                                id="female"
                                type="radio"
                                name="gender"
                                value="female"
                            />
                            Female
                        </label>
                    </fieldset>

                    {errors.gender && (
                        <span className="error-message">{errors.gender}</span>
                    )}
                </div>

                <div className="form-item">
                    <label htmlFor="terms">
                        <input id="terms" type="checkbox" name="terms" />
                        Accept Terms and Conditions
                    </label>

                    {errors.terms && (
                        <span className="error-message">{errors.terms}</span>
                    )}
                </div>

                <div className="form-item">
                    <label htmlFor="picture">Picture (PNG/JPEG, max 5MB)</label>
                    <input
                        id="picture"
                        type="file"
                        accept="image/png,image/jpeg"
                    />

                    {errors.picture && (
                        <span className="error-message">{errors.picture}</span>
                    )}
                </div>

                <div className="form-item">
                    <label htmlFor="country">Country:</label>
                    <select id="country" name="country">
                        <option value="">Select country</option>
                        {countries.map((ct: string) => (
                            <option key={ct} value={ct}>
                                {ct}
                            </option>
                        ))}
                    </select>

                    {errors.country && (
                        <span className="error-message">{errors.country}</span>
                    )}
                </div>

                <button type="submit">Submit</button>
            </form>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    countries: state.forms.countries,
});

const mapDispatchToProps = {
    saveForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(UncontrolledForm);
