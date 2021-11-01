const filtersToSQL = (filters) => {
    return filters.replaceAll(',', ' AND ')
        .replaceAll('"', '')
        .replaceAll(';', '');
}

exports.filtersToSQL = filtersToSQL;
