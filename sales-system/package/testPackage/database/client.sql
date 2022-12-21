CREATE TABLE IF NOT EXISTS client (
    id VARCHAR(50),
    name VARCHAR(200),
    type VARCHAR(100) DEFAULT 'Default',
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    company VARCHAR(100),
    PRIMARY KEY (id)
)
