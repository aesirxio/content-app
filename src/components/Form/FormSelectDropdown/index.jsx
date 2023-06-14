import React, { Component } from 'react';

import { AesirXSelect as SelectComponent } from 'aesirx-uikit';

import { components } from 'react-select';

// import "./index.module.scss";

class FormSelectDropdown extends Component {
  constructor(props) {
    super(props);

    this.field = this.props.field;
  }

  render() {
    return (
      <SelectComponent
        defaultValue={this.field.value}
        onChange={this.field.changed}
        options={this.field.option}
        isBorder={true}
        plColor="rgba(8, 18, 64, 0.8)"
        isMulti={this.field.isMulti ?? false}
        components={{
          Option: this.field.optionComponent ? this.field.optionComponent : components.Option,
          Placeholder: this.field.placeholderComponent
            ? this.field.placeholderComponent
            : components.Placeholder,
        }}
        className={this.field.classNameInput}
        async={this.field.async ?? false}
        loadOptions={this.field.loadOptions ?? null}
        cacheOptions
        placeholder={this.field.placeholder}
      />
    );
  }
}

export default FormSelectDropdown;
