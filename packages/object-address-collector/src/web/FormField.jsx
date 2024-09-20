import React, { useState } from "react";

export default function AddressFieldWidget(props) {
  const {
    field,      // Field configurations like label, required flag, placeholder
    actions,    // Actions like updateValue
    value,      // Current selected address
    readonly,   // If the field is in read-only mode
    disabled,   // If the field is disabled
    errors,     // Validation errors if any
    theme,      // Theme for styling
    color,      // Custom color for the field (optional)
  } = props;

  const defaultAddress = {
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: ""
  };

  const [address, setAddress] = useState(value || defaultAddress);

  const { updateValue } = actions;

  const handleInputChange = (key, newValue) => {
    const updatedAddress = { ...address, [key]: newValue };
    setAddress(updatedAddress);
    updateValue(updatedAddress);  // Update form value
  };

  return (
    <div style={{ outline: "3px solid blue", backgroundColor: color || '#f8f8f8' }}>
      <h3>{field.label || 'Address'}</h3>

      {!readonly ? (
        <div>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              value={address.street}
              onChange={(e) => handleInputChange('street', e.target.value)}
              disabled={disabled}
              placeholder={field.placeholder?.street || 'Street Address'}
              style={{
                padding: "10px",
                backgroundColor: theme?.backgroundColor || "#fff",
                border: `1px solid ${theme?.borderColor || "#ccc"}`,
                borderRadius: "5px",
                width: "100%"
              }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              value={address.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              disabled={disabled}
              placeholder={field.placeholder?.city || 'City'}
              style={{
                padding: "10px",
                backgroundColor: theme?.backgroundColor || "#fff",
                border: `1px solid ${theme?.borderColor || "#ccc"}`,
                borderRadius: "5px",
                width: "48%",
                marginRight: '4%'
              }}
            />
            <input
              type="text"
              value={address.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              disabled={disabled}
              placeholder={field.placeholder?.state || 'State/Province'}
              style={{
                padding: "10px",
                backgroundColor: theme?.backgroundColor || "#fff",
                border: `1px solid ${theme?.borderColor || "#ccc"}`,
                borderRadius: "5px",
                width: "48%"
              }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              value={address.postalCode}
              onChange={(e) => handleInputChange('postalCode', e.target.value)}
              disabled={disabled}
              placeholder={field.placeholder?.postalCode || 'Postal/postalCode Code'}
              style={{
                padding: "10px",
                backgroundColor: theme?.backgroundColor || "#fff",
                border: `1px solid ${theme?.borderColor || "#ccc"}`,
                borderRadius: "5px",
                width: "48%",
                marginRight: '4%'
              }}
            />
            <input
              type="text"
              value={address.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              disabled={disabled}
              placeholder={field.placeholder?.country || 'Country'}
              style={{
                padding: "10px",
                backgroundColor: theme?.backgroundColor || "#fff",
                border: `1px solid ${theme?.borderColor || "#ccc"}`,
                borderRadius: "5px",
                width: "48%"
              }}
            />
          </div>
        </div>
      ) : (
        <div>
          <p>{address.street}</p>
          <p>{address.city}, {address.state}, {address.postalCode}</p>
          <p>{address.country}</p>
        </div>
      )}

      {errors && <p style={{ color: 'red' }}>{errors}</p>}
    </div>
  );
}
