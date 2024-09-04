import React from "react";
import { Knob } from "primereact/knob";
import { ApiInspector } from "helpers";

export default function Number(props) {
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

  const {
    id,
    name,
    type,
    isRequired,
    hint,
    defaultValue,
    color,
    decimalPoints,
  } = field;

  const { updateValue, validateField } = actions;

  return (
    <div
      style={{
        outline: "3px solid red",
        backgroundColor: color,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ApiInspector {...props} />
      <div>
        {readonly ? (
          value
        ) : (
          <Knob
            value={value ?? 1}
            step={10}
            onChange={(e) => updateValue(e.value)}
          />
        )}
      </div>
    </div>
  );
}

Number.propTypes = {};
