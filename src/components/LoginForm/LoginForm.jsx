import { Field, Form, Formik, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { loginThunk } from '../../redux/auth/operations';
import css from './LoginForm.module.css';

const LoginForm = () => {
  const initialValues = {
    password: '',
    email: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  });

  const dispatch = useDispatch();
 

  const handleSubmit = (values, options) => {
    
    dispatch(loginThunk(values));
    options.resetForm();
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        <Form className={css.form}>

          <h3 className={css.title}>Login</h3>

          <div>
            <label className={css.label} htmlFor="email">
              Email
            </label>
            <Field
              className={css.field}
              type="email"
              name="email"
              autoComplete="email"
              id="email"
            />
            <ErrorMessage name="email" className={css.error} component="span" />
          </div>

          <div>
            <label className={css.label} htmlFor="password">
              Password
            </label>
            <Field
              className={css.field}
              type="password"
              name="password"
              autoComplete="current-password"
              id="password"
            />
            <ErrorMessage name="password" className={css.error} component="span" />
          </div>
          
          <button type='submit' className={css.btn}>
            Login
          </button>

          <p className={css.text}> 
            You do not have account?

            <Link to='/registration' className={css.link}>Lets create one!</Link>

          </p>
        </Form>
      </Formik>
    </>
  );
};

export default LoginForm;
