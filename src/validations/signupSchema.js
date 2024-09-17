import { object, ref, string } from 'yup';

export const signupSchema = object().shape({
  confirmPassword: string()
    .oneOf([ref('password'), null], 'Las contraseñas deben coincidir')
    .required(),
  password: string()
    .required('Campo requerido')
    .min(6, 'La contraseña debe contener mínimo 6 caracteres'),
  email: string().required('Campo requerido').email('Email inválido'),
});
