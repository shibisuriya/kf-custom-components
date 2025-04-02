import React, { useState } from "react";

export default function TermsAndConditionsWidget(props) {
  const {
    field, // Field configurations like label, terms link, and required flag
    actions, // Actions like updateValue
    value, // Current value (whether the terms are accepted or not)
    readonly, // If the field is in read-only mode
    disabled, // If the field is disabled
    errors, // Validation errors if any
    theme, // Theme for styling
    color, // Color for customization (optional)
  } = props;

  const { updateValue } = actions; // Update function passed from props

  const handleCheckboxChange = () => {
    updateValue(!props.value)
  };

  return (
    <div
      style={{ outline: "3px solid green", backgroundColor: color || "#fff" }}
    >
      {/* <ApiInspector {...props}></ApiInspector> */}
      <h3>{field.label || "Terms and Conditions"}</h3>
      {!readonly ? (
        <div>
          <input
            type="checkbox"
            checked={props.value}
            onChange={handleCheckboxChange}
            disabled={disabled}
          />
          <label>
            I agree to the{" "}
            <a
              href={field.termsLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {field.termsLabel || "Terms and Conditions"}{" "}
              {props.field.isRequired && <span>*</span>}
            </a>
          </label>
        </div>
      ) : (
        <p>{props.value ? "Accepted" : "Not Accepted"}</p>
      )}
      {errors && <p style={{ color: "red" }}>{errors}</p>}{" "}
      {/* Display validation errors */}
    </div>
  );
}
