import React, { useState } from 'react';

function FormField(props) {
    const { value, actions } = props;
    const { updateValue } = actions;

    // List of country codes (can be expanded)
    const countryCodes = [
        { code: '+1', label: 'US' },
        { code: '+91', label: 'IN' },
        { code: '+44', label: 'UK' },
        { code: '+61', label: 'AU' },
        { code: '+81', label: 'JP' },
    ];

    // Helper: parse full value into { code, local }
    const parseValue = (full) => {
        const m = full.match(/^(\+\d+)\s*(.*)/);
        return m
        ? { code: m[1], phoneNumber: m[2] }
        : { code: '+1', phoneNumber: full };  // default if nothing matches
    };

    // Initialize countryCode from the incoming value
    const initial = parseValue(value);
    const [countryCode, setCountryCode] = useState(initial.code);
    const [phoneNumber, setPhoneNumber] = useState(initial.phoneNumber);


    // Helper: strip any leading "+<digits> " from the full value
    const getPhoneNumber = (full) => full.replace(/^\+\d+\s*/, '');

    // Handle country code change
    const handleCountryCodeChange = (e) => {
        const newCountryCode = e.target.value;
        setCountryCode(newCountryCode);
    
        // pull out the rest of the number from the old value
        const newPhoneNumber = getPhoneNumber(value);
        setPhoneNumber(newPhoneNumber);

        // send the updated full value upstream
        updateValue(`${newCountryCode} ${newPhoneNumber}`);
      };

    // Handle phone number input change
    const handleInputChange = (e) => {
        const newPhoneNumber = e.target.value;
        setPhoneNumber(newPhoneNumber);
        updateValue(`${countryCode} ${newPhoneNumber}`);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Country Code Dropdown */}
            <select
                value={countryCode}
                onChange={handleCountryCodeChange}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
            {countryCodes.map(({ code, label }) => (
            <option key={code} value={code}>
                {label} ({code})
            </option>
            ))}
            </select>

            {/* Phone Number Input */}
            <input
                type="text"
                value={phoneNumber} // Remove country code from displayed value
                placeholder="Enter a phone number"
                onChange={handleInputChange}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
            />

            {/* Call Link */}
            <a
                href={`tel:${value}`}
                style={{
                    padding: '8px 12px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '4px',
                }}
            >
                Call
            </a>
            <a
                href={`sms:${value}`}
                style={{
                    padding: '8px 12px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '4px',
                }}
            >
                Text
            </a>
        </div>
    );
}

export default FormField;