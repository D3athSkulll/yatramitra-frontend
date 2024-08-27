import React from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import GitHubIcon from '@mui/icons-material/GitHub';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

  body {
    font-family: 'Poppins', sans-serif;
  }
`;

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#24262b',
  padding: '50px 5%',
  marginTop: 'auto',
  fontFamily: 'Poppins, sans-serif',
  [theme.breakpoints.down('md')]: {
    padding: '30px 5%',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '20px 5%',
  },
}));

const FooterRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

const FooterCol = styled(Box)(({ theme }) => ({
  width: '100%',
  marginBottom: '20px',
  [theme.breakpoints.up('md')]: {
    width: '25%',
    marginBottom: '0',
    padding: '0 15px',
  },
}));

const FooterHeading = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: '#ffffff',
  textTransform: 'capitalize',
  marginBottom: '20px',
  fontWeight: '500',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: '-5px',
    backgroundColor: '#e91e63',
    height: '2px',
    width: '50px',
  },
}));

const FooterLink = styled(Link)(({ theme }) => ({
  fontSize: '16px',
  textTransform: 'capitalize',
  color: '#bbbbbb',
  textDecoration: 'none',
  fontWeight: '300',
  display: 'block',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#ffffff',
    paddingLeft: '8px',
  },
}));

const SocialLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '10px',
}));

const SocialLink = styled(IconButton)(({ theme }) => ({
  height: '40px',
  width: '40px',
  backgroundColor: 'rgba(255,255,255,0.2)',
  textAlign: 'center',
  lineHeight: '40px',
  borderRadius: '50%',
  color: '#ffffff',
  transition: 'all 0.5s ease',
  '&:hover': {
    color: '#24262b',
    backgroundColor: '#ffffff',
  },
}));

const FooterBottom = styled(Box)(({ theme }) => ({
  backgroundColor: '#24262b',
  padding: '10px 0',
  textAlign: 'center',
  color: '#bbbbbb',
  fontSize: '14px',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  marginTop: '20px',
  [theme.breakpoints.down('sm')]: {
    padding: '10px 5%',
  },
}));

const Footer = () => {
  return (
    <>
      <GlobalStyle />
      <FooterContainer>
        <FooterRow>
          <FooterCol>
            <FooterHeading variant="h4">YatraMitra</FooterHeading>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><FooterLink href="../views/about.html">about us</FooterLink></li>
              <li><FooterLink href="../views/services.html">our services</FooterLink></li>
              <li><FooterLink href="../views/privacypolicy.html">privacy policy</FooterLink></li>
              <li><FooterLink href="../views/termsAndConditions.html">terms of service</FooterLink></li>
            </ul>
          </FooterCol>
          <FooterCol>
            <FooterHeading variant="h4">get help</FooterHeading>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><FooterLink href="../views/faq.html">FAQ</FooterLink></li>
              <li><FooterLink href="../views/contact.html">contact us</FooterLink></li>
            </ul>
          </FooterCol>
          <FooterCol>
            <FooterHeading variant="h4">follow us</FooterHeading>
            <SocialLinks>
              <SocialLink component="a" href="https://github.com/D3athSkulll/yatramitra-frontend">
                <GitHubIcon />
              </SocialLink>
              <SocialLink component="a" href="https://github.com/D3athSkulll/yatramitra-backend">
                <GitHubIcon />
              </SocialLink>
            </SocialLinks>
          </FooterCol>
        </FooterRow>
        <FooterBottom>
          &copy; 2024 YatraMitra. All rights reserved.
        </FooterBottom>
      </FooterContainer>
    </>
  );
};

export default Footer;
