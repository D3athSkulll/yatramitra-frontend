import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box, Container, Button, List, ListItem } from '@mui/material';
import { styled } from '@mui/system';
const GlobalPresenceSection = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(6),
    padding: theme.spacing(1),
    marginBottom: theme.spacing(6),
    backgroundColor: '#f5f5f5', // Use a hardcoded color
    borderRadius: theme.shape.borderRadius,
  }));
  
  // Styled Flag container
  const FlagContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(6),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(5),
  }));
  const globalPresenceCountries = [
    { name: 'USA', flagUrl: 'https://flagcdn.com/w320/us.png' },
    { name: 'Canada', flagUrl: 'https://flagcdn.com/w320/ca.png' },
    { name: 'United Kingdom', flagUrl: 'https://flagcdn.com/w320/gb.png' },
    { name: 'Germany', flagUrl: 'https://flagcdn.com/w320/de.png' },
    { name: 'France', flagUrl: 'https://flagcdn.com/w320/fr.png' },
    { name: 'Italy', flagUrl: 'https://flagcdn.com/w320/it.png' },
    { name: 'Spain', flagUrl: 'https://flagcdn.com/w320/es.png' },
    { name: 'Australia', flagUrl: 'https://flagcdn.com/w320/au.png' },
    { name: 'Japan', flagUrl: 'https://flagcdn.com/w320/jp.png' },
    { name: 'China', flagUrl: 'https://flagcdn.com/w320/cn.png' },
    // Add more countries and flag URLs as needed
  ];
const GlobalPresence = () => {
    return (
        <>
        <GlobalPresenceSection>
            <Typography variant="h4" gutterBottom align="center">
                Our Global Presence
            </Typography>
            <Typography variant="body1" color="textSecondary" align="center">
                We are proud to have a presence in multiple countries around the world. Our network spans across various continents, ensuring that we can provide you with exceptional travel experiences wherever you are.
            </Typography>
            <FlagContainer>
                {globalPresenceCountries.map((country, index) => (
                    <Box key={index} sx={{ textAlign: 'center' }}>
                        <img src={country.flagUrl} alt={country.name} style={{ width: 100, height: 'auto', margin: '0 10px' }} />
                        <Typography variant="body2" color="textPrimary">
                            {country.name}
                        </Typography>
                    </Box>
                ))}
            </FlagContainer>
        </GlobalPresenceSection>
        </>
    )
}
export default GlobalPresence;