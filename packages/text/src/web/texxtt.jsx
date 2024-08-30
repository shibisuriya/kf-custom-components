/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import PropTypes from "prop-types";

import ApiPrinter from "./api.printer.jsx";

export default function Text(props) {
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
        <input
          type="text"
          value={value}
          onChange={(e) => {
            const value = e.target.value;
            updateValue(value);
          }}
          onBlur={(e) => {
            const value = e.target.value;
            updateValue(value);
          }}
        />
      </div>
    </div>
  );
}

Text.propTypes = {
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
