import React from 'react'

import { Bridge } from '../bridge/index.jsx'
import { FormField } from './FormField.jsx'

function FormFieldWrapper(props) {
    return (
        <Bridge {...props}>
            <FormField {...props} />
        </Bridge>
    )
}

export default FormFieldWrapper
