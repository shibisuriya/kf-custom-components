/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { Trans } from "@lingui/macro";
import ApiPrinter from "./api.printer";

export default function ArrayOfObjectscc(props) {
  const {
    value,
    field,
    actions,
    disabled,
    parameter,
    readonly,
    errors,
    theme,
    fetchKfApi
  } = props;

  const { id, name, type, isRequired, hint, defaultValue, color } = field;

  const { updateValue, validateField } = actions;

  const addObject = () => {
    if (value) {
      const newValue = [...value, { name: String(Date.now()) }];
      updateValue(newValue);
    } else {
      const newValue = [{ name: String(Date.now()) }];
      updateValue(newValue);
    }
  };

  return (
    <div style={{ outline: "3px solid red", backgroundColor: color }}>
      <ApiPrinter {...props} />
      <div>
        {readonly ? (
          <ul>
            {(value || [])?.map((obj, index) => {
              return <li key={index}>{JSON.stringify(obj)}</li>;
            })}
          </ul>
        ) : (
          <button onClick={addObject}>
            <Trans>Add object</Trans>
          </button>
        )}
      </div>
      <div>
        <button onClick={() => updateValue(null)}>Set null</button>
        <button onClick={() => updateValue(undefined)}>Set undefined</button>
        <button onClick={() => updateValue([])}>Set {"[]"}</button>
        <button onClick={() => updateValue({})}>Set {"{}"}</button>
      </div>
    </div>
  );
}

ArrayOfObjectscc.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  fieldId: PropTypes.string,
  hint: PropTypes.string,
  defaultValue: PropTypes.string,
  events: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired
  }).isRequired,
  states: PropTypes.shape({})
};
