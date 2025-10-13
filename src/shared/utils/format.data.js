const formatEmailInvalid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return !emailRegex.test(email) ? true : false
}

const formatPasswordInvalid = (password) => {
    const allowedCharsRegex = /^[a-zA-Z0-9!@#$%&*()_+\-=\[\]{}|;:',.]+$/
    return !allowedCharsRegex.test(password) ? true : false
}

const formatNamesInvalid = (data) => {
    const expression = /^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]+$/
    return !expression.test(data) ? true : false
}

const formatNumberInvalid = (data) => {
    const expression = /^[0-9]+$/
    return !expression.test(data) ? true : false
}

const formatTextInvalid = (data) => {
    const expression = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜ$%&{}\[\]\.,:;\s]+$/
    return !expression.test(data) ? true : false
}

export default { formatEmailInvalid, formatPasswordInvalid, formatNamesInvalid, formatNumberInvalid, formatTextInvalid }