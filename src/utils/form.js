import React, { lazy } from 'react';
import Label from '../components/Form/Label';
import { FORM_FIELD_TYPE } from '../constants/FormFieldType';
import { Form } from 'react-bootstrap';
import FormAgeField from '../components/Form/FormAgeField';
import { FormEditor, CustomizedDatePicker } from 'aesirx-uikit';
import FormDatePublish from 'components/Form/FormDatePublish';

const FormDateRangePicker = lazy(() => import('../components/Form/FormDateRangePicker'));
const FormImage = lazy(() => import('../components/Form/FormImage'));
const FormSelection = lazy(() => import('../components/Form/FormSelection'));
const FormSelectionPersona = lazy(() => import('../components/Form/FormSelectionPersona'));
const FormInformation = lazy(() => import('../components/FormInformation'));
const FormSelectDropdown = lazy(() => import('../components/Form/FormSelectDropdown'));
const FormRadio = lazy(() => import('../components/Form/FormRadio'));

const Input = lazy(() => import('../components/Form/Input'));
const FormCheckBoxField = lazy(() => import('../components/Form/FormCheckBoxField'));

const renderingGroupFieldHandler = (group, validator) => {
  return Object.keys(group.fields)
    ?.map((fieldIndex) => {
      return [...Array(group.fields[fieldIndex])].map((field) => {
        return (() => {
          let className = field.className ? field.className : '';
          switch (field.type) {
            case FORM_FIELD_TYPE.INPUT:
              return (
                <Form.Group key={field.key} className={`mb-24 ${className}`}>
                  <Label
                    labelClassName={field.labelClassName}
                    text={field.label}
                    required={field.required ?? false}
                  />
                  <Input field={field} />
                  {field.validation &&
                    validator.message(field.label, field.value, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );
            case FORM_FIELD_TYPE.BUTTON:
              return (
                <React.Fragment key={Math.random(40, 200)}>
                  <div className={field.classNameWrapper}>
                    <div className="row">
                      {field.buttons.map((button, key) => {
                        return (
                          <div key={key} className={button.classNameGroup}>
                            <button
                              type="button"
                              onClick={async () => {
                                if (button.buttonType === 'submit') {
                                  await validator.showMessages();
                                  if (validator.allValid()) {
                                    console.log('[Valid]', validator);
                                    button.buttonClick.handleButton('submit');
                                  } else {
                                    console.log('[No Valid]');
                                  }
                                } else {
                                  button.buttonClick.handleButton();
                                }
                              }}
                              className={button.classNameButton}
                            >
                              {button.addIcon && <span className="material-icons fs-8">add</span>}
                              <span>{button.label}</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </React.Fragment>
              );

            case FORM_FIELD_TYPE.TEXTAREA:
              return (
                <Form.Group key={field.key} className={`mb-24 ${className}`}>
                  <Label
                    labelClassName={field.labelClassName}
                    text={field.label}
                    required={field.required ?? false}
                  />
                  <Form.Control
                    rows={4}
                    as="textarea"
                    defaultValue={field.value}
                    required={field.required ?? false}
                    id={field.key}
                    className={field.classNameInput}
                    onChange={field.changed ?? undefined}
                    onBlur={field.blurred ?? undefined}
                  />

                  {field.validation &&
                    validator.message(field.label, field.value, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );

            case FORM_FIELD_TYPE.DATERANGE:
              return (
                <FormDateRangePicker
                  key={Math.random(40, 200)}
                  field={field}
                  validator={validator}
                />
              );

            case FORM_FIELD_TYPE.DATE:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-24 ${className}`}>
                  <div
                    className={`${
                      field?.isInline && 'd-flex justify-content-between align-items-center'
                    }`}
                  >
                    <Label labelClassName={field.labelClassName} text={field.label} />
                    <FormDatePublish changed={(date) => field.changed(date)} field={field} />
                  </div>
                  {field.validation &&
                    validator.message(field.label, field.value, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );
            case FORM_FIELD_TYPE.IMAGE:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-24 ${className}`}>
                  <Label
                    labelClassName={field.labelClassName}
                    text={field.label}
                    required={field.required ?? false}
                  />

                  <FormImage key={Math.random(40, 200)} field={field} />
                </Form.Group>
              );

            case FORM_FIELD_TYPE.SELECTION:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-24 ${className}`}>
                  {field.label && (
                    <Label
                      labelClassName={field.labelClassName}
                      text={field.label}
                      required={field.required ?? false}
                    />
                  )}

                  <FormSelection key={Math.random(40, 200)} field={field} />

                  {field.validation &&
                    validator.message(field.label, field.value, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );
            case FORM_FIELD_TYPE.SELECTIONPERSONA:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-24 ${className}`}>
                  <Label
                    labelClassName={field.labelClassName}
                    text={field.label}
                    required={field.required ?? false}
                  />

                  <FormSelectionPersona key={Math.random(40, 200)} field={field} />

                  {field.validation &&
                    validator.message(field.label, field.value, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );
            case FORM_FIELD_TYPE.DROPDOWN:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-24 ${className}`}>
                  <div
                    className={`${
                      field?.isInline && 'd-flex justify-content-between align-items-center'
                    }`}
                  >
                    {field.label && (
                      <Label
                        labelClassName={field.labelClassName}
                        text={field.label}
                        required={field.required ?? false}
                      />
                    )}
                    <FormSelectDropdown field={field} />
                  </div>
                  {field.validation &&
                    validator.message(field.label, field.value, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );
            case FORM_FIELD_TYPE.RADIO:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-24 ${className}`}>
                  <Label
                    labelClassName={field.labelClassName}
                    text={field.label}
                    required={field.required ?? false}
                  />
                  <FormRadio field={field} />
                </Form.Group>
              );

            case FORM_FIELD_TYPE.INFORMATION:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-24 ${className}`}>
                  <Label
                    labelClassName={field.labelClassName}
                    text={field.label}
                    required={field.required ?? false}
                  />
                  <FormInformation field={field} />
                </Form.Group>
              );

            case FORM_FIELD_TYPE.BIRTHDAY:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-24 ${className}`}>
                  <Label labelClassName={field.labelClassName} text={field.label} />
                  <div className="form-control w-full">
                    <CustomizedDatePicker
                      handleOnChange={(date) => field.changed(date)}
                      defaultDate={field.value ? field.value.split(' ')[0] : null}
                    />
                  </div>
                </Form.Group>
              );

            case FORM_FIELD_TYPE.AGE:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-24 ${className}`}>
                  <Label
                    labelClassName={field.labelClassName}
                    text={field.label}
                    required={field.required ?? false}
                  />
                  <FormAgeField field={field} />
                  {field.validation &&
                    validator.message(field.label, field.valueFrom, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );

            case FORM_FIELD_TYPE.CHECKBOX:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-24 ${className}`}>
                  <Label
                    labelClassName={field.labelClassName}
                    text={field.label}
                    required={field.required ?? false}
                  />
                  <FormCheckBoxField field={field} />
                  {field.validation &&
                    validator.message(field.label, field.value, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );

            case FORM_FIELD_TYPE.EDITOR:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-24 ${className}`}>
                  <Label
                    labelClassName={field.labelClassName}
                    text={field.label}
                    required={field.required ?? false}
                  />
                  <FormEditor field={field} />
                  {field.validation &&
                    validator.message(field.label, field.value, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );
            default:
              return null;
          }
        })();
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
};

export { renderingGroupFieldHandler };
