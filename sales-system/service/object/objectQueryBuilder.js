module.exports = class ObjectQueryBuilder {

    constructor(objectName, id) {
        this.objectName = objectName;
        this.id = id;

        this.fields = [];
        //this.fields = [`${this.objectName}.id`, `${this.objectName}.name`, `${this.objectName}.type`];
        this.joins = [];

        this.relations = new Map();
    }

    text(fieldName) {
        const fieldExpr = `${this.objectName}.${fieldName}`;
        if (!this.fields.includes(fieldExpr)) {
            this.fields.push(fieldExpr);
        }
    }

    relation(fieldName, fieldData) {
        if (!this.relations.has(fieldData.related)) {
            this.relations.set(fieldData.related, fieldName);
        }

        this.fields.push(`${this.objectName}.${fieldName}`);
        this.fields.push(`${fieldData.related}.${fieldData.foreignField} AS ${fieldData.related}_${fieldData.foreignField}`);
    }

    toSQL() {
        let joinsAdded = [];
        this.relations.forEach( (related, relatedField) => {
            if (!joinsAdded.includes(related)) {
                joinsAdded.push(related);

                this.joins.push(`INNER JOIN ${related} ON ${this.objectName}.${relatedField} = ${related}.id`);
            }

        } );

        return `SELECT ${this.fields.join(',')} FROM ${this.objectName} ${this.joins.join(' ')} WHERE ${this.objectName}.Id='${this.id}'`;
    }

}
