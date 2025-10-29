/*
    MIRA SI LE ENVIAS UN DATO A ESTAS FUNCIONES TE RETORNA LO SIGUIENTE:
    1. SI EL FORMATO ES INVALIDO TE RETORNA TRUE
    2. SI EL FORMATO ES VALIDO TE RETORNA FALSE
*/

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

const formatCiInvalid = (data) => {
    const expression = /^[0-9]{7,}$/
    return !expression.test(data) ? true : false
}

const formatMoneyInvalid = (data) => {
    const expression = /^[0-9.,]+$/
    return !expression.test(data) ? true : false
}

const formatDateInvalid = (data) => {
    const expression = /^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/
    return !expression.test(data) ? true : false
}

const formatYearInvalid = (data) => {
    const expression = /^[0-9]{4}$/
    return !expression.test(data) ? true : false
}

const formatMonthInvalid = (data) => {
    const expression = /^[0-9]{1,2}$/
    return !expression.test(data) ? true : false
}

export default {
    formatEmailInvalid, formatPasswordInvalid, formatNamesInvalid,
    formatNumberInvalid, formatTextInvalid, formatCiInvalid,
    formatMoneyInvalid, formatDateInvalid, formatYearInvalid, formatMonthInvalid
}