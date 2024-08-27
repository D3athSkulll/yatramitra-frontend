import React, { useState, useEffect } from 'react';
import { Box, Container, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ads = [
  {
    id: 1,
    imageUrl: 'https://via.placeholder.com/600x200?text=Ad+1', // Replace with your ad image URLs
    altText: 'Ad 1',
  },
  {
    id: 2,
    imageUrl: 'https://via.placeholder.com/600x200?text=Ad+2',
    altText: 'Ad 2',
  },
  {
    id: 3,
    imageUrl: 'https://via.placeholder.com/600x200?text=Ad+3',
    altText: 'Ad 3',
  },
  // Add more ads as needed
];

const AdSectionContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: 'auto',
    opacity: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    transition: 'opacity 1s ease-in-out', // Smooth fade-in, fade-out transition
  },
  '& img.active': {
    opacity: 1, // Only the active image is fully visible
    position: 'relative',
  },
}));

const AdSection = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change ad every 5 seconds

    return () => clearInterval(interval);
  }, [currentAdIndex]);

  const handleNext = () => {
    setCurrentAdIndex((prevIndex) =>
      prevIndex === ads.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentAdIndex((prevIndex) =>
      prevIndex === 0 ? ads.length - 1 : prevIndex - 1
    );
  };

  return (
    <Container maxWidth="md" sx={{ position: 'relative', padding: 5 }}>
      <AdSectionContainer>
        {ads.map((ad, index) => (
          <a
            key={ad.id}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: index === currentAdIndex ? 'block' : 'none' }} // Hide inactive ads
          >
            <img
              src={ad.imageUrl}
              alt={ad.altText}
              className={index === currentAdIndex ? 'active' : ''}
              loading='lazy'
            />
          </a>
        ))}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
            zIndex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Add background for better visibility
            borderRadius: '50%',
          }}
        >
          <IconButton onClick={handlePrev} aria-label="Previous ad" sx={{ color: '#fff' }}>
            <ArrowBackIosIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            right: 0,
            transform: 'translateY(-50%)',
            zIndex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Add background for better visibility
            borderRadius: '50%',
          }}
        >
          <IconButton onClick={handleNext} aria-label="Next ad" sx={{ color: '#fff' }}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </AdSectionContainer>
    </Container>
  );
};

export default AdSection;
