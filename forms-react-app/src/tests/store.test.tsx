import { describe, it, expect, beforeEach } from 'vitest';
import formsReducer, { saveForm, store } from '../store/store';
import type { FormData } from '../models/models';

describe('Redux Forms Slice', () => {
    let initialState: ReturnType<typeof formsReducer>;

    beforeEach(() => {
        initialState = {
            forms: [],
            countries: [
                'United States',
                'Canada',
                'Germany',
                'France',
                'Japan',
                'Australia',
                'Russia',
                'Brazil',
                'India',
                'China',
            ],
        };
    });

    it('should return the initial state', () => {
        expect(formsReducer(undefined, { type: '@@INIT' })).toEqual(
            initialState
        );
    });

    it('should handle saveForm action', () => {
        const newForm: FormData = {
            name: 'John Doe',
            age: 30,
            email: 'john@mail.com',
            password: 'Secret123!',
            confirmPassword: 'Secret123!',
            gender: 'male',
            terms: true,
            country: 'Canada',
            picture: 'base64string',
        };

        const action = saveForm(newForm);
        const nextState = formsReducer(initialState, action);

        expect(nextState.forms.length).toBe(1);
        expect(nextState.forms[0]).toMatchObject(newForm);
        expect(nextState.forms[0].id).toBeDefined();
    });

    it('should update store state after dispatching saveForm', () => {
        const form: FormData = {
            name: 'Jane Doe',
            age: 25,
            email: 'jane@mail.com',
            password: 'Password123',
            confirmPassword: 'Password123',
            gender: 'female',
            terms: true,
            country: 'Germany',
            picture: 'base64string',
        };

        store.dispatch(saveForm(form));
        const state = store.getState().forms;

        expect(state.forms.length).toBe(1);
        expect(state.forms[0]).toMatchObject(form);
        expect(state.forms[0].id).toBeDefined();
    });

    it('should not affect countries array when saving a form', () => {
        const form: FormData = {
            name: 'Alice',
            age: 28,
            email: 'alice@mail.com',
            password: 'SecretPwd123',
            confirmPassword: 'SecretPwd123',
            gender: 'female',
            terms: true,
            country: 'France',
            picture: 'base64string',
        };

        const nextState = formsReducer(initialState, saveForm(form));
        expect(nextState.countries).toEqual(initialState.countries);
    });

    it('selector test: should get countries from state', () => {
        const state = store.getState();
        expect(state.forms.countries).toContain('Canada');
        expect(state.forms.countries).toContain('Japan');
    });
});
