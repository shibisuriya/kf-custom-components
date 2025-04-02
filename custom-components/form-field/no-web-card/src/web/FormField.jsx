import React, { useEffect, useRef, useState } from 'react'
import { ApiInspector, Tester } from 'helpers'
import styles from './form.field.css'

export default function NoWebCard(props) {
    return (
        <div className={styles.container}>
            <ApiInspector {...props} />
            <Tester
                value={props.value}
                updateValue={props.actions.updateValue}
                jsonSchema={props.jsonSchema}
                fieldType={props.field.type}
            />
        </div>
    )
}
