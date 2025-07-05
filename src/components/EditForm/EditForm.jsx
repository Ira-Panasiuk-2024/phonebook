import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import css from './EditForm.module.css';

const EditFormSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Too Short!').max(20, 'Too Long!'),
  phoneNumber: Yup.string().matches(
    /^(\+380|380)[0-9]{9}$/,
    'Phone number must be in the format +380XXXXXXXXX or 380XXXXXXXXX'
  ),
  email: Yup.string().email('Invalid email address').nullable(),
  isFavourite: Yup.boolean(),
  contactType: Yup.string().oneOf(
    ['work', 'home', 'personal'],
    'Contact type must be one of: work, home, personal'
  ),
});

const EditForm = ({ contact, onSave, onCancel }) => {
  const nameFieldId = useId();
  const phoneFieldId = useId();
  const emailFieldId = useId();
  const contactTypeFieldId = useId();
  const isFavouriteFieldId = useId();

  const handleSubmit = values => {
    const updatedValues = {};
    if (values.name !== contact.name) {
      updatedValues.name = values.name;
    }
    if (values.phoneNumber !== contact.phoneNumber) {
      updatedValues.phoneNumber = values.phoneNumber;
    }
    if (values.email !== contact.email) {
      updatedValues.email = values.email === '' ? null : values.email;
    }
    if (values.isFavourite !== contact.isFavourite) {
      updatedValues.isFavourite = values.isFavourite;
    }
    if (values.contactType !== contact.contactType) {
      updatedValues.contactType = values.contactType;
    }

    onSave({ id: contact._id, ...updatedValues });
  };

  return (
    <Formik
      initialValues={{
        name: contact.name || '',
        phoneNumber: contact.phoneNumber || '',
        email: contact.email || '',
        isFavourite: contact.isFavourite || false,
        contactType: contact.contactType || 'personal',
      }}
      onSubmit={handleSubmit}
      validationSchema={EditFormSchema}
      enableReinitialize={true}
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

        <div className={css.wrap}>
          <button className={css.btn} type="submit">
            Save
          </button>

          <button className={css.btn} type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default EditForm;
