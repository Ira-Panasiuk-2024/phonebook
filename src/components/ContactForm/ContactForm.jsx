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
    .matches(
      /^[a-zA-Z\s]+$/,
      'The name must contain only Latin letters and spaces'
    )
    .required('Required'),
  phoneNumber: Yup.string()
    .matches(
      /^(\+380|380)[0-9]{9}$/,
      'Phone number must be in the format +380XXXXXXXXX or 380XXXXXXXXX'
    )
    .required('Required'),
  email: Yup.string().email('Invalid email address').nullable(),
  isFavourite: Yup.boolean().default(false),
  contactType: Yup.string()
    .oneOf(
      ['work', 'home', 'personal'],
      'Contact type must be one of: work, home, personal'
    )
    .required('Required'),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const nameFieldId = useId();
  const phoneFieldId = useId();
  const emailFieldId = useId();
  const contactTypeFieldId = useId();
  const isFavouriteFieldId = useId();

  const handleSubmit = (values, { resetForm }) => {
    const submittedValues = {
      ...values,
      isFavourite: values.isFavourite === true || values.isFavourite === 'true',
      email: values.email === '' ? null : values.email,
    };
    dispatch(addContactOperation(submittedValues));
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: '',
        phoneNumber: '',
        email: '',
        isFavourite: false,
        contactType: 'personal',
      }}
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
            name="phoneNumber"
            id={phoneFieldId}
            placeholder="Enter phone number..."
          />
          <ErrorMessage
            name="phoneNumber"
            className={css.error}
            component="span"
          />
        </div>

        <div>
          <label className={css.label} htmlFor={emailFieldId}>
            Email
          </label>
          <Field
            className={css.field}
            type="email"
            name="email"
            id={emailFieldId}
            placeholder="Enter email (optional)..."
          />
          <ErrorMessage name="email" className={css.error} component="span" />
        </div>

        <div>
          <label className={css.label} htmlFor={contactTypeFieldId}>
            Contact Type
          </label>
          <Field
            as="select"
            className={css.field}
            name="contactType"
            id={contactTypeFieldId}
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="home">Home</option>
          </Field>
          <ErrorMessage
            name="contactType"
            className={css.error}
            component="span"
          />
        </div>

        <div className={css.checkboxGroup}>
          <Field
            type="checkbox"
            name="isFavourite"
            id={isFavouriteFieldId}
            className={css.checkbox}
          />
          <label className={css.label} htmlFor={isFavouriteFieldId}>
            Is Favourite
          </label>
          <ErrorMessage
            name="isFavourite"
            className={css.error}
            component="span"
          />
        </div>

        <button className={css.btn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
