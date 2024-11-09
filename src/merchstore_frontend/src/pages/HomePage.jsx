import React from "react";
/* ----------------------------------------------------------------------------------------------------- */
/*  @ Components Import.
/* ----------------------------------------------------------------------------------------------------- */
import AnimationView from "../components/common/AnimationView";
import ScrollToTop from "../components/common/ScrollToTop";
import Contact from "../components/common/Contact";
import Footer from "../components/common/Footer";
import HomePageContainerMain from "../components/HomeComponents/HomePageContainerMain";
import Header from "../components/common/Header";
/* ----------------------------------------------------------------------------------------------------- */
/*  @ Base Components.
/* ----------------------------------------------------------------------------------------------------- */
const HomePage = () => {
  return (
    // <AnimationView>
    //   <ScrollToTop />
    //   <Header title={"MerchStore"}></Header>
    <HomePageContainerMain />
    //   <Contact></Contact>
    //   <Footer></Footer>
    // </AnimationView>
  );
};

export default HomePage;
