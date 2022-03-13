CREATE TABLE IF NOT EXISTS quoteLine (
    id VARCHAR(50),
    name VARCHAR(200),
    type VARCHAR(100) DEFAULT 'Default',
    quote VARCHAR(50),
    unitPrice DECIMAL(10,2),
    quantity INT,
    PRIMARY KEY (id),
    FOREIGN KEY (quote) REFERENCES quote (id)
)
