import Input from 'components/Form/Input';
import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import SimpleReactValidator from 'simple-react-validator';
import { observer } from 'mobx-react';
import { notify } from 'components/Toast';

const JoomlaForm = observer(
  class JoomlaForm extends Component {
    formPropsData = {
      joomla_bearer_token: '',
      joomla_api_url: '',
    };
    constructor(props) {
      super(props);
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.state = {
        loading: false,
      };
    }
    render() {
      const { nextStep } = this.props;
      const { loading } = this.state;
      const hanldeClick = () => {
        this.setState({ loading: true });
        if (this.validator.allValid()) {
          nextStep();
        } else {
          notify('Please input all required fields', 'warn');
          this.validator.showMessages();
        }
        this.setState({ loading: false });
      };
      return (
        <div className="bg-white p-4 rounded-2">
          <div className="row justify-content-between align-items-end mb-3">
            <Form className="col-10 row">
              <Form.Group className="col-lg-6">
                <Form.Label className={`mb-8px ws-nowrap fw-semibold`}>
                  Joomla Bearer Token
                  <span className="text-red-1">*</span>
                </Form.Label>
                <Input
                  field={{
                    type: FORM_FIELD_TYPE.INPUT,
                    value: this.formPropsData['joomla_bearer_token'],
                    changed: (e) => {
                      this.formPropsData['joomla_bearer_token'] = e.target.value;
                      console.log(e.target.value);
                    },
                    blurred: () => {
                      this.validator.showMessageFor('Joomla Bearer Token');
                    },
                  }}
                />
                {this.validator.message(
                  'Joomla Bearer Token',
                  this.formPropsData['joomla_bearer_token'],
                  'required',
                  {
                    className: 'text-danger mt-1',
                  }
                )}
              </Form.Group>
              <Form.Group className="col-lg-6">
                <Form.Label className={`mb-8px ws-nowrap fw-semibold`}>
                  Joomla API URL
                  <span className="text-red-1">*</span>
                </Form.Label>
                <Input
                  field={{
                    type: FORM_FIELD_TYPE.INPUT,
                    value: this.formPropsData['joomla_api_url'],
                    changed: (e) => {
                      this.formPropsData['joomla_api_url'] = e.target.value;
                      console.log(e.target.value);
                    },
                    blurred: () => {
                      this.validator.showMessageFor('Joomla API URL');
                    },
                  }}
                />
                {this.validator.message(
                  'Joomla API URL',
                  this.formPropsData['joomla_api_url'],
                  'required',
                  {
                    className: 'text-danger mt-1',
                  }
                )}
              </Form.Group>
            </Form>
            <div className="col-2 text-end">
              <Button
                disabled={loading}
                variant="success"
                className="fw-semibold rounded-1 px-4"
                onClick={hanldeClick}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      );
    }
  }
);
export default JoomlaForm;
