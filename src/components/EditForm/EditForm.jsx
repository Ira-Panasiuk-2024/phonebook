import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import css from './EditForm.module.css';


const EditFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(17, 'Too Long!')
    .matches(
      /^[a-zA-Z\s]+$/,
      'The name must contain only Latin letters and spaces'
    )
    .required('Required'),
  number: Yup.string()
    .matches(
      /^\d{3}-\d{3}-\d{4}$/,
      'Phone number must be in the format XXX-XXX-XXXX'
    )
    .required('Required'),
});

function EditForm({ contact, onSave, onCancel }) {
  const nameFieldId = useId();
  const phoneFieldId = useId();

  const handleSubmit = (values, { resetForm }) => {
    onSave({ id: contact.id, ...values });
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: contact.name, number: contact.number }}
      onSubmit={handleSubmit}
      validationSchema={EditFormSchema}
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
            name="number"
            id={phoneFieldId}
          />
          <ErrorMessage name="number" className={css.error} component="span" />
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
}

export default EditForm;
