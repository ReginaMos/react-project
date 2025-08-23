export interface FormData {
    name: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
    gender: 'male' | 'female';
    terms: boolean;
    picture: string; // base64
    country: string;
}
