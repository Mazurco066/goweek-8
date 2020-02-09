module.exports = (statusCode, statusmessage, currentParameter = {}, newObject = {}, messageList = []) => {
    const message = `${statusmessage}${(messageList.length > 0 ? ': ' + messageList.join(' | ') : '')}`
    return {
        ...currentParameter,
        ...{
            status: {
                code: statusCode,
                message: message
            },
            ...newObject
        }
    }
}
