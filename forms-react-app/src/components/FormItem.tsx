import type { FormData } from '../models/models';
import '../styles/FormItem.css';

interface FormItemProps {
    item: FormData;
    isLast: boolean;
}

export default function FormItem({ item, isLast }: FormItemProps) {
    return (
        <div className={`form-item-container ${isLast ? 'lastChild' : ''}`}>
            <div className="form-field">Name: {item.name}</div>

            <div className="form-field">Age: {item.age}</div>

            <div className="form-field">E-mail: {item.email}</div>

            <div className="form-field">Password: {item.password}</div>

            <div className="form-field">
                Confirmed password: {item.confirmPassword}
            </div>

            <div className="form-field">Gender: {item.gender}</div>

            <div className="form-field">Terms: {item.terms ? 'Yes' : 'No'}</div>

            <div className="form-field">Country: {item.country}</div>

            <div className="form-field">
                <img src={item.picture} alt="item-picture" />
            </div>
        </div>
    );
}
