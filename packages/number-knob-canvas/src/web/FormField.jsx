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
    const newValue = parseInt(event.target.value, 10);
    updateValue(formatNumber(newValue, field.decimalPoints));
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
          min={field.min || 0}
          max={field.max || 100}
          step={field.step || 1}
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
          <input
            type="range"
            min={field.min || 0}
            max={field.max || 100}
            step={field.step || 1}
            value={value ?? field.defaultValue}
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
