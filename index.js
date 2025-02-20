const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;

// In-memory storage for used emails
const usedEmails = new Set();

// Function to generate a random email
function generateRandomEmail() {
  const randomString = uuidv4().split('-')[0]; // Take the first part of the UUID
  const email = `${randomString}@kmmtest.com`;
  return email;
}

// Endpoint to get a unique random email
app.get('/get-email', (req, res) => {
  let email;
  do {
    email = generateRandomEmail();
  } while (usedEmails.has(email));

  usedEmails.add(email);
  res.json({ email });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
