import React, { useEffect, useState } from 'react'
import styles from './form.field.module.css'

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
    const text = props?.parameters?.text?.value ?? 10;
    const num = props?.parameters?.num?.value ?? 10;
    const DD = props?.parameters?.DD?.value ?? 10;

    const defaultAddress = {
        street: '',
        city: '',
        state: '',
        postalCode: 0,
        country: '',
        national: false,
    }

    const [address, setAddress] = useState(value || defaultAddress)

    useEffect(() => {
        setAddress({ ...(props.value || defaultAddress) })
    }, [props.value])

    const { updateValue } = actions

    const handleInputChange = (key, newValue) => {
        const updatedAddress = { ...address, [key]: newValue }
        setAddress(updatedAddress)
        updateValue(updatedAddress) // Update form value
    }
    console.log(address);
    if (!readonly) {
        return (
            <div className={styles.field}>
                <h3>
                    {field.name || "Address collector"}
                    {field?.isRequired && <span style={{ color: "red" }}>*</span>}
                </h3>
                <h2>
                    {text}
                    {num}
                    {DD}
                </h2>
                <div className={styles.formControls}>
                    <div className={styles.fieldTitle}>ADDRESS</div>
                    <div>
                        <div className={styles.label}>Street: </div>
                        <input
                            className={styles.input}
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
                    <div>
                        <div className={styles.label}>City: </div>
                        <input
                            className={styles.input}
                            type="text"
                            value={address.city}
                            onChange={(e) =>
                                handleInputChange('city', e.target.value)
                            }
                            disabled={disabled}
                            placeholder={field.placeholder?.city || 'City'}
                        />
                    </div>
                    <div>
                        <div className={styles.label}>State: </div>
                        <input
                            className={styles.input}
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
                    <div>
                        <div>Postal code: </div>
                        <input
                            type="number"
                            value={address.postalCode}
                            onChange={(e) =>
                                handleInputChange(
                                    'postalCode',
                                    Number(e.target.value)
                                )
                            }
                            disabled={disabled}
                            placeholder={
                                field.placeholder?.postalCode || 'Postal code'
                            }
                        />
                    </div>
                    <div>
                        <div>Country: </div>
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
                    <div>
                        <div>national: </div>
                        <input
                            type="checkbox"
                            checked={address.national}
                            onChange={(e) =>
                                handleInputChange('national', e.target.checked)
                            }
                            disabled={disabled}
                            placeholder={
                                field.placeholder?.national || 'national'
                            }
                        />
                    </div>
                </div>
                <div>{errors && <p style={{ color: 'red' }}>{errors}</p>}</div>
            </div>
        )
    }

    return (
        <div className={styles.field}>
            <div>
                <div className={styles.formControlInReadOnlyMode}>
                    <div className={styles.key}>Street:</div>
                    <div className={styles.value}>{address.street}</div>
                </div>

                <div className={styles.formControlInReadOnlyMode}>
                    <div className={styles.key}>City:</div>
                    <div className={styles.value}>{address.city}</div>
                </div>

                <div className={styles.formControlInReadOnlyMode}>
                    <div className={styles.key}>State:</div>
                    <div className={styles.value}>{address.state}</div>
                </div>

                <div className={styles.formControlInReadOnlyMode}>
                    <div className={styles.key}>Zip code:</div>{' '}
                    <div className={styles.value}>{address.postalCode}</div>
                </div>

                <div className={styles.formControlInReadOnlyMode}>
                    <div className={styles.key}>Country:</div>{' '}
                    <div className={styles.value}>{address.country}</div>
                </div>
                <div className={styles.formControlInReadOnlyMode}>
                    <div className={styles.key}>national:</div>{' '}
                    <div className={styles.value}>{String(address.national)}</div>
                </div>
            </div>
            {errors && <div style={{ color: 'red' }}>{errors}</div>}
        </div>
    )
}
