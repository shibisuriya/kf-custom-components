import React from "react";
import { ApiInspector } from "helpers";

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
    fetchKfApi,
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
      <ApiInspector {...props} />
      <div>
        {readonly ? (
          <ul>
            {(value || [])?.map((obj, index) => {
              return <li key={index}>{JSON.stringify(obj)}</li>;
            })}
          </ul>
        ) : (
          <button onClick={addObject}>Add object</button>
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
