const fs =require('fs')

module.exports = {
    includeStringFields: (fields, body) => {
        return fields.reduce((isStringType, field) => 
            isStringType && typeof body[field] == 'string' && body[field].length
        , true)
    },
    mayIncludeStringFields: (fields, body) => {
        return fields.reduce((isStringType, field) => 
            isStringType && (
                (typeof body[field] == 'string' && body[field].length)
                || typeof body[field] == 'undefined'
            )
        , true)
    },
    getProfilePicture: (profileId) => {
        return profileId && fs.existsSync(`profileImages/${profileId}`)
            ? fs.readFileSync(`profileImages/${profileId}`).toString('utf8')
            : ''
    },
    expectFieldFormat: (fieldTypes, body) => {
        Object.keys(fieldTypes).reduce((isTypeMatch, fieldName) => {
            return isTypeMatch && typeof body[fieldName] == fieldTypes[fieldName]
        }, true)
    }
}