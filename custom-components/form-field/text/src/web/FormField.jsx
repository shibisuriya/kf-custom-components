import React, { useEffect } from "react";

import { ApiInspector } from "helpers";

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
    fetchKfApi,
  } = props;

  const { id, name, type, isRequired, hint, defaultValue, color } = field;

  const { updateValue, validateField } = actions;

  return (
    <div style={{ outline: "3px solid red", backgroundColor: color }}>
      <ApiInspector {...props} />
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
