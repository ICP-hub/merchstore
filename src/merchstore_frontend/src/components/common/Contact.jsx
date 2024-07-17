/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import toast from "react-hot-toast";
import UserApiHanlder from "../../apiHandlers/UserApiHandler";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Component Contact.
/* ----------------------------------------------------------------------------------------------------- */
const Contact = () => {
  const [email, setEmail] = useState("");
  const { createContact, isLoading, successfulSubmit } = UserApiHanlder();

  // handle email validation regex and send
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = () => {
    if (isEmailValid(email)) {
      // Apply backend methods
      createContact({ email: email });
      console.log("Email is valid!");
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  // Reset the form when successfulSubmit is true
  useEffect(() => {
    if (successfulSubmit) {
      setEmail("");
    }
  }, [successfulSubmit]);

  return (
    <div
      className="py-6 px-6 max-md:px-2 md:container md:mx-auto  flex flex-col justify-center items-center"
      data-aos="fade-up"
    >
      <div className="rounded-t-3xl bg-black/70 w-[80%] md:w-[90%] py-2"></div>
      <div className="rounded-t-3xl bg-black/80 w-[90%] md:w-[95%] py-2"></div>
      <div className="w-full flex px-6 py-12 bg-black bg-opacity-90 rounded-2xl flex-col gap-4 tracking-wider">
        <p className="max-md:text-xl text-2xl font-semibold text-white max-w-80">
          Get the latest merch drops and exclusive offers. Subscribe now!
        </p>
        <div className="flex justify-between max-lg:flex-col gap-4 ">
          <div className="max-w-80">
            <SearchBar
              type="text"
              placeholder="john@doe.com"
              buttonText="send"
              value={email}
              isLoading={isLoading}
              onChange={(e) => setEmail(e.target.value)}
              onSearchClick={() => handleEmailSubmit()}
            />
          </div>
          <div>
            <span className="flex flex-col items-start text-xs text-white gap-2 lg:max-w-[500px]">
              <p className="font-medium text-sm">Merch Store</p>
              <p>
                Discover your style, share your vibe, and let us curate a
                customized merch collection that perfectly fits your personality
                and needs.Your unique fashion statement starts here at Merch
                Store
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
