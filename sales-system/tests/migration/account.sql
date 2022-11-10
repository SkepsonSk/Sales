CREATE TABLE IF NOT EXISTS account (
    id VARCHAR(50),
    name VARCHAR(200),
    type VARCHAR(100) DEFAULT 'Default',
    PRIMARY KEY (ID)
);
INSERT INTO account (id, name, type) VALUES ('000-0406b4b9-8905-4b25-8136-e3b20e580a1e', 'Account 1', 'Default');
