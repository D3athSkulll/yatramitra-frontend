import React, {lazy, Suspense} from 'react';
import { Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
// Ensure the path is correct
const VideoPlayer = lazy(() => import('./videoPlayer'));
const HeroContainer = styled(Box)(({ theme }) => ({
  height: '90vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  color: theme.palette.common.white,
  textAlign: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.4)', // Overlay color and opacity
    zIndex: 1,
  },
  [theme.breakpoints.down('sm')]: {
    height: '60vh', // Adjust height for smaller screens
  },
}));

const VideoBackground = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
  overflow: 'hidden',
});

const Hero = () => {
  return (
    <HeroContainer>
      <Suspense fallback={<p>Loading...</p>}>
      <VideoBackground>
        <VideoPlayer />
      </VideoBackground>
      </Suspense>
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', fontSize: { xs: '2rem', sm: '3rem' } }}>
          Welcome to Yatramitra
        </Typography>
        <Typography variant="h5" paragraph sx={{ p: 2, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          Your travel companion
        </Typography>
      </Container>
    </HeroContainer>
  );
};

export default Hero;
