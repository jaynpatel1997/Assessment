const cors = require('cors');
const express = require('express');

const bodyParser = require('body-parser');
const app = express();
const port = 8080;
app.use(cors());
app.use(bodyParser.json());


function findMedianPrimes(n) {
  // Initialize an array to mark prime numbers
  const isPrime = new Array(n + 1).fill(true);
  isPrime[0] = isPrime[1] = false;

  // Use the Sieve of Eratosthenes algorithm to find prime numbers
  for (let p = 2; p * p <= n; p++) {
    if (isPrime[p]) {
      for (let i = p * p; i <= n; i += p) {
        isPrime[i] = false;
      }
    }
  }

  // Collect prime numbers into an array
  const primeNumbers = [];
  for (let i = 2; i <= n; i++) {
    if (isPrime[i]) {
      primeNumbers.push(i);
    }
  }

  // Calculate the median
  if (primeNumbers.length === 0) {
    return [];
  } else if (primeNumbers.length % 2 === 1) {
    // Odd number of prime numbers
    return [primeNumbers[Math.floor(primeNumbers.length / 2)]];
  } else {
    // Even number of prime numbers
    const mid = primeNumbers.length / 2;
    return [primeNumbers[mid - 1], primeNumbers[mid]];
  }
}

app.post('/findMedianPrimes', (req, res) => {
  const { n } = req.body;
  if (!n || typeof n !== 'number') {
    res.status(400).json({ error: 'Invalid input' });
  } else if (n < 2) {
    res.status(400).json({ error: 'Input must be greater than or equal to 2' });
  } else {
    const medianPrimes = findMedianPrimes(n);
    res.json({ medianPrimes });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;
