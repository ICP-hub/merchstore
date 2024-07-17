import React from "react";
import AnimationView from "../components/common/AnimationView";
import ScrollToTop from "../components/common/ScrollToTop";
import Header from "../components/common/Header";
import Hero from "../components/common/Hero";
import Contact from "../components/common/Contact";
import Footer from "../components/common/Footer";
import ProductPageContainerMain from "../components/ProductComponents/ProductPageContainerMain";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Base Components.
/* ----------------------------------------------------------------------------------------------------- */
const ProductPage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Header title={"Products"}></Header>
      <ProductPageContainerMain />
      <Contact></Contact>
      <Footer></Footer>
    </AnimationView>
  );
};

export default ProductPage;
