import { Field, Form, Formik, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { registerThunk } from '../../redux/auth/operations';
import css from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const initialValues = {
    password: '',
    email: '',
    name: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .max(17, 'Name must be 17 characters or less')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, options) => {
    
    dispatch(registerThunk(values))
      .unwrap()
      .then(() => navigate('/'));
    options.resetForm();
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        <Form className={css.form}>

          <h3 className={css.title}>Registration</h3>
          
          <div>
            <label className={css.label} htmlFor="name">
              Name
            </label>
            <Field
              className={css.field}
              type="text"
              name="name"
              autoComplete="name"
              id="name"
            />
            <ErrorMessage name="name" className={css.error} component="span" />
          </div>

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
              autoComplete="new-password"
              id="password"
            />
            <ErrorMessage name="password" className={css.error} component="span" />
          </div>

          <button type='submit' className={css.btn}>
            Registration
          </button>

          <p className={css.text}> 
            You already have account?

            <Link to='/login' className={css.link}>
              Login !{' '}
            </Link>

          </p>

        </Form>
      </Formik>
    </>
  );
};
export default RegistrationForm;
