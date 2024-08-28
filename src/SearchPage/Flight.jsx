'use client'

import React, { useState } from 'react';
import { 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  FormControl, 
  FormControlLabel, 
  Grid, 
  InputLabel, 
  MenuItem, 
  Radio, 
  RadioGroup, 
  Select, 
  TextField, 
  Typography 
} from '@mui/material';
import { 
  Flight as FlightIcon, 
  Train as TrainIcon, 
  DirectionsBus as BusIcon, 
  AccessTime as ClockIcon 
} from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// Mock data for search results
const mockResults = [
  { id: 1, type: 'flight', from: 'New York', to: 'London', departure: '2023-07-01 08:00', arrival: '2023-07-01 20:00', price: 500 },
  { id: 2, type: 'train', from: 'Paris', to: 'Berlin', departure: '2023-07-02 09:30', arrival: '2023-07-02 15:45', price: 120 },
  { id: 3, type: 'bus', from: 'Amsterdam', to: 'Brussels', departure: '2023-07-03 10:15', arrival: '2023-07-03 13:30', price: 40 },
];

export default function Component() {
  const [transportMode, setTransportMode] = useState('flight');
  const [tripType, setTripType] = useState('oneWay');
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [showResults, setShowResults] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [isSelectingReturnDate, setIsSelectingReturnDate] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (tripType === 'roundTrip' && !returnDate) {
      toast.error("Please select a return date for round trips.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    console.log('Search with:', { transportMode, tripType, departureCity, arrivalCity, departureDate, returnDate, passengers });
    setShowResults(true);
  };

  const handleResultClick = (result) => {
    setSelectedResult(result);
    console.log('Selected result:', result);
  };

  const getTransportIcon = (type) => {
    switch (type) {
      case 'flight':
        return <FlightIcon />;
      case 'train':
        return <TrainIcon />;
      case 'bus':
        return <BusIcon />;
      default:
        return null;
    }
  };

  const handleDepartureDateChange = (e) => {
    const selectedDate = e.target.value;
    setDepartureDate(selectedDate);
    if (tripType === 'roundTrip') {
      setIsSelectingReturnDate(true);
      toast.info("Departure date selected. Please select your return date.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <Grid container spacing={3} maxWidth="md" margin="auto">
      <ToastContainer />
      <Grid item xs={12} marginTop={12}>
        <Card>
          <CardHeader title="Search for Travel" />
          <CardContent>
            <form onSubmit={handleSearch}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Mode of Transport</InputLabel>
                    <Select
                      value={transportMode}
                      onChange={(e) => setTransportMode(e.target.value)}
                      label="Mode of Transport"
                    >
                      <MenuItem value="flight"><FlightIcon sx={{ mr: 1 }} /> Flight</MenuItem>
                      <MenuItem value="train"><TrainIcon sx={{ mr: 1 }} /> Train</MenuItem>
                      <MenuItem value="bus"><BusIcon sx={{ mr: 1 }} /> Bus</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      value={tripType}
                      onChange={(e) => {
                        setTripType(e.target.value);
                        setReturnDate('');
                        setIsSelectingReturnDate(false);
                      }}
                    >
                      <FormControlLabel value="oneWay" control={<Radio />} label="One-Way" />
                      <FormControlLabel 
                        value="roundTrip" 
                        control={<Radio />} 
                        label="Round Trip"
                        disabled={transportMode === 'train'}
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Departure City"
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Arrival City"
                    value={arrivalCity}
                    onChange={(e) => setArrivalCity(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Departure Date"
                    type="date"
                    value={departureDate}
                    onChange={handleDepartureDateChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      min: new Date().toISOString().split('T')[0]
                    }}
                    required
                  />
                </Grid>
                {tripType === 'roundTrip' && (
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Return Date"
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        min: departureDate || new Date().toISOString().split('T')[0]
                      }}
                      required={tripType === 'roundTrip'}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Number of Passengers"
                    type="number"
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    InputProps={{ inputProps: { min: 1, max: 10 } }}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth>Search</Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>

      {showResults && (
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Search Results" />
            <CardContent>
              <Grid container spacing={2}>
                {mockResults.map((result) => (
                  <Grid item xs={12} key={result.id}>
                    <Card 
                      onClick={() => handleResultClick(result)}
                      sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                    >
                      <CardContent>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item xs={8} container alignItems="center" spacing={2}>
                            <Grid item>{getTransportIcon(result.type)}</Grid>
                            <Grid item>
                              <Typography variant="subtitle1">{result.from} to {result.to}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                <ClockIcon sx={{ fontSize: 'small', mr: 0.5, verticalAlign: 'middle' }} />
                                {result.departure} - {result.arrival}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid item xs={4} textAlign="right">
                            <Typography variant="h6">${result.price}</Typography>
                            <Typography variant="body2" color="text.secondary">per person</Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
            <CardContent>
              <Button onClick={() => setShowResults(false)} variant="outlined" fullWidth>
                Back to Search
              </Button>
            </CardContent>
          </Card>
        </Grid>
      )}

      {selectedResult && (
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Selected Travel Option" />
            <CardContent>
              <Typography variant="body1">You have selected a {selectedResult.type} from {selectedResult.from} to {selectedResult.to}.</Typography>
              <Typography variant="body1">Departure: {selectedResult.departure}</Typography>
              <Typography variant="body1">Arrival: {selectedResult.arrival}</Typography>
              <Typography variant="body1">Price: ${selectedResult.price} per person</Typography>
            </CardContent>
            <CardContent>
              <Button onClick={() => setSelectedResult(null)} variant="outlined" fullWidth>
                Close
              </Button>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );
}