import { object, string } from 'yup';

export const loginSchema = object().shape({
  password: string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  email: string().required('Email is required').email('Invalid email'),
});
