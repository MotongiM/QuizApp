DROP TABLE IF EXISTS answers CASCADE;
CREATE TABLE answers (
  id SERIAL PRIMARY KEY NOT NULL,
  question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,

  answer VARCHAR(255) NOT NULL,
  correct_answer BOOLEAN NOT NULL DEFAULT false
);
