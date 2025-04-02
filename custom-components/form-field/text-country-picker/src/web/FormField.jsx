import React, { useState } from "react";

export default function CountryPickerWidget(props) {
  const {
    field, // Field configurations like label, required flag, placeholder
    actions, // Actions like updateValue
    value, // Current selected country
    readonly, // If the field is in read-only mode
    disabled, // If the field is disabled
    errors, // Validation errors if any
    theme, // Theme for styling
    color, // Color for customization (optional)
    countries, // List of countries (optional: default list will be used if not provided)
  } = props;

  const defaultCountries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "India",
    "Germany",
    "France",
    "China",
    "Japan",
  ];

  const countryList = countries || defaultCountries; // Use provided countries or default list
  const [selectedCountry, setSelectedCountry] = useState(value || "");

  const { updateValue } = actions;

  const handleCountryChange = (e) => {
    const newCountry = e.target.value;
    setSelectedCountry(newCountry);
    updateValue(newCountry); // Update form value
  };

  return (
    <div
      style={{
        outline: "3px solid orange",
        backgroundColor: color || "#f8f8f8",
      }}
    >
      <h3>{field.label || "Select Your Country"}</h3>
      {!readonly ? (
        <div>
          <select
            value={selectedCountry}
            onChange={handleCountryChange}
            disabled={disabled}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: theme?.backgroundColor || "#fff",
              border: `1px solid ${theme?.borderColor || "#ccc"}`,
              borderRadius: "5px",
            }}
          >
            <option value="">
              {field.placeholder || "Choose a country..."}
            </option>
            {countryList.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p>{selectedCountry || "No country selected"}</p>
      )}
      {errors && <p style={{ color: "red" }}>{errors}</p>}{" "}
      {/* Display validation errors */}
    </div>
  );
}
