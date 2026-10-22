import AllProducts from "@/components/AllPrpducts";
import HeroSection from "@/components/Hero";
import Marque from "@/components/marque";
import PriceDown from "@/components/PriceFallers";
import PriceUp from "@/components/priceUp";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Marque></Marque>
      <HeroSection></HeroSection>
      <PriceUp></PriceUp>
      <PriceDown></PriceDown>
      <AllProducts></AllProducts>
    </div>
  );
};

export default HomePage;
