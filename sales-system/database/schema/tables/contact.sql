CREATE TABLE IF NOT EXISTS contact (
    id VARCHAR(50),
    name VARCHAR(200),
    account VARCHAR(50),
    PRIMARY KEY (id),
    FOREIGN KEY (account) REFERENCES account (id)
)
