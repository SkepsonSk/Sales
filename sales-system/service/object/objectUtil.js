const filtersToSQL = (filters) => {
    return filters.replaceAll(',', ' AND ')
        .replaceAll('"', '')
        .replaceAll(';', '');
}

const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

const throwError = (message, code = 500) => {
    const error = new Error(message);
    error.code = code;
    throw error;
}

exports.filtersToSQL = filtersToSQL;
exports.capitalizeFirstLetter = capitalizeFirstLetter;
exports.throwError = throwError;
