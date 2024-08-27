import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box, Container, Button } from '@mui/material';
import { styled } from '@mui/system';

// Sample travel packages data
const travelPackages = [
  {
    title: "Exploring the Golden Triangle",
    description: "Experience the rich culture and history of India's iconic Golden Triangle: Delhi, Agra, and Jaipur.",
    price: "₹30,000",
    days: "7 Days",
    imageUrl: "https://via.placeholder.com/600x400?text=Golden+Triangle",
    details: "This package includes guided tours of the Taj Mahal, Amber Fort, and many other iconic landmarks."
  },
  {
    title: "Goa Beach Extravaganza",
    description: "Enjoy the sun, sand, and sea with our luxurious beach vacation package in Goa.",
    price: "₹25,000",
    days: "5 Days",
    imageUrl: "https://via.placeholder.com/600x400?text=Goa+Beach",
    details: "Stay at a 5-star beach resort, with all meals included, plus water sports and beach activities."
  },
  {
    title: "Kerala Backwaters Retreat",
    description: "Relax and rejuvenate with a serene backwater cruise through Kerala's picturesque landscapes.",
    price: "₹40,000",
    days: "6 Days",
    imageUrl: "https://via.placeholder.com/600x400?text=Kerala+Backwaters",
    details: "Cruise through Kerala's backwaters on a traditional houseboat, with daily excursions to local villages."
  },
  {
    title: "Himalayan Adventure",
    description: "Embark on an exhilarating adventure through the majestic Himalayan mountains.",
    price: "₹50,000",
    days: "10 Days",
    imageUrl: "https://via.placeholder.com/600x400?text=Himalayan+Adventure",
    details: "Trek through the Himalayas with expert guides, and enjoy camping under the stars."
  },
];

const StyledCard = styled(Card)(({ theme, isOpen }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  maxHeight: 800,
  width: '100%',
  ...(isOpen ? {
    transition: 'none',
    boxShadow: 'none',
    transform: 'none',
  } : {
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.12)',
    },
  }),
}));

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: 200,
});

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2),
  flexDirection: 'row'
}));

const OverlayContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'auto',
  padding: theme.spacing(2),
}));

const OverlayContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '90%',
  maxWidth: 1000,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  pointerEvents: 'auto',
}));

const CenteredGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: theme.spacing(4),
}));

const TravelPackageSection = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    if (selectedPackage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedPackage]);

  const handleCardClick = (pkg) => {
    setSelectedPackage(pkg);
  };

  const handleCloseClick = () => {
    setSelectedPackage(null);
  };

  return (
    <Container maxWidth="lg">
      {selectedPackage && (
        <OverlayContainer>
          <OverlayContent>
            <StyledCard sx={{ height: '100%' }} isOpen>
              <CardMedia
                component="img"
                height="400"
                image={selectedPackage.imageUrl}
                alt={selectedPackage.title}
                loading='lazy'
              />
              <StyledCardContent>
                <Typography variant="h4" component="div">
                  {selectedPackage.title}
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                  {selectedPackage.description}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  {selectedPackage.details}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 2,
                  }}
                >
                  <Typography variant="h6">{selectedPackage.price}</Typography>
                  <Typography variant="body2">{selectedPackage.days}</Typography>
                </Box>
                <ButtonContainer>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleCloseClick}
                    sx={{ mt: 2, width: '30%' }}
                  >
                    Close
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCloseClick}
                    sx={{ mt: 2, width: '30%' }}
                  >
                    Book
                  </Button>
                </ButtonContainer>
              </StyledCardContent>
            </StyledCard>
          </OverlayContent>
        </OverlayContainer>
      )}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Explore Our Travel Packages
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Discover our curated travel packages designed to provide you with unforgettable experiences. Whether you're seeking adventure, relaxation, or cultural immersion, we have something for everyone.
        </Typography>
      </Box>
      <CenteredGrid container spacing={4}>
        {travelPackages.map((pkg, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <StyledCard onClick={() => handleCardClick(pkg)} isOpen={!!selectedPackage}>
              <CardMedia
                component="img"
                height="140"
                image={pkg.imageUrl}
                alt={pkg.title}
                loading='lazy'
              />
              <StyledCardContent>
                <Typography variant="h6" component="div">
                  {pkg.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {pkg.description}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 2,
                  }}
                >
                  <Typography variant="h6">{pkg.price}</Typography>
                  <Typography variant="body2">{pkg.days}</Typography>
                </Box>
              </StyledCardContent>
            </StyledCard>
          </Grid>
        ))}
      </CenteredGrid>
    </Container>
  );
};

export default TravelPackageSection;
