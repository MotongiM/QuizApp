DROP TABLE IF EXISTS quizzes CASCADE;
CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

  title varchar(255) NOT NULL,
  description text NOT NULL,
  public BOOLEAN NOT NULL DEFAULT TRUE
);