-- ============================
-- PBCA Voting System Database
-- ============================

-- Drop tables if they exist (safe for development)
DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS candidates;
DROP TABLE IF EXISTS positions;
DROP TABLE IF EXISTS voters;
DROP TABLE IF EXISTS settings;

-- ============================
-- VOTERS TABLE
-- ============================
CREATE TABLE voters (
    voter_id VARCHAR(50) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(50),
    zipcode VARCHAR(20),
    phone VARCHAR(20),
    voted TINYINT(1) DEFAULT 0,
    vote_date DATETIME NULL,
    voting_location DEFAULT NULL
);

-- ============================
-- POSITIONS TABLE
-- ============================
CREATE TABLE positions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    position_name VARCHAR(100) NOT NULL,
    max_votes INT DEFAULT 1
);

-- ============================
-- CANDIDATES TABLE
-- ============================
CREATE TABLE candidates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    photo VARCHAR(255),
    position_id INT NOT NULL,
    FOREIGN KEY (position_id) REFERENCES positions(id)
);

-- ============================
-- VOTES TABLE
-- ============================
CREATE TABLE votes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    voter_id VARCHAR(50) NOT NULL,
    candidate_id INT NOT NULL,
    position_id INT NOT NULL,
    vote_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (voter_id) REFERENCES voters(voter_id),
    FOREIGN KEY (candidate_id) REFERENCES candidates(id),
    FOREIGN KEY (position_id) REFERENCES positions(id)
);

-- ============================
-- SETTINGS TABLE
-- ============================
CREATE TABLE settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    voting_date DATETIME DEFAULT NOT NULL,
    voting_start DATETIME DEFAULT NULL,
    voting_end DATETIME DEFAULT NULL
);
