import React, { useEffect, useState } from 'react'
import styles from './styles.css'

const AddressManager = (props) => {
    // Initial state with one empty address
    const [addresses, setAddresses] = useState(
        props.value ?? []
    )

    useEffect(() => {
        setAddresses(props.value ?? [])
    }, [props.value])

    // Handler to update an address field
    const handleChange = (index, e) => {
        const { name, value } = e.target
        const newAddresses = [...addresses]
        newAddresses[index][name] = value
        setAddresses(newAddresses)
        props.actions.updateValue(newAddresses)
    }

    // Handler to add a new address
    const addAddress = () => {
        setAddresses([
            ...addresses,
            { street: '', city: '', state: '', zip: '' },
        ])
    }

    // Handler to remove an address
    const removeAddress = (index) => {
        const newAddresses = addresses.filter((_, i) => i !== index)
        setAddresses(newAddresses)
        props.actions.updateValue(newAddresses)
    }

    const { readonly } = props

    if (addresses.length <= 0) {
        return (
            <div>
                <div>No address found!</div>
                {!readonly && (
                    <div>
                        <button
                            className={styles.input}
                            type="button"
                            disabled={readonly}
                            onClick={addAddress}
                        >
                            +
                        </button>
                    </div>
                )}
            </div>
        )
    } else {
        return (
            <div>
                <div>
                    {addresses.map((address, index) => {
                        return (
                            <div key={index} className="address">
                                <input
                                    className={styles.input}
                                    disabled={readonly}
                                    type="text"
                                    name="street"
                                    value={address.street}
                                    onChange={(e) => handleChange(index, e)}
                                    placeholder="Street"
                                />
                                <input
                                    className={styles.input}
                                    disabled={readonly}
                                    type="text"
                                    name="city"
                                    value={address.city}
                                    onChange={(e) => handleChange(index, e)}
                                    placeholder="City"
                                />
                                <input
                                    className={styles.input}
                                    disabled={readonly}
                                    type="text"
                                    name="state"
                                    value={address.state}
                                    onChange={(e) => handleChange(index, e)}
                                    placeholder="State"
                                />
                                <input
                                    className={styles.input}
                                    disabled={readonly}
                                    type="text"
                                    name="zip"
                                    value={address.zip}
                                    onChange={(e) => handleChange(index, e)}
                                    placeholder="Zip Code"
                                />
                                {!readonly && (
                                    <button
                                        disabled={readonly}
                                        type="button"
                                        className={styles.input}
                                        onClick={() => removeAddress(index)}
                                    >
                                        x
                                    </button>
                                )}
                            </div>
                        )
                    })}
                </div>
                {!readonly && (
                    <div>
                        <button
                            className={styles.input}
                            type="button"
                            disabled={readonly}
                            onClick={addAddress}
                        >
                            +
                        </button>
                    </div>
                )}
                {props.errors && <p style={{ color: "red" }}>{props.errors}</p>}
            </div>
        )
    }
}

export default AddressManager
