/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import ScrollToTop from "../components/common/ScrollToTop";
import Header from "../components/common/Header";
import Contact from "../components/common/Contact";
import Footer from "../components/common/Footer";
import AnimationView from "../components/common/AnimationView";
import React from "react";
import ContactPageContainerMain from "../components/ContactPageComponents/ContactPageContainerMain";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Base Components.
/* ----------------------------------------------------------------------------------------------------- */
const ContactPage = () => {
  return (
    // <AnimationView>
    //   <ScrollToTop />
    //   <Header title={"ContactUs"}></Header>
    <ContactPageContainerMain />
    // <Contact></Contact>
    // <Footer></Footer>
    // </AnimationView>
  );
};

export default ContactPage;
