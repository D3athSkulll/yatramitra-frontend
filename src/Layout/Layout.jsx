import React from 'react';
import Footer from '../Navbars/Footer';
import Navbar from '../Navbars/Navbar';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { Outlet } from 'react-router-dom';

// Main container that wraps the entire page content and footer
const PageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh', // Ensures the page takes up at least the full viewport height
});

const ContentContainer = styled(Box)({
  flex: '1 0 auto', // This makes the content area grow to fill available space
  padding: '0', // Optional: Adds some padding to the content area
});

const Layout = () => {
  return (
    <PageContainer>
      <Navbar /> {/* Your navbar goes here */}
      <ContentContainer>
        <Outlet />
      </ContentContainer>
      <Footer /> {/* Footer is always at the bottom */}
    </PageContainer>
  );
};

export default Layout;
