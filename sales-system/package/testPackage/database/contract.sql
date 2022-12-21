CREATE TABLE IF NOT EXISTS contract (
    id VARCHAR(50),
    name VARCHAR(200),
    type VARCHAR(100) DEFAULT 'Default',
    opportunity VARCHAR(50),
    status VARCHAR(50) DEFAULT 'draft',
    PRIMARY KEY (id),
    FOREIGN KEY (opportunity) REFERENCES opportunity (id)
)
