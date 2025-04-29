require('dotenv').config();
const { Client } = require('pg');

// Use the environment variable from the .env file
const client = new Client({
  connectionString: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL,  // Correct connection string from .env
});

client.connect();

const createTables = async () => {
  try {
    // Create the MockInterview table
    await client.query(`
      CREATE TABLE "MockInterview" (
        id SERIAL PRIMARY KEY,
        "jsonMockResp" TEXT NOT NULL,
        "jobPosition" VARCHAR NOT NULL,
        "jobDesc" VARCHAR NOT NULL,
        "jobExperience" VARCHAR NOT NULL,
        "createdBy" VARCHAR NOT NULL,
        "createdAt" VARCHAR,
        "mockId" VARCHAR NOT NULL
      );
    `);

    // Create the userAnswer table
    await client.query(`
      CREATE TABLE "userAnswer" (
        id SERIAL PRIMARY KEY,
        "mockIdRef" VARCHAR NOT NULL,
        "question" VARCHAR NOT NULL,
        "correctAns" TEXT,
        "userAns" TEXT,
        "feedback" TEXT,
        "rating" VARCHAR,
        "userEmail" VARCHAR,
        "createdAt" VARCHAR
      );
    `);

    console.log("Tables created successfully!");
  } catch (err) {
    console.error("Error creating tables:", err);
  } finally {
    client.end();
  }
};

createTables();
