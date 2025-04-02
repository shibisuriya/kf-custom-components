import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import styles from './tester.module.css'
import { generateFakeValue } from '../faker/index.js'
import { FIELD_TYPES } from '../constants.js'
import { InputNumber } from 'antd'
import { Radio } from 'antd'
import { typecastValue } from './utils.js'

const DEFAULT_LENGTH = 3

const Tester = (props) => {
    const { field, jsonSchema } = props
    const { type: fieldType } = field

    const [isTesterOpen, setIsTesterOpen] = useState(false)
    const [value, setValue] = useState('')
    const [length, setLength] = useState(DEFAULT_LENGTH)
    const [showTypecastModal, setShowTypecastModal] = useState(false)
    const [dataType, setDataType] = useState(FIELD_TYPES.TEXT)
    const [typecastError, setTypecastError] = useState('')
    const [updateError, setUpdateError] = useState('')

    const generateRandomText = () => {
        const randomValue = generateFakeValue({ fieldType: FIELD_TYPES.TEXT })
        setValue(randomValue)
        setDataType(FIELD_TYPES.TEXT)
    }

    const generateRandomNumber = () => {
        const randomValue = generateFakeValue({ fieldType: FIELD_TYPES.NUMBER })
        setValue(randomValue)
        setDataType(FIELD_TYPES.NUMBER)
    }

    const generateRandomBoolean = () => {
        const randomValue = generateFakeValue({
            fieldType: FIELD_TYPES.BOOLEAN,
        })
        setValue(randomValue)
        setDataType(FIELD_TYPES.BOOLEAN)
    }

    const generateRandomObject = () => {
        const randomValue = generateFakeValue({
            fieldType: FIELD_TYPES.OBJECT,
            jsonSchema,
            length,
        })
        setValue(JSON.stringify(randomValue))
        setDataType(FIELD_TYPES.OBJECT)
    }

    const generateRandomArrayOfObject = () => {
        const randomValue = generateFakeValue({
            fieldType: FIELD_TYPES.OBJECT_LIST,
            jsonSchema,
            length,
        })
        setValue(JSON.stringify(randomValue))
        setDataType(FIELD_TYPES.OBJECT_LIST)
    }

    const generateRandomArrayOfString = () => {
        const randomValue = generateFakeValue({
            fieldType: FIELD_TYPES.STRING_LIST,
            length,
        })
        setValue(JSON.stringify(randomValue))
        setDataType(FIELD_TYPES.STRING_LIST)
    }

    return (
        <React.Fragment>
            <Button
                type="primary"
                onClick={() => {
                    setIsTesterOpen(true)
                }}
            >
                API tester
            </Button>
            {isTesterOpen && (
                <Modal
                    title="Value generator / editor"
                    open={isTesterOpen}
                    footer={[
                        <Button
                            type="secondary"
                            onClick={() => {
                                setIsTesterOpen(false)
                            }}
                        >
                            Cancel
                        </Button>,
                        <Button
                            type="primary"
                            disabled={value === ''}
                            onClick={() => {
                                setShowTypecastModal(true)
                            }}
                        >
                            Typecast value
                        </Button>,
                    ]}
                >
                    {showTypecastModal && (
                        <Modal
                            title="Type cast + update"
                            width="400px"
                            open={showTypecastModal}
                            onOk={() => {
                                let typecasted = false
                                let updated = false
                                try {
                                    const typecastedValue = typecastValue({
                                        fieldType: dataType,
                                        value,
                                    })
                                    typecasted = true
                                    try {
                                        props.actions.updateValue(
                                            typecastedValue
                                        )
                                        updated = true
                                    } catch (err) {
                                        setTypecastError(null)
                                        setUpdateError(err.message)
                                    }
                                } catch (err) {
                                    setTypecastError(err.message)
                                    setUpdateError(null)
                                }

                                if (typecasted && updated) {
                                    setShowTypecastModal(false)
                                    setIsTesterOpen(false)
                                }
                            }}
                            okText={'Update value'}
                            onCancel={() => {
                                setShowTypecastModal(false)
                                setTypecastError(null)
                                setUpdateError(null)
                            }}
                        >
                            {typecastError && (
                                <div>
                                    <div>Typecast log</div>
                                    <div
                                        style={{
                                            color: 'white',
                                            backgroundColor: 'red',
                                        }}
                                    >
                                        {typecastError}
                                    </div>
                                </div>
                            )}
                            {updateError && (
                                <div>
                                    <div>Update error: </div>
                                    <div
                                        style={{
                                            color: 'white',
                                            backgroundColor: 'red',
                                        }}
                                    >
                                        {updateError}
                                    </div>
                                </div>
                            )}
                            <div className={styles.types}>
                                <Radio.Group
                                    onChange={(e) => {
                                        const { value } = e.target
                                        setDataType(value)
                                    }}
                                    value={dataType}
                                >
                                    <Radio value={FIELD_TYPES.TEXT}>Text</Radio>
                                    <Radio value={FIELD_TYPES.NUMBER}>
                                        Number
                                    </Radio>
                                    <Radio value={FIELD_TYPES.BOOLEAN}>
                                        Boolean
                                    </Radio>
                                    <Radio value={FIELD_TYPES.STRING_LIST}>
                                        String list
                                    </Radio>
                                    <Radio value={FIELD_TYPES.OBJECT}>
                                        Object
                                    </Radio>
                                    <Radio value={FIELD_TYPES.OBJECT_LIST}>
                                        Object list
                                    </Radio>
                                </Radio.Group>
                            </div>
                        </Modal>
                    )}
                    <div
                        styles={{
                            display: 'flex',
                        }}
                    >
                        <div>
                            <textarea
                                value={value}
                                onChange={(e) => {
                                    const { value } = e.target
                                    setValue(value)
                                }}
                            />
                        </div>
                        <div className={styles.generateRandomValues}>
                            <div>Generate random values</div>
                            <div>
                                <div>Length</div>
                                <div>
                                    <InputNumber
                                        value={length}
                                        min={1}
                                        max={100}
                                        defaultValue={DEFAULT_LENGTH}
                                        onChange={(value) => {
                                            setLength(value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <Button
                                    type="primary"
                                    onClick={generateRandomText}
                                >
                                    Text
                                </Button>
                            </div>
                            <div>
                                <Button
                                    type="primary"
                                    onClick={generateRandomNumber}
                                >
                                    Number
                                </Button>
                            </div>
                            <div>
                                <Button
                                    type="primary"
                                    onClick={generateRandomBoolean}
                                >
                                    Boolean
                                </Button>
                            </div>
                            <div>
                                <Button
                                    type="primary"
                                    onClick={generateRandomArrayOfString}
                                >
                                    Array of string
                                </Button>
                            </div>
                            <div>
                                <Button
                                    type="primary"
                                    onClick={generateRandomObject}
                                    disabled={
                                        !jsonSchema ||
                                        fieldType === FIELD_TYPES.OBJECT_LIST
                                    }
                                >
                                    Object
                                </Button>
                            </div>
                            <div>
                                <Button
                                    type="primary"
                                    onClick={generateRandomArrayOfObject}
                                    disabled={
                                        !jsonSchema ||
                                        fieldType === FIELD_TYPES.OBJECT
                                    }
                                >
                                    Array of objects
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </React.Fragment>
    )
}

export { Tester }
