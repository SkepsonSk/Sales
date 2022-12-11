CREATE TABLE IF NOT EXISTS quoteLine (
    id VARCHAR(50),
    name VARCHAR(200),
    type VARCHAR(100) DEFAULT 'Default',
    price DECIMAL(10,2),
    quantity INT,
    quote VARCHAR(50),
    product VARCHAR(50),
    PRIMARY KEY (id),
    FOREIGN KEY (quote) REFERENCES quote (id),
    FOREIGN KEY (product) REFERENCES product (id)
)
