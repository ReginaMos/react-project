import {
    configureStore,
    createSlice,
    nanoid,
    type PayloadAction,
} from '@reduxjs/toolkit';
import type { FormData } from '../models/models';

interface FormsState {
    forms: FormData[];
    countries: string[];
}

const initialState: FormsState = {
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

const formsSlice = createSlice({
    name: 'forms',
    initialState,
    reducers: {
        saveForm: (state, action: PayloadAction<FormData>) => {
            state.forms.push({
                ...action.payload,
                id: nanoid(),
            });
        },
    },
});

export const { saveForm } = formsSlice.actions;

export default formsSlice.reducer;

export const store = configureStore({
    reducer: {
        forms: formsSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
