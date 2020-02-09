const { isEmpty } = require('ramda')

const generateField = (fieldId, fieldValue, formatMethod, defaultValue) => (
    {[fieldId]: (typeof fieldValue === 'undefined' || fieldValue === null || isEmpty(fieldValue)
        ? defaultValue
        : (formatMethod
            ? formatMethod(fieldValue)
            : fieldValue))
    })

module.exports = generateField

