import React, { useState, useEffect } from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, RadioGroup, Radio, Button, Typography, Autocomplete } from '@mui/material';
import { styled } from '@mui/material/styles';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import default styles
import '../styles/DatePickerStyles.css'; // Import the custom CSS

const TicketSearchContainer = styled(Box)(({ theme }) => ({
  height: '70vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  background: 'url(./search_background.jpg) no-repeat center center',
  backgroundSize: 'cover',
  padding: theme.spacing(4),
  '@media (max-width:600px)': {
    padding: theme.spacing(2), // Reduce padding for smaller screens
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)', // Dark overlay
    zIndex: 1,
  },
}));

const FormContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  maxWidth: '600px',
  width: '100%',
  '@media (max-width:600px)': {
    padding: theme.spacing(2), // Reduce padding for smaller screens
  },
}));

const TicketSearch = () => {
  const [formValues, setFormValues] = useState({
    departureCity: null,
    arrivalCity: null,
    tripType: 'oneway',
    transportMode: 'train',
    departureDate: new Date(),
    arrivalDate: new Date(),
  });
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch cities data from API
    const fetchCities = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.example.com/cities'); // Replace with your API endpoint
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities data:', error);
        setCities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const handleChange = (event, value) => {
    const { name } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleDateChange = (name) => (date) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: date,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formValues);

    // Reset all fields except for departureDate and arrivalDate
    setFormValues((prevValues) => ({
      departureCity: null,
      arrivalCity: null,
      tripType: prevValues.tripType,
      transportMode: 'train',
      departureDate: prevValues.departureDate, // Preserve current date
      arrivalDate: prevValues.arrivalDate, // Preserve current date
    }));
  };

  return (
    <TicketSearchContainer>
      <FormContainer>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Ticket Search
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="grid" gap={2}>
            <Autocomplete
              options={cities}
              getOptionLabel={(option) => option} // Adjust based on API response
              value={formValues.departureCity}
              onChange={(event, newValue) => handleChange({ target: { name: 'departureCity' } }, newValue)}
              renderInput={(params) => <TextField {...params} label="Departure City" variant="outlined" fullWidth />}
              loading={loading}
            />
            <Autocomplete
              options={cities}
              getOptionLabel={(option) => option} // Adjust based on API response
              value={formValues.arrivalCity}
              onChange={(event, newValue) => handleChange({ target: { name: 'arrivalCity' } }, newValue)}
              renderInput={(params) => <TextField {...params} label="Arrival City" variant="outlined" fullWidth />}
              loading={loading}
            />
            
            <FormControl component="fieldset">
              <Typography variant="subtitle1">Trip Type</Typography>
              <RadioGroup
                row
                name="tripType"
                value={formValues.tripType}
                onChange={(event) => handleChange(event, event.target.value)}
              >
                <FormControlLabel value="oneway" control={<Radio />} label="One Way" />
                <FormControlLabel value="roundtrip" control={<Radio />} label="Round Trip" />
              </RadioGroup>
            </FormControl>

            <FormControl variant="outlined" fullWidth>
              <InputLabel>Mode of Transport</InputLabel>
              <Select
                label="Mode of Transport"
                name="transportMode"
                value={formValues.transportMode}
                onChange={(event) => handleChange(event, event.target.value)}
              >
                <MenuItem value="train">Train</MenuItem>
                <MenuItem value="bus">Bus</MenuItem>
                <MenuItem value="flight">Flight</MenuItem>
              </Select>
            </FormControl>
            <DatePicker
              selected={formValues.departureDate}
              onChange={handleDateChange('departureDate')}
              dateFormat="yyyy/MM/dd"
              className="date-picker"
              minDate={new Date()}
              placeholderText="Departure Date"
              style={{ width: '100%' }}
            />
            <DatePicker
              selected={formValues.arrivalDate}
              onChange={handleDateChange('arrivalDate')}
              dateFormat="yyyy/MM/dd"
              className="date-picker"
              minDate={new Date(formValues.departureDate?.getTime() + 86400000)} // Add 1 day to departure date
              placeholderText="Arrival Date"
              value={formValues.tripType === 'oneway' ? "" : new Date(formValues.arrivalDate.getTime()+86400000)}
              disabled={formValues.tripType === 'oneway'}
              style={{ width: '100%' }}
            />

            <Button variant="contained" color="primary" fullWidth type="submit">
              Search
            </Button>
          </Box>
        </form>
      </FormContainer>
    </TicketSearchContainer>
  );
};

export default TicketSearch;
