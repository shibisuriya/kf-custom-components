import { generateFakeBoolean } from './boolean.js'
import { generateFakeNumber } from './number.js'
import { generateFakeText } from './text.js'

function generateFakeJson({ jsonSchema }) {
    function generateValue(schema) {
        switch (schema.type) {
            case 'string':
                return generateFakeText({ length: 10 })

            case 'number':
            case 'integer':
                return generateFakeNumber({ numberOfDigits: 5 })

            case 'boolean':
                return generateFakeBoolean()

            case 'array':
                const arrayOfObjects = Array.from(
                    { length: schema.minItems || 3 },
                    () => generateValue(schema.items)
                )
                return arrayOfObjects

            case 'object':
                const object = Object.keys(schema.properties).reduce(
                    (acc, key) => {
                        acc[key] = generateValue(schema.properties[key])
                        return acc
                    },
                    {}
                )
                return object

            default:
                return null
        }
    }

    return generateValue(jsonSchema)
}

export { generateFakeJson }
