const isRealString = (s) => {
    return typeof s === String && s.trim.length > 1;
}

module.exports = {
    isRealString
}