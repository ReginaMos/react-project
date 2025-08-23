import React from 'react';
import { formSchema } from '../validation/validationSchema';
import { connect } from 'react-redux';
import { type RootState, saveForm } from '../store/store';
import { toBase64 } from '../utils/convertToBse64';
import type { FormData } from '../models/models';

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
        const formData = new FormData(this.formRef.current);
        const file = formData.get('picture') as File | null;

        const saveData = {
            name: formData.get('name'),
            age: Number(formData.get('age')),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            gender: formData.get('gender'),
            terms: formData.get('terms') === 'on',
            country: formData.get('country'),
            picture: file,
        };

        const parseResult = formSchema.safeParse(saveData);

        if (!parseResult.success) {
            const errors = parseResult.error.flatten().fieldErrors;
            this.setState({ errors });
            return;
        }

        const validData = parseResult.data;

        if (file) {
            const base64 = await toBase64(file);
            const updatedData: FormData = {
                ...validData,
                picture: base64,
            };

            saveForm(updatedData);
        }
        this.setState({ errors: {} });
        alert('Form submitted successfully');
    };

    render() {
        const { errors } = this.state;
        const { countries } = this.props;

        return (
            <form ref={this.formRef} onSubmit={this.handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input id="name" type="text" />
                {errors.name && <div>{errors.name}</div>}

                <label htmlFor="age">Age:</label>
                <input id="age" type="number" />
                {errors.age && <div>{errors.age}</div>}

                <label htmlFor="email">Email:</label>
                <input id="email" type="email" />
                {errors.email && <div>{errors.email}</div>}

                <label htmlFor="password">Password:</label>
                <input id="password" type="password" />
                {errors.password && <div>{errors.password}</div>}

                <label htmlFor="confirmPassword">Repeat password:</label>
                <input id="confirmPassword" type="password" />
                {errors.confirmPassword && <div>{errors.confirmPassword}</div>}

                <fieldset>
                    <legend>Gender</legend>
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
                {errors.gender && <div>{errors.gender}</div>}

                <label htmlFor="terms">
                    <input id="terms" type="checkbox" /> Accept Terms and
                    Conditions
                </label>
                {errors.terms && <div>{errors.terms}</div>}

                <label htmlFor="picture">Picture (PNG/JPEG):</label>
                <input id="picture" type="file" accept="image/png,image/jpeg" />
                {errors.picture && <div>{errors.picture}</div>}

                <label htmlFor="country">Country:</label>
                <input id="country" list="countryList" />
                <datalist id="countryList">
                    {countries.map((c: string) => (
                        <option key={c} value={c} />
                    ))}
                </datalist>
                {errors.country && <div>{errors.country}</div>}

                <button type="submit">Submit</button>
            </form>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    countries: state.countries,
});

const mapDispatchToProps = {
    saveForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(UncontrolledForm);
