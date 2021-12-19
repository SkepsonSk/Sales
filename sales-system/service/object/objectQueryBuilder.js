module.exports = class ObjectQueryBuilder {

    constructor() {
        this.fields = ['id', 'name', 'type'];
        this.joins = [];
    }

    text(fieldName, fieldData) {
        console.log(fieldData);
    }

    relation(fieldName, fieldData) {
        const joinObject = fieldData.objectName;
        this.joins.push(`INNER JOIN ${joinObject.objectName} ON ${objectName}.${field} = ${joinObject.objectName}.id`);

        this.fields.push(fieldData);
        for (let foreignField of joinObject.fields) {
            fields.push(`${joinObject.objectName}.${foreignField} AS ${joinObject.objectName}_${foreignField}`);
        }
    }

}
