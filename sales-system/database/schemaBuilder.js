module.exports = class SchemaBuilder {

    constructor(objectName) {
        this.objectName = objectName;

        this.fields = [
            `id VARCHAR(50)`,
            `name VARCHAR(200)`,
            `type VARCHAR(100) DEFAULT 'Default'`
        ];

        this.constraints = [
            'PRIMARY KEY (ID)'
        ];
    }

    string(stringDefinition) {
        this.fields.push(`${stringDefinition.name} VARCHAR(${stringDefinition.size})`);
    }

    decimal(decimalDefinition) {
        this.fields.push(`${decimalDefinition.name} DECIMAL(${decimalDefinition.digits}, ${decimalDefinition.precision})`);
    }

    relation(relationDefinition) {
        this.fields.push(`${relationDefinition.name} VARCHAR(50)`);
        this.constraints.push(`FOREIGN KEY (${relationDefinition.name}) REFERENCES ${relationDefinition.related} (id)`);
    }

    constructSQL() {
        const body = `${this.fields.join(',')},${this.constraints.join(',')}`;
        return `CREATE TABLE IF NOT EXISTS ${this.objectName} (${body})`;
    }

}
