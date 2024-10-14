import React, { useState } from 'react'

export default function AddressFieldWidget(props) {
    const {
        field, // Field configurations like label, required flag, placeholder
        actions, // Actions like updateValue
        value, // Current selected address
        readonly, // If the field is in read-only mode
        disabled, // If the field is disabled
        errors, // Validation errors if any
        theme, // Theme for styling
        color, // Custom color for the field (optional)
    } = props

    const defaultAddress = {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
    }

    const [address, setAddress] = useState(value || defaultAddress)

    const { updateValue } = actions

    const handleInputChange = (key, newValue) => {
        const updatedAddress = { ...address, [key]: newValue }
        setAddress(updatedAddress)
        updateValue(updatedAddress) // Update form value
    }

    return (
        <div
            style={{
                outline: '3px solid blue',
                backgroundColor: color || '#f8f8f8',
            }}
        >
            <h3>{field.label || 'Address'}</h3>

            {!readonly ? (
                <div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Street: </label>
                        <input
                            type="text"
                            value={address.street}
                            onChange={(e) =>
                                handleInputChange('street', e.target.value)
                            }
                            disabled={disabled}
                            placeholder={
                                field.placeholder?.street || 'Street Address'
                            }
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>City: </label>
                        <input
                            type="text"
                            value={address.city}
                            onChange={(e) =>
                                handleInputChange('city', e.target.value)
                            }
                            disabled={disabled}
                            placeholder={field.placeholder?.city || 'City'}
                        />
                        <label>State: </label>
                        <input
                            type="text"
                            value={address.state}
                            onChange={(e) =>
                                handleInputChange('state', e.target.value)
                            }
                            disabled={disabled}
                            placeholder={
                                field.placeholder?.state || 'State/Province'
                            }
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Postal code: </label>
                        <input
                            type="number"
                            value={address.postalCode}
                            onChange={(e) =>
                                handleInputChange('postalCode', e.target.value)
                            }
                            disabled={disabled}
                            placeholder={
                                field.placeholder?.postalCode ||
                                'Postal/postalCode Code'
                            }
                        />
                        <label>Country: </label>
                        <input
                            type="text"
                            value={address.country}
                            onChange={(e) =>
                                handleInputChange('country', e.target.value)
                            }
                            disabled={disabled}
                            placeholder={
                                field.placeholder?.country || 'Country'
                            }
                        />
                    </div>
                </div>
            ) : (
                <div>
                    <p>Street: {address.street}</p>
                    <p>
                        city: {address.city}, state: {address.state}, postal
                        code : {address.postalCode}
                    </p>
                    <p>{address.country}</p>
                </div>
            )}

            {errors && <p style={{ color: 'red' }}>{errors}</p>}
        </div>
    )
}
