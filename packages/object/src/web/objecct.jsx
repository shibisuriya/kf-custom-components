/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import ApiPrinter from "./api.printer";

export default function CustomObjectField(props) {
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

  return (
    <div style={{ outline: "3px solid red", backgroundColor: color }}>
      <ApiPrinter {...props} />
      <div>
        {readonly ? (
          JSON.stringify(value)
        ) : (
          <input
            type="text"
            value={value?.name ?? ""}
            onChange={(e) => {
              const value = { name: String(e.target.value) };
              updateValue(value);
            }}
            onBlur={(e) => {
              const value = { name: String(e.target.value) };
              updateValue(value);
            }}
          />
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

CustomObjectField.propTypes = {
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
