import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
  Paper,
  Grid,
} from '@mui/material';

// Main App component
const App = () => {
  // State for flight search form inputs
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [flightClass, setFlightClass] = useState('Economy');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Dummy data for search results
  const mockFlights = [
    { id: 'F001', airline: 'SkyConnect', origin: 'NYC', destination: 'LAX', departure: '2025-08-10 08:00', arrival: '2025-08-10 11:00', price: 250, duration: '5h 0m' },
    { id: 'F002', airline: 'Global Wings', origin: 'NYC', destination: 'LAX', departure: '2025-08-10 09:30', arrival: '2025-08-10 12:30', price: 280, duration: '4h 30m' },
    { id: 'F003', airline: 'AeroLink', origin: 'NYC', destination: 'LAX', departure: '2025-08-10 10:00', arrival: '2025-08-10 13:00', price: 230, duration: '4h 0m' },
    { id: 'F004', airline: 'SkyConnect', origin: 'LAX', destination: 'NYC', departure: '2025-08-15 14:00', arrival: '2025-08-15 22:00', price: 270, duration: '5h 0m' },
    { id: 'F005', airline: 'Global Wings', origin: 'LAX', destination: 'NYC', departure: '2025-08-15 15:30', arrival: '2025-08-15 23:30', price: 290, duration: '4h 30m' },
  ];

  // Function to handle flight search
  const handleSearch = () => {
    setIsLoading(true);
    setShowResults(false); // Hide previous results
    // Simulate API call delay
    setTimeout(() => {
      // In a real application, you would make an API call here
      // e.g., fetch('/api/flights', { method: 'POST', body: JSON.stringify({ origin, destination, departureDate, returnDate, passengers, flightClass }) })
      // .then(res => res.json())
      // .then(data => setSearchResults(data));

      // For this demo, we'll filter mock data based on origin and destination
      const filteredResults = mockFlights.filter(flight =>
        flight.origin.toLowerCase() === origin.toLowerCase() &&
        flight.destination.toLowerCase() === destination.toLowerCase()
      );
      setSearchResults(filteredResults);
      setIsLoading(false);
      setShowResults(true);
    }, 1500); // Simulate 1.5 second loading time
  };

  // Tailwind CSS classes for consistent styling
  const inputClasses = "w-full rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500";
  const buttonClasses = "w-full py-3 rounded-lg font-semibold text-white transition duration-200 ease-in-out transform hover:scale-105";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4 font-inter">
      <Paper elevation={10} className="p-8 md:p-12 bg-white rounded-3xl shadow-2xl max-w-4xl w-full">
        <Typography variant="h4" component="h1" className="text-center text-gray-800 mb-8 font-bold">
          <span className="text-blue-600">Sky</span><span className="text-indigo-600">Scanner</span> Clone
        </Typography>

        {/* Flight Search Form */}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Origin"
              variant="outlined"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className={inputClasses}
              placeholder="e.g., NYC"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Destination"
              variant="outlined"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className={inputClasses}
              placeholder="e.g., LAX"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Departure Date"
              type="date"
              variant="outlined"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className={inputClasses}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Return Date (Optional)"
              type="date"
              variant="outlined"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className={inputClasses}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" className={inputClasses}>
              <InputLabel>Passengers</InputLabel>
              <Select
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                label="Passengers"
              >
                {[...Array(10)].map((_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" className={inputClasses}>
              <InputLabel>Class</InputLabel>
              <Select
                value={flightClass}
                onChange={(e) => setFlightClass(e.target.value)}
                label="Class"
              >
                <MenuItem value="Economy">Economy</MenuItem>
                <MenuItem value="Premium Economy">Premium Economy</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
                <MenuItem value="First Class">First Class</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              disabled={isLoading || !origin || !destination || !departureDate}
              className={`${buttonClasses} bg-blue-600 hover:bg-blue-700`}
            >
              {isLoading ? 'Searching...' : 'Search Flights'}
            </Button>
          </Grid>
        </Grid>

        {/* Search Results Display */}
        {showResults && (
          <Box className="mt-10">
            <Typography variant="h5" component="h2" className="text-center text-gray-700 mb-6 font-semibold">
              Available Flights
            </Typography>
            {searchResults.length > 0 ? (
              <Grid container spacing={3}>
                {searchResults.map((flight) => (
                  <Grid item xs={12} key={flight.id}>
                    <Paper elevation={3} className="p-6 rounded-xl bg-gray-50 hover:shadow-lg transition-shadow duration-200">
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12} md={4}>
                          <Typography variant="h6" className="text-blue-800 font-bold">{flight.airline}</Typography>
                          <Typography variant="body2" className="text-gray-600">{flight.origin} to {flight.destination}</Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Typography variant="body1" className="text-gray-700">
                            Depart: {flight.departure}
                          </Typography>
                          <Typography variant="body1" className="text-gray-700">
                            Arrive: {flight.arrival}
                          </Typography>
                          <Typography variant="body2" className="text-gray-500">
                            Duration: {flight.duration}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={4} className="text-right">
                          <Typography variant="h5" className="text-green-600 font-extrabold">
                            ${flight.price}
                          </Typography>
                          <Button variant="contained" size="small" className="mt-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white">
                            Select Flight
                          </Button>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1" className="text-center text-gray-500 mt-4">
                No flights found for your search criteria.
              </Typography>
            )}
          </Box>
        )}
      </Paper>
    </div>
  );
};

export default App;
