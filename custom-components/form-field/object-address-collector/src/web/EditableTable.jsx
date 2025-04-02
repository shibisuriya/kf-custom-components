import React from 'react'
import FormField from './FormField.jsx'

function EditableTable(props) {
    if (props.cell.focused) {
        return <FormField {...props} />
    } else {
        return <FormField {...props} readonly={true} />
    }
}

export default EditableTable
