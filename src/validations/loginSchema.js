import { object, string } from 'yup';

export const loginSchema = object().shape({
  password: string()
    .required('Campo requerido')
    .min(6, 'La contraseña debe contener mínimo 6 caracteres'),
  email: string().required('Campo requerido').email('Email inválido'),
});
