import { useDispatch } from 'react-redux';
import { addContactOperation } from '../../redux/contacts/operations';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import css from './ContactForm.module.css';

const ContactFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(17, 'Too Long!')
    .matches(/^[a-zA-Z\s]+$/, 'The name must contain only Latin letters')
    .required('Required'),
  number: Yup.string()
    .matches(
      /^\d{3}-\d{3}-\d{4}$/,
      'Phone number must be in the format XXX-XXX-XXXX'
    )
    .required('Required'),
});

function ContactForm() {
  const dispatch = useDispatch();
  const nameFieldId = useId();
  const phoneFieldId = useId();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addContactOperation(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      onSubmit={handleSubmit}
      validationSchema={ContactFormSchema}
    >
      <Form className={css.form}>
        <div>
          <label className={css.label} htmlFor={nameFieldId}>
            Name
          </label>
          <Field
            className={css.field}
            type="text"
            name="name"
            id={nameFieldId}
            placeholder="Enter name..."
          />
          <ErrorMessage name="name" className={css.error} component="span" />
        </div>

        <div>
          <label className={css.label} htmlFor={phoneFieldId}>
            Number
          </label>
          <Field
            className={css.field}
            type="tel"
            name="number"
            id={phoneFieldId}
            placeholder="Enter phone number (XXX-XXX-XXXX)..."
          />
          <ErrorMessage name="number" className={css.error} component="span" />
        </div>

        <button className={css.btn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}

export default ContactForm;
