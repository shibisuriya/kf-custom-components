import React, { useState } from 'react'

const AddressManager = (props) => {
    // Initial state with one empty address
    const [addresses, setAddresses] = useState(
        props.value || [{ street: '', city: '', state: '', zip: '' }]
    )

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
    }

    const { readonly } = props

    return (
        <div>
            {addresses.map((address, index) => (
                <div key={index} className="address">
                    <input
                        disabled={readonly}
                        type="text"
                        name="street"
                        value={address.street}
                        onChange={(e) => handleChange(index, e)}
                        placeholder="Street"
                    />
                    <input
                        disabled={readonly}
                        type="text"
                        name="city"
                        value={address.city}
                        onChange={(e) => handleChange(index, e)}
                        placeholder="City"
                    />
                    <input
                        disabled={readonly}
                        type="text"
                        name="state"
                        value={address.state}
                        onChange={(e) => handleChange(index, e)}
                        placeholder="State"
                    />
                    <input
                        disabled={readonly}
                        type="text"
                        name="zip"
                        value={address.zip}
                        onChange={(e) => handleChange(index, e)}
                        placeholder="Zip Code"
                    />
                    <button
                        disabled={readonly}
                        type="button"
                        onClick={() => removeAddress(index)}
                    >
                        Remove Address
                    </button>
                </div>
            ))}
            <button type="button" onClick={addAddress}>
                Add Address
            </button>
        </div>
    )
}

export default AddressManager
