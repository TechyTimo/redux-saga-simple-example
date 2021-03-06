import React from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { Input, Button, Message } from 'semantic-ui-react';

class SimpleForm extends React.Component {
  locationInput({ input, meta: { touched, error }, ...custom }) {
    const hasError = touched && error !== undefined;

    return (
      <div>
        {hasError &&
          <Message
            error
            header='Error'
            content={error}
          />
        }

        <Input
          error={hasError}
          fluid
          placeholder="Location..."
          {...input}
          {...custom}
        />
      </div>
    );
  }

  submit({ location }, dispatch) {
    return new Promise((resolve, reject) => {
      dispatch({
        type: 'FETCH_WEATHER',
        location,
        resolve,
        reject,
      });
    }).catch((error) => {
      throw new SubmissionError(error);
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <Field name="location" component={this.locationInput} />
        <br />
        <Button fluid type="submit">Submit</Button>
      </form>
    );
  }
}

const validate = (values) => {
  const { location } = values;
  const errors = {}

  if (!location || location.trim() === '') {
    errors.location = 'Location required';
  }

  return errors;
}

export default reduxForm({
  form: 'simple',
  validate,
})(SimpleForm)
