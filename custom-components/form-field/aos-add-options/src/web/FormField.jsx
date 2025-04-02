import React, { useState } from "react";

export default function AddOptionsWidget(props) {
  const {
    field,      // Field configurations like label, required flag, placeholder
    actions,    // Actions like updateValue
    value,      // Current selected values or options
    readonly,   // If the field is in read-only mode
    disabled,   // If the field is disabled
    errors,     // Validation errors if any
    theme,      // Theme for styling
    color,      // Color for customization (optional)
  } = props;

  const [options, setOptions] = useState(value || []);

  const { updateValue } = actions;

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index, newValue) => {
    const updatedOptions = [...options];
    updatedOptions[index] = newValue;
    setOptions(updatedOptions);
    updateValue(updatedOptions);  // Update form value
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
    updateValue(updatedOptions);
  };

  return (
    <div style={{ outline: "3px solid blue", backgroundColor: color || '#f8f8f8' }}>
      <h3>{field.label || 'Add Options'}</h3>

      {!readonly ? (
        <div>
          {options.map((option, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                disabled={disabled}
                placeholder={field.placeholder || 'Enter option...'}
                style={{
                  padding: "10px",
                  backgroundColor: theme?.backgroundColor || "#fff",
                  border: `1px solid ${theme?.borderColor || "#ccc"}`,
                  borderRadius: "5px",
                  width: "80%"
                }}
              />
              <button
                onClick={() => handleRemoveOption(index)}
                disabled={disabled}
                style={{
                  marginLeft: "10px",
                  padding: "8px",
                  backgroundColor: "red",
                  color: "#fff",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer"
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <button
            onClick={handleAddOption}
            disabled={disabled}
            style={{
              padding: "10px",
              backgroundColor: "green",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Add Option
          </button>
        </div>
      ) : (
        <ul>
          {options.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      )}

      {errors && <p style={{ color: 'red' }}>{errors}</p>}
    </div>
  );
}
