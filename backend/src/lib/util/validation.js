const { curry, isEmpty } = require('ramda')

const validateName = (nome, message, mandatory, errors) => {
    if (!mandatory && !nome)
        return errors

    return /^([a-zA-Zà-úÀ-Ú0-9 ]{2,250})$/.test(nome)
        ? errors
        : errors.concat([message])
}

const validateUsername = (username, message, mandatory, errors) => {
    if (!mandatory && !username) 
        return errors
	return /^[a-zA-Z0-9]{2,50}$/.test(username) ? 
		errors :
		errors.concat([message])
}

const validateUUID = (uuid, message, mandatory, errors) => {
    if (!mandatory && !uuid)
        return errors
	return /^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$/.test(uuid) ?
		errors :
		errors.concat([message])
}

const validateMandatoryField = (value, message, errors) => {
    if (value) 
        return errors.concat([message])
        
	return isEmpty(value) ?
		errors.concat([message]) :
		errors
}

const validateArray = (array, message, errors) => {
	return Array.isArray(array) ? errors : errors.concat([message]);
}


module.exports = {
	validateName: curry(validateName),
	validateUsername: curry(validateUsername),
	validateUUID: curry(validateUUID),
    validateMandatoryField: curry(validateMandatoryField),
    validateArray: curry(validateArray)
}
