import React, { useState, useEffect } from 'react';
import { Box, Radio, RadioGroup, FormControlLabel, TextField, Button, Typography, Autocomplete } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerStyles.css'; // Import your custom CSS

const SearchForm = ({ mode = 'flight' }) => {
  const [loading, setLoading] = useState(false);
  const [tripType, setTripType] = useState('one-way');
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [locations, setLocations] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic
  };

  useEffect(() => {
    const fetchAllLocations = async () => {
      setLoading(true);
      try {
        // Mock API call
        const data = {
          locations: [
            { id: 1, city: 'New York', state: 'NY', country: 'USA' },
            { id: 2, city: 'Los Angeles', state: 'CA', country: 'USA' },
            { id: 3, city: 'San Francisco', state: 'CA', country: 'USA' },
            { id: 4, city: 'Chicago', state: 'IL', country: 'USA' },
            { id: 5, city: 'Miami', state: 'FL', country: 'USA' },
            { id: 6, city: 'London', state: null, country: 'UK' },
            { id: 7, city: 'Paris', state: null, country: 'France' },
            { id: 8, city: 'Berlin', state: null, country: 'Germany' },
            { id: 9, city: 'Tokyo', state: null, country: 'Japan' },
            { id: 10, city: 'Sydney', state: 'NSW', country: 'Australia' }
          ]
        };
        setLocations(data.locations);
      } catch (error) {
        console.error('Error fetching locations:', error);
        setLocations([]); // Fallback to an empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchAllLocations();
  }, []);

  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 3 },
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Search Your Trip
      </Typography>

      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          flexWrap: 'wrap',
        }}
        onSubmit={handleSearch}
      >
        <RadioGroup
          row
          value={tripType}
          onChange={(e) => setTripType(e.target.value)}
          sx={{ flexBasis: { xs: '100%', md: '20%' }, marginBottom: { xs: 2, md: 0 } }}
        >
          <FormControlLabel
            value="one-way"
            control={<Radio />}
            label="One Way"
          />
          <FormControlLabel
            value="round"
            control={<Radio />}
            label="Round Trip"
            disabled={mode === 'train'}
          />
        </RadioGroup>

        <Autocomplete
          value={fromLocation}
          onChange={(event, newValue) => setFromLocation(newValue)}
          options={locations}
          getOptionLabel={(option) => `${option.city || ''}, ${option.state || ''}, ${option.country || ''}`}
          renderInput={(params) => (
            <TextField
              {...params}
              label="From"
              variant="outlined"
              fullWidth
              sx={{ flexBasis: { xs: '100%', md: '25%' }, minWidth: '250px' }}
            />
          )}
        />

        <Autocomplete
          value={toLocation}
          onChange={(event, newValue) => setToLocation(newValue)}
          options={locations}
          getOptionLabel={(option) => `${option.city || ''}, ${option.state || ''}, ${option.country || ''}`}
          renderInput={(params) => (
            <TextField
              {...params}
              label="To"
              variant="outlined"
              fullWidth
              sx={{ flexBasis: { xs: '100%', md: '25%' }, minWidth: '250px' }}
            />
          )}
        />

        <DatePicker
          selected={departureDate}
          onChange={(date) => setDepartureDate(date)}
          placeholderText="Departure Date"
          customInput={<TextField label="Departure Date" variant="outlined" fullWidth sx={{ flexBasis: { xs: '100%', md: '25%' }, minWidth: '200px' }} />}
        />

        <DatePicker
          selected={returnDate}
          onChange={(date) => setReturnDate(date)}
          placeholderText="Return Date"
          customInput={<TextField label="Return Date" variant="outlined" fullWidth sx={{ flexBasis: { xs: '100%', md: '25%' }, minWidth: '200px' }} />}
          disabled={tripType === 'one-way'}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            height: '56px',
            flexBasis: { xs: '100%', md: '6%' },
            textTransform: 'none',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontSize: '16px',
            marginTop: { xs: 2, md: 0 }, // Add margin-top on smaller screens
          }}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default SearchForm;
