import React from 'react';
import styled from 'styled-components';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import swal from 'sweetalert';
import addToMailchimp from 'gatsby-plugin-mailchimp';

const Container = styled.form`
  margin-top: 1rem;
  input {
    background-color: #3e3e3e;
    border: 1px solid #979797;
    border-radius: 0px;
    color: #fff;
  }
`;

class SubscribeForm extends React.Component {
  render() {
    const {
      values,
      touched,
      errors,
      isSubmitting,
      handleSubmit,
      handleChange,
      handleBlur,
    } = this.props;

    return (
      <Container onSubmit={handleSubmit}>
        <div className="field">
          <div className="control">
            <input
              className="input is-shadowless"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your email"
            />
            {errors.email && touched.email && (
              <p className="help is-danger">{errors.email}</p>
            )}
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button
              type="submit"
              disabled={isSubmitting}
              className="button is-light"
            >
              Subscribe
            </button>
          </div>
        </div>
      </Container>
    );
  }
}
export default withFormik({
  mapPropsToValues: () => ({
    email: '',
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
  }),
  handleSubmit: (values, { setSubmitting }) => {
    addToMailchimp(values.email)
      .then(() => {
        swal('Subscribed successfully, thank you!');
        setSubmitting(false);
      })
      .catch(() => {
        swal('Subscription failed, please try again.', 'error');
        setSubmitting(false);
      });
  },
  displayName: 'SubscribeForm', // helps with React DevTools
})(SubscribeForm);
