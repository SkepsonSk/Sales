CREATE TABLE IF NOT EXISTS account
(
    id   VARCHAR(50),
    name VARCHAR(200),
    type VARCHAR(100) DEFAULT 'Default',
    PRIMARY KEY (ID)
);
CREATE TABLE IF NOT EXISTS opportunity
(
    id      VARCHAR(50),
    name    VARCHAR(200),
    type    VARCHAR(100) DEFAULT 'Default',
    account VARCHAR(50),
    status  VARCHAR(50),
    PRIMARY KEY (id),
    FOREIGN KEY (account) REFERENCES account (id)
);
CREATE TABLE IF NOT EXISTS quote
(
    id          VARCHAR(50),
    name        VARCHAR(200),
    type        VARCHAR(100) DEFAULT 'Default',
    opportunity VARCHAR(50),
    quotePrice  DECIMAL(10, 2),
    PRIMARY KEY (id),
    FOREIGN KEY (opportunity) REFERENCES opportunity (id)
);
CREATE TABLE IF NOT EXISTS product
(
    id    VARCHAR(50),
    name  VARCHAR(200),
    type  VARCHAR(100) DEFAULT 'Default',
    price DOUBLE,
    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS quoteline
(
    id       VARCHAR(50),
    name     VARCHAR(200),
    type     VARCHAR(100) DEFAULT 'Default',
    price    DECIMAL(10, 2),
    quantity INT,
    quote    VARCHAR(50),
    product  VARCHAR(50),
    PRIMARY KEY (id),
    FOREIGN KEY (quote) REFERENCES quote (id),
    FOREIGN KEY (product) REFERENCES product (id)
);

INSERT INTO account (id, name, type)
VALUES ('000-0406b4b9-8905-4b25-8136-e3b20e580a1e', 'Account 1', 'Default');

INSERT INTO opportunity (id, name, type, account, status)
VALUES ('001-0406b4b9-8905-4b25-8136-e3b20e580a1e', 'Opportunity 1', 'Default',
        '000-0406b4b9-8905-4b25-8136-e3b20e580a1e', 'draft');

INSERT INTO quote (id, name, type, opportunity, quotePrice)
VALUES ('002-0406b4b9-8905-4b25-8136-e3b20e580a1e', 'Quote 1', 'Default', '001-0406b4b9-8905-4b25-8136-e3b20e580a1e',
        0);

INSERT INTO quote (id, name, type, opportunity, quotePrice)
VALUES ('002-0406b4b9-8905-4b25-8136-e3b20e580a1f', 'Quote 2', 'Default', '001-0406b4b9-8905-4b25-8136-e3b20e580a1e',
        0);

INSERT INTO quote (id, name, type, opportunity, quotePrice)
VALUES ('002-0406b4b9-8905-4b25-8136-e3b20e580a1g', 'Quote 2', 'Default', '001-0406b4b9-8905-4b25-8136-e3b20e580a1e',
        0);

INSERT INTO product (id, name, type, price)
VALUES ('003-0406b4b9-8905-4b25-8136-e3b20e580a1e', 'Product 1', 'Default', 500);
