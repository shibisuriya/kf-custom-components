import React from "react";
import { ApiInspector } from "api-inspector";

export default function booleone(props) {
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
        {readonly ? (
          value
        ) : (
          <div>
            <div>
              <label htmlFor="yes">Yes</label>
              <input
                type="radio"
                id="yes"
                name="question"
                value={true}
                checked={!!value === true}
                onChange={() => {
                  updateValue(true);
                }}
              />
            </div>
            <div>
              <label htmlFor="no">No</label>
              <input
                type="radio"
                id="no"
                name="question"
                value={false}
                checked={!!value === false}
                onChange={() => {
                  updateValue(false);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
