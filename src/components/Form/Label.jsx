import React from 'react';
import { Form } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
class Label extends React.Component {
  render() {
    let { text, required, labelClassName } = this.props;
    const { t } = this.props;
    return (
      <Form.Label className={`mb-8px ws-nowrap ${labelClassName ?? 'fw-semibold'}`}>
        {t(text)}
        {required && <span className="text-red-1">*</span>}
      </Form.Label>
    );
  }
}

export default withTranslation('common')(Label);
