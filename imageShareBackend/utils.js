module.exports = {
    includeStringFields: (fields, body) => {
        return fields.reduce((isStringType, field) => 
            isStringType && typeof body[field] == 'string'
        , true)
    },
    mayIncludeStringFields: (fields, body) => {
        return fields.reduce((isStringType, field) => 
            isStringType && (
                typeof body[field] == 'string'
                || typeof body[field] == 'undefined'
            )
        , true)
    },

    expectFieldFormat: (fieldTypes, body) => {
        Object.keys(fieldTypes).reduce((isTypeMatch, fieldName) => {
            return isTypeMatch && typeof body[fieldName] == fieldTypes[fieldName]
        }, true)
    }
}