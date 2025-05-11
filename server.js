const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// GET endpoint: metadata or health check
app.get('/api/data', (req, res) => {
  return res.json({
    status: 'OK',
    message: 'Use POST to submit your data to /api/data'
  });
});

// POST endpoint: process input array
app.post('/api/data', (req, res) => {
  try {
    const input = req.body.data;
    if (!Array.isArray(input)) throw new Error('`data` must be an array');

    // Separate numbers vs alphabets
    const nums = input.filter(item => /^\\d+$/.test(item));
    const alphas = input.filter(item => /^[A-Za-z]$/.test(item));

    // Find highest (alphabetically), case-insensitive
    const upperAlphas = alphas.map(a => a.toUpperCase());
    const highest = upperAlphas.length ? upperAlphas.sort().slice(-1)[0] : null;

    // Hardcoded user details
    const response = {
      status: 'Success',
      userId: 'dhruv malviya',
      collegeEmail: 'dhruvmalviya220807@acropolis.in',
      collegeRoll: '0827CS221086',
      numbers: nums,
      alphabets: alphas,
      highestAlphabet: highest
    };

    return res.json(response);
  } catch (err) {
    return res.status(400).json({ status: 'Error', message: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));