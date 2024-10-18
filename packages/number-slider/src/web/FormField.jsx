import React, { useState } from "react";

export default function KnobCanvasWidget(props) {
  const {
    field, // Field configurations like label, min, max, step
    actions, // Actions like updateValue
    value, // Current knob value
    readonly, // If the field is in read-only mode
    disabled, // If the field is disabled
    errors, // Validation errors if any
    theme, // Theme for styling
    color, // Color for customization (optional)
  } = props;

  // const [value, setvalue] = useState(value || field.defaultValue || 0);

  const { updateValue } = actions;

  const handleKnobDrag = (event) => {
    const num = parseFloat(event.target.value);
    const temp = Number(formatNumber(num, field?.decimalPoints ?? 3));
    updateValue(temp);
  };

  function formatNumber(num, decimalPlaces) {
    return Number(num.toFixed(decimalPlaces));
  }

  return (
    <div
      style={{
        outline: "3px solid purple",
        backgroundColor: color || "#f9f9f9",
      }}
    >
      <h3>{field.label || "Knob Control"}</h3>
      <div>
        <input
          type="range"
          min={0}
          max={1}
          step={1 / 10 ** (field?.decimalPoints ?? 3)}
          value={value}
          onChange={handleKnobDrag}
          disabled={readonly}
          style={{
            width: "100%",
            appearance: "none",
            height: "8px",
            backgroundColor: theme?.backgroundColor || "#ddd",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        />
        <div>
          <div>
            <span>{value}</span>
          </div>
          <div>
            <span>{field.hint}</span>
          </div>
        </div>
        {errors && <p style={{ color: "red" }}>{errors}</p>}
      </div>
    </div>
  );
}
