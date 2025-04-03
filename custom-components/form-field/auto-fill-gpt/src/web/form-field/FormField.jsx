import React, { useContext, useEffect, useState, useRef } from 'react'

import { BridgeContext } from '../bridge/context.jsx'

import styles from './FormField.css'

export function FormField(props) {
    const { iframeRef } = useContext(BridgeContext)

    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    const questionRef = useRef()

    const getFieldElements = () => {
        // eslint-disable-next-line no-restricted-globals
        const fieldElements = document.querySelectorAll(
            '.col[data-valid][data-fieldtype]'
        )

        const inputs = Array.from(fieldElements)
            .map((el) => el.querySelector('input'))
            .filter((input) => input !== null)
            .reduce((acc, input) => {
                acc[input.id] = input
                return acc
            }, {})

        return inputs
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault()

                const fields = Object.entries(getFieldElements()).reduce(
                    (acc, [key, value]) => {
                        acc[key] = value.type
                        return acc
                    },
                    {}
                )

                iframeRef.current?.contentWindow?.postMessage(
                    { fields: fields, prompt: question },
                    '*'
                )
            }
        }

        questionRef.current?.addEventListener('keydown', handleKeyDown)

        return () => {
            questionRef.current?.removeEventListener('keydown', handleKeyDown)
        }
    }, [question])

    async function typeText(input, text, delay = 100) {
        const delayFunc = () =>
            new Promise((resolve) => setTimeout(resolve, delay))

        // Erase existing text using Backspace key events
        for (let i = 0; i < input.value.length; i++) {
            input.dispatchEvent(
                new KeyboardEvent('keydown', {
                    key: 'Backspace',
                    bubbles: true,
                })
            )
            input.dispatchEvent(
                new KeyboardEvent('keyup', { key: 'Backspace', bubbles: true })
            )
            input.dispatchEvent(
                new InputEvent('input', {
                    bubbles: true,
                    inputType: 'deleteContentBackward',
                })
            )
            await delayFunc()
        }

        // Type new text using key events
        for (const char of text) {
            input.dispatchEvent(
                new KeyboardEvent('keydown', { key: char, bubbles: true })
            )
            input.dispatchEvent(
                new KeyboardEvent('keypress', { key: char, bubbles: true })
            )
            input.dispatchEvent(
                new KeyboardEvent('keyup', { key: char, bubbles: true })
            )
            input.dispatchEvent(
                new InputEvent('input', {
                    bubbles: true,
                    inputType: 'insertText',
                    data: char,
                })
            )
            await delayFunc()
        }
    }

    useEffect(() => {
        const handleMessage = (event) => {
            const messageOrigin =
                props.parameters.server_url?.value ?? 'http://127.0.0.1:8080'
            if (event.origin !== messageOrigin) return

            const { reply } = event.data
            if (typeof reply === 'object') {
                setAnswer(JSON.stringify(reply))
                const fieldElements = getFieldElements()
                Object.entries(reply).forEach(([key, value]) => {
                    typeText(fieldElements[key], value, 100)
                })
            } else {
                setAnswer(reply)
            }
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
