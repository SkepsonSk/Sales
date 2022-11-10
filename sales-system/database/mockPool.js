class Connection {
    async execute ( sql ) {
        return Promise.resolve(this.mockData);
    }

    async beginTransaction () {}
    async commit () {}
    async release () {}

    setMockData(mockData) {
        this.mockData = mockData;
    }
}

const getConnection = async () => {
    return Promise.resolve(this.conn);
}

const initialize = () => {
    this.conn = new Connection();
}

exports.initialize = initialize;
exports.getConnection = getConnection;


