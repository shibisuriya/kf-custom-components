import React, { useContext, useEffect, useState, useRef } from 'react'

import { BridgeContext } from '../bridge/context.jsx'

import styles from './FormField.css'

export function FormField(props) {
    const { iframeRef } = useContext(BridgeContext)

    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    const questionRef = useRef()

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault()
                iframeRef.current?.contentWindow?.postMessage({ question }, '*')
            }
        }

        questionRef.current?.addEventListener('keydown', handleKeyDown)

        return () => {
            questionRef.current?.removeEventListener('keydown', handleKeyDown)
        }
    }, [question])

    useEffect(() => {
        const handleMessage = (event) => {
            const messageOrigin =
                props.parameters.server_url?.value ?? 'http://127.0.0.1:8080'
            if (event.origin !== messageOrigin) return

            const { reply } = event.data
            setAnswer(reply)
        }

        // eslint-disable-next-line no-restricted-globals
        window.addEventListener('message', handleMessage, false)

        return () => {
            // eslint-disable-next-line no-restricted-globals
            window.removeEventListener('message', handleMessage, false)
        }
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.label}>Answer:</div>
            <div className={styles.answer}>{answer}</div>
            <label htmlFor="question" className={styles.label}>
                Your Question:
            </label>
            <textarea
                ref={questionRef}
                id="question"
                className={styles.textarea}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question here..."
                rows={3}
            />
        </div>
    )
}
