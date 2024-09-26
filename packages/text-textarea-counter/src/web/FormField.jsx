import React, { useState } from "react";

export default function TextareaCounterWidget(props) {
  const {
    field,      // Field configurations like label, required flag, placeholder
    actions,    // Actions like updateValue
    value,      // Current value of the textarea
    readonly,   // If the field is in read-only mode
    disabled,   // If the field is disabled
    errors,     // Validation errors if any
    theme,      // Theme for styling
    color,      // Color for customization (optional)
    maxLength,  // Maximum allowed characters
  } = props;

  const [text, setText] = useState(value || "");
  const { updateValue } = actions; // Action to update the form value

  const handleTextChange = (e) => {
    const input = e.target.value;
    // Ensure the input doesn't exceed the maximum length
    if (input.length <= maxLength) {
      setText(input);
      updateValue(input); // Update the form value
    }
  };

  return (
    <div
      style={{
        outline: "3px solid orange",
        backgroundColor: color || "#f8f8f8",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <h3>{field.label || "Enter Your Text"}</h3>
      {!readonly ? (
        <div>
          <textarea
            value={text}
            onChange={handleTextChange}
            disabled={disabled}
            maxLength={maxLength}
            placeholder={field.placeholder || "Type something..."}
            style={{
              width: "100%",
              height: "150px",
              padding: "10px",
              backgroundColor: theme?.backgroundColor || "#fff",
              border: `1px solid ${theme?.borderColor || "#ccc"}`,
              borderRadius: "5px",
              fontSize: "16px",
              resize: "none",
            }}
          />
          <div style={{ textAlign: "right", marginTop: "5px", color: "#888" }}>
            {text.length}/{maxLength} characters
          </div>
        </div>
      ) : (
        <p>{text || "No text entered"}</p>
      )}
      {errors && <p style={{ color: "red" }}>{errors}</p>} {/* Display validation errors */}
    </div>
  );
}
