import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import styles from './inspector.module.css'

const ApiInspector = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = (e) => {
        e.stopPropagation()
        setIsModalOpen(true)
    }

    const handleOk = (e) => {
        e.stopPropagation()
        setIsModalOpen(false)
    }

    const handleCancel = (e) => {
        e.stopPropagation()
        setIsModalOpen(false)
    }

    const {
        value,
        field: {
            id,
            name,
            type,
            isRequired,
            hint,
            defaultValue,
            decimalPoint,
            isComputed,
            color,
        },
        actions: { updateValue, validateField },
        parameters,
        readonly,
        disabled,
        errors,
        theme,
        fetchKfApi,
        jsonSchema,
    } = props

    const propsData = [
        {
            key: 'cell.focused',
            value: props.cell?.focused,
            type: typeof props?.cell?.focused,
        },
        { key: 'value', value: value, type: typeof value },
        { key: 'field.id', value: id, type: typeof id },
        { key: 'field.name', value: name, type: typeof name },
        { key: 'field.type', value: type, type: typeof type },
        { key: 'field.isRequired', value: isRequired, type: typeof isRequired },
        { key: 'field.hint', value: hint, type: typeof hint },
        {
            key: 'field.defaultValue',
            value: defaultValue,
            type: typeof defaultValue,
        },
        {
            key: 'field.decimalPoint',
            value: decimalPoint,
            type: typeof decimalPoint,
        },
        { key: 'field.isComputed', value: isComputed, type: typeof isComputed },
        { key: 'field.color', value: color, type: typeof color },
        {
            key: 'actions.updateValue',
            value: '',
            type: typeof updateValue,
        },
        {
            key: 'actions.validateField',
            value: '',
            type: typeof validateField,
        },
        {
            key: 'parameters',
            value: parameters,
            type: typeof parameters,
        },
        { key: 'readonly', value: readonly, type: typeof readonly },
        { key: 'disabled', value: disabled, type: typeof disabled },
        { key: 'errors', value: errors, type: typeof errors },
        { key: 'theme', value: theme, type: typeof theme },
        { key: 'fetchKfApi', value: '', type: typeof fetchKfApi },
        { key: 'jsonSchema', value: jsonSchema, type: typeof jsonSchema },
    ]

    return (
        <React.Fragment>
            <Button type="primary" onClick={showModal}>
                Inspect API
            </Button>
            <Modal
                title="API inspector"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <table>
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Value</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {propsData.map((prop, index) => {
                            return (
                                <tr key={index}>
                                    <td>{prop.key}</td>
                                    <td>
                                        {typeof prop.value === 'object'
                                            ? JSON.stringify(prop.value)
                                            : String(prop.value)}
                                    </td>
                                    <td>{prop.type}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </Modal>
        </React.Fragment>
    )
}

export { ApiInspector }
