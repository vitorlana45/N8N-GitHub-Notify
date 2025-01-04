
CREATE TABLE commit_details (
  id SERIAL PRIMARY KEY,
  committer_username VARCHAR(255),
  committer_email VARCHAR(255),
  modified_files JSONB,
  real_ip VARCHAR(255),
  event_type VARCHAR(255),
  pushed_at BIGINT,
  commit_id VARCHAR(255),
  developed_by VARCHAR(255)
);

-- Exemplo de inserção de dados válidos
INSERT INTO commit_details (committer_username, committer_email, modified_files, real_ip, event_type, pushed_at, commit_id, developed_by)
VALUES ('user1', 'user1@example.com', '[]', '127.0.0.1', 'push', 1736038885000, 'commit123', 'developer1');