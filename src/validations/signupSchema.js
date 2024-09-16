import { object, ref, string } from 'yup';

export const signupSchema = object().shape({
  confirmPassword: string()
    .oneOf([ref('password'), null], 'Passwords must match')
    .required(),
  password: string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  email: string().required('Email is required').email('Invalid email'),
});
