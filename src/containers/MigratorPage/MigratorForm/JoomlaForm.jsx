import Input from 'components/Form/Input';
import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import SimpleReactValidator from 'simple-react-validator';
import { observer } from 'mobx-react';
import { notify } from 'components/Toast';
import { withMigratorViewModel } from '../MigratorViewModels/MigratorViewModelContextProvider';
import { JOOMLA_FIELDS } from '../MigratorUtils/joomla';
import { withTranslation } from 'react-i18next';
const JoomlaForm = observer(
  class JoomlaForm extends Component {
    joomlaFormViewmodel = '';
    formPropsData = {
      [JOOMLA_FIELDS.URL]: '',
      [JOOMLA_FIELDS.TOKEN]: '',
    };
    constructor(props) {
      super(props);
      this.joomlaFormViewmodel = props.viewModel?.getJoomlaFormViewModel();
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.state = {
        loading: false,
      };
    }
    hanldeClick = () => {
      const { nextStep } = this.props;
      this.setState({ loading: true });
      if (this.validator.allValid()) {
        nextStep();
      } else {
        notify('Please input all required fields', 'warn');
        this.validator.showMessages();
      }
      this.setState({ loading: false });
    };

    render() {
      const { t } = this.props;
      const { loading } = this.state;
      return (
        <>
          <h2 className="text-blue-0 fw-bold mb-4">{t('txt_migrator_joomla')}</h2>

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
                      value: this.joomlaFormViewmodel.formPropsData[JOOMLA_FIELDS.TOKEN],
                      changed: (e) => {
                        this.joomlaFormViewmodel.formPropsData[JOOMLA_FIELDS.TOKEN] =
                          e.target.value;
                      },
                      blurred: () => {
                        this.validator.showMessageFor('Joomla Bearer Token');
                      },
                    }}
                  />
                  {this.validator.message(
                    'Joomla Bearer Token',
                    this.joomlaFormViewmodel?.formPropsData[JOOMLA_FIELDS.TOKEN],
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
                      value: this.joomlaFormViewmodel.formPropsData[JOOMLA_FIELDS.URL],
                      changed: (e) => {
                        this.joomlaFormViewmodel.formPropsData[JOOMLA_FIELDS.URL] = e.target.value;
                      },
                      blurred: () => {
                        this.validator.showMessageFor('Joomla API URL');
                      },
                    }}
                  />
                  {this.validator.message(
                    'Joomla API URL',
                    this.joomlaFormViewmodel?.formPropsData[JOOMLA_FIELDS.URL],
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
                  onClick={this.hanldeClick}
                >
                  {t('txt_next_step')}
                </Button>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
);
export default withTranslation('common')(withMigratorViewModel(JoomlaForm));
