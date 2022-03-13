CREATE TABLE IF NOT EXISTS opportunity (
    id VARCHAR(50),
    name VARCHAR(200),
    type VARCHAR(100) DEFAULT 'Default',
    account VARCHAR(50),
    status VARCHAR(50),
    PRIMARY KEY (id),
    FOREIGN KEY (account) REFERENCES account (id)
)
