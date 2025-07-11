import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../types/authState.interface';
import { register } from './auth.action';

const initialState: AuthStateInterface = {
  isSubmitting: false,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(register, (state) => ({ ...state, isSubmitting: true }))
  ),
});

export const {
  name: authFeaturekey,
  reducer: authReducer,
  selectIsSubmitting,
} = authFeature;
