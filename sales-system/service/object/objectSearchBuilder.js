const metadata = require('../../metadata/metadata');
const database = require('../../database/database');

module.exports = class ObjectSearchBuilder {

    async retrieveMetadata() {
        const searchableData = await metadata.read('searchable.json');
        this.searchable = searchableData.searchable;
    }

    constructSQL(search) {
        const queries = [];
        this.searchable.forEach( searchable => {
            queries.push(`SELECT id, name, "${searchable}" as object FROM ${searchable}`);
        } );
        const union = queries.join(' UNION ');
        return `SELECT * FROM (${union}) AS data WHERE data.name LIKE '%${search}%'`;
    }

    collectResults(results) {
        const mappedData = {};
        results.forEach( record => {
            if (!mappedData[record.object]) {
                mappedData[record.object] = [];
            }
            mappedData[record.object].push(record);
        } );
        return mappedData;
    }

    async performSearch(search) {
        const sql = this.constructSQL(search);

        try {
            const results = await database.transaction([{sql: sql}]);
            return Promise.resolve(this.collectResults(results[0][0]));
        } catch (e) {
            return Promise.reject(e);
        }
    }
}
