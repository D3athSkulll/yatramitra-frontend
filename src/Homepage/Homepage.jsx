import React, { lazy, Suspense } from 'react';
import Hero from './Hero';
import Form  from './Form';
import Ad from './Ad';
import TravelPackageSection from './Packages';
import GlobalPresence from './GlobalPresencse';
function Homepage() {
 

  return (
    <>
      <Hero />
      <Form />
      <Ad />
      <TravelPackageSection />
      <GlobalPresence />
    </>
  );
}

export default Homepage;
