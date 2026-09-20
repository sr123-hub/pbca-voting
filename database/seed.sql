-- ============================
-- PBCA Voting System Seed Data
-- ============================

-- POSITIONS (your custom order)
INSERT INTO positions (position_name, max_votes) VALUES
('President', 1),
('General Secretary', 1),
('Assistant General Secretary', 1),
('Treasurer', 1),
('Assistant Treasurer', 1),
('Organization Secretary', 1),
('Joint Cultural Secretary', 1),
('Assistant Joint Cultural Secretary', 1),
('Sports Secretary', 1),
('Assistant Sports Secretary', 1),
('Executive Member 1', 1),
('Executive Member 2', 1);

-- SAMPLE CANDIDATES (you can replace these)
INSERT INTO candidates (full_name, photo, position_id) VALUES
('Alice Johnson', 'alice.jpg', 1),
('Bob Smith', 'bob.jpg', 1),

('John Doe', 'john.jpg', 2),
('Mary Adams', 'mary.jpg', 2),

('Kevin Brown', 'kevin.jpg', 4),
('Linda White', 'linda.jpg', 4);

-- SAMPLE VOTERS
INSERT INTO voters (voter_id, full_name, address, city, state, zipcode, phone) VALUES
('V001', 'Sirus Example', '123 Main St', 'Queens', 'NY', '11368', '555-1234'),
('V002', 'Test Voter', '456 Broadway', 'Brooklyn', 'NY', '11201', '555-5678');

-- SETTINGS
INSERT INTO settings (voting_date, voting_start, voting_end) VALUES
('2026-09-20', '2026-09-20 08:00:00','2026-09-20 21:00:00');
