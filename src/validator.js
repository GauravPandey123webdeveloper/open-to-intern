isValidData = function (a) {
    if (typeof a === null && typeof a === undefined) return false;
    if (typeof a === String && a.trim().length == 0) return false;
    if (!(/^[A-Za-z]+$/.test(a))) return false;
    return true
}
validEmail = function (email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}
validMobile = function (mob) {
    return /[0-9]{10}/.test(mob)
}

module.exports = { isValidData, validEmail, validMobile }