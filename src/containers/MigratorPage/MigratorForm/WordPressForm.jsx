import Input from 'components/Form/Input';
import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import SimpleReactValidator from 'simple-react-validator';
import { observer } from 'mobx-react';
import { notify } from 'components/Toast';
import { withMigratorViewModel } from '../MigratorViewModels/MigratorViewModelContextProvider';
import { WORDPRESS_FIELDS } from '../MigratorUtils/wordpress';
import { withTranslation } from 'react-i18next';
const WordPressForm = observer(
  class WordPressForm extends Component {
    wordPressFormViewModel = '';
    formPropsData = {
      [WORDPRESS_FIELDS.URL]: '',
    };
    constructor(props) {
      super(props);
      this.wordPressFormViewModel = props.viewModel.getWordPressFormViewModel();
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
        notify('Please input WordPress API URL fields', 'warn');
        this.validator.showMessages();
      }
      this.setState({ loading: false });
    };

    render() {
      const { t } = this.props;
      const { loading } = this.state;
      return (
        <>
          <h2 className="text-blue-0 fw-bold mb-4">{t('txt_migrator_wordpress')}</h2>
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
                      value: this.wordPressFormViewModel.formPropsData[WORDPRESS_FIELDS.URL],
                      changed: (e) => {
                        this.wordPressFormViewModel.formPropsData[WORDPRESS_FIELDS.URL] =
                          e.target.value;
                      },
                      blurred: () => {
                        this.validator.showMessageFor('WordPress API URL');
                      },
                    }}
                  />
                  {this.validator.message(
                    'WordPress API URL',
                    this.wordPressFormViewModel.formPropsData[WORDPRESS_FIELDS.URL],
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
export default withTranslation('common')(withMigratorViewModel(WordPressForm));
