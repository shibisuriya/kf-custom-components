import React from 'react'
import FormField from './FormField.jsx'

function EditableTable(props) {
    // Not rerendering when a key present an object is
    // changed...
    if (props?.cell?.focused) {
        return <FormField {...props} />
    }

    return <div>{JSON.stringify(props.value)}</div>
}

export default EditableTable
