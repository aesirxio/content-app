import React, { Component } from 'react';

import { AesirXSelect as SelectComponent } from 'aesirx-uikit';
import './index.scss';

class FormSelection extends Component {
  constructor(props) {
    super(props);

    this.field = this.props.field;
  }

  render() {
    return (
      <SelectComponent
        value={this.field.getValueSelected}
        options={this.field.getDataSelectOptions}
        // className="mb-3 text-danger"
        isBorder={true}
        plColor="rgba(8, 18, 64, 0.8)"
        //onFocus={this.field.changed}
        onBlur={this.field.blurred}
        // isMulti={multi}
        onChange={this.field.handleChange}
      />
    );
  }
}

export default FormSelection;
