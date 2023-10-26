import React, { Component } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file

class App extends Component {
  state = {
    n: '',
    medianPrimes: [],
    error: '',
  };

  handleInputChange = (e) => {
    this.setState({ n: e.target.value });
  };

  handleFindMedianPrimes = () => {
    const n = parseInt(this.state.n, 10);

    if (isNaN(n) || n < 2) {
      this.setState({ error: 'Invalid input. Please provide a valid number greater than or equal to 2.' });
      return;
    }

    axios
      .post('http://localhost:8080/findMedianPrimes', { n })
      .then((response) => {
        this.setState({
          medianPrimes: response.data.medianPrimes,
          error: '',
        });
      })
      .catch((error) => {
        this.setState({ error: 'Error fetching median primes.' });
        console.error('Axios error:', error);
      });
  };

  render() {
    return (
      <div className="App">
        <header className="header">
          <h1 className="main-heading">Median Prime Numbers</h1>
        </header>
        <div className="content">
          <div className="input-container">
            <input
              type="number"
              placeholder="Enter a number"
              value={this.state.n}
              onChange={this.handleInputChange}
            />
            <button className="find-button" onClick={this.handleFindMedianPrimes}>Find Median Primes</button>
          </div>
          {this.state.error && <p className="error">{this.state.error}</p>}
          {this.state.medianPrimes.length > 0 && (
            <div className="result-card fade-in">
              <h2>Median Prime Numbers</h2>
              <ul name="listbox-1" role="listbox">
                {this.state.medianPrimes.map((prime, index) => (
                  <li key={index} role="listitem">{prime}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
