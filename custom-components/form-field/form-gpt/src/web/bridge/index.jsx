import React, { useRef } from 'react'
import styles from './Bridge.css'

import { BridgeContext } from './context.jsx'

function Bridge(props) {
    const { children } = props

    const iframeRef = useRef()

    const { value: serverUrl } =
        props.parameters?.server_url ?? 'https://127.0.0.1:8080'

    return (
        <div>
            <iframe
                ref={iframeRef}
                src={serverUrl}
                title={'bridge'}
                className={styles.bridge}
            />
            <BridgeContext.Provider value={{ iframeRef }}>
                {children}
            </BridgeContext.Provider>
        </div>
    )
}

export { Bridge }
