import React from "react";
import { ApiInspector } from "helpers";
import { Tester } from "helpers";

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
    fetchKfApi,
  } = props;

  const { id, name, type, isRequired, hint, defaultValue, color } = field;

  const { updateValue, validateField } = actions;

  return (
    <div style={{ outline: "3px solid red", backgroundColor: color }}>
      <ApiInspector {...props} />
      <Tester
        value={props.value}
        updateValue={props.actions.updateValue}
        jsonSchema={props.jsonSchema}
        fieldType={props.field.type}
      />
      <div>
        {readonly ? (
          JSON.stringify(value)
        ) : (
          <input
            type="text"
            value={value?.name ?? ""}
            onChange={(e) => {
              const value = {
                name: String(e.target.value),
                age: Number(Date.now()),
              };
              updateValue(value);
            }}
            onBlur={(e) => {
              const value = {
                name: String(e.target.value),
                age: Number(Date.now()),
              };
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
