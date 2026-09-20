CREATE TABLE positions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    position_name VARCHAR(100)
);

INSERT INTO positions (position_name) VALUES
('President'),
('General Secretary'),
('Assistant General Secretary'),
('Vice President'),
('Treasurer'),
('Assistant Treasurer'),
('Organization Secretary'),
('Sports Secretary'),
('Assistant Sports Secretary'),
('Joint Cultural Secretary'),
('Assistant Joint Cultural Secretary'),
('Executive Member 1'),
('Executive Member 2');

CREATE TABLE voters (
    voter_id VARCHAR(50) PRIMARY KEY,
    full_name VARCHAR(100),
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(50),
    zipcode VARCHAR(20),
    phone VARCHAR(20),
    voted BOOLEAN DEFAULT 0,
    vote_date DATETIME,
    voting_location VARCHAR(255)
);

CREATE TABLE candidates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100),
    position_id INT,
    FOREIGN KEY (position_id) REFERENCES positions(id)
);

CREATE TABLE votes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    voter_id VARCHAR(50),
    candidate_id INT,
    position_id INT,
    vote_time DATETIME,
    FOREIGN KEY (voter_id) REFERENCES voters(voter_id),
    FOREIGN KEY (candidate_id) REFERENCES candidates(id),
    FOREIGN KEY (position_id) REFERENCES positions(id)
);
CREATE TABLE settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    vote_date DATETIME DEFAULT NOT NULL,
    voting_start DATETIME DEFAULT NULL,
    voting_end DATETIME DEFAULT NULL
);