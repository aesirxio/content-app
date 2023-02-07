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
      url: '',
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
          notify('Please input WordPress API URL fields', 'warn');
          this.validator.showMessages();
        }
        this.setState({ loading: false });
      };
      return (
        <div className="bg-white p-4 rounded-2">
          <div className="row justify-content-between align-items-end mb-3">
            <Form className="col-6">
              <Form.Group>
                <Form.Label className={`mb-8px ws-nowrap fw-semibold`}>
                  WordPress API URL
                  <span className="text-red-1">*</span>
                </Form.Label>
                <Input
                  field={{
                    type: FORM_FIELD_TYPE.INPUT,
                    value: this.formPropsData['url'],
                    changed: (e) => {
                      this.formPropsData['url'] = e.target.value;
                      console.log(e.target.value);
                    },
                    blurred: () => {
                      this.validator.showMessageFor('WordPress API URL');
                    },
                  }}
                />
                {this.validator.message(
                  'WordPress API URL',
                  this.formPropsData['url'],
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
