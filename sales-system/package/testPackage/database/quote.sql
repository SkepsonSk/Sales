CREATE TABLE IF NOT EXISTS quote (
    id VARCHAR(50),
    name VARCHAR(200),
    type VARCHAR(100) DEFAULT 'Default',
    opportunity VARCHAR(50),
    quotePrice DECIMAL(10,2),
    PRIMARY KEY (id),
    FOREIGN KEY (opportunity) REFERENCES opportunity (id)
)
