/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import React, { useEffect, useRef, useState } from "react";
import Button from "../common/Button";
import { BsEnvelopeAt } from "react-icons/bs";
import { CommonInput, TelephoneInput } from "../common/InputFields";
import UserApiHanlder from "../../apiHandlers/UserApiHandler";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ ContactPage Components.
/* ----------------------------------------------------------------------------------------------------- */
const ContactPageContainerMain = () => {
  const { createContact, isLoading, successfulSubmit } = UserApiHanlder();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Form Validation
  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isNotEmpty = (value) => value.trim() !== "";

  const validateForm = ({ name, email, contact_number, message }) => ({
    name: isNotEmpty(name) ? undefined : "Please enter your name",
    email: isEmailValid(email)
      ? undefined
      : "Please enter a valid email address",
    // Required For Phone ?
    contact_number: phone ? undefined : "Please Enter a valid phone number",
    // Required for message ?
    // message: isNotEmpty(message) ? undefined : "Message is required",
  });

  // Hanlde Form Submit
  const handleCreateContact = (e) => {
    e.preventDefault();
    // Get Phone number fron itl input : check console.log(phone)
    const contact_number = phone.getNumber();
    const formData = { name, email, contact_number, message };
    // console.log(formData);
    const errors = validateForm(formData);

    if (Object.values(errors).every((error) => error === undefined)) {
      // Call createcontact and pass the form createContact()
      createContact({ name, email, contact_number, message });
    } else {
      // Display each error individually
      Object.values(errors).forEach((error) => {
        if (error) {
          toast.error(error);
        }
      });
    }
  };

  // Reset the form when successfulSubmit is true
  useEffect(() => {
    if (successfulSubmit) {
      [setName, setEmail, setMessage].forEach((setField) => setField(""));

      // Reset phone
      if (phone && phone.telInput) {
        phone.telInput.value = "";
      }
    }
  }, [successfulSubmit]);

  return (
    <div
      data-aos="fade-up"
      className="md:container md:mx-auto flex flex-col items-center sm:justify-center tracking-wider p-6 my-10"
    >
      <div className="w-full bg-white border-[1px] border-dashed shadow-sm rounded-2xl p-3 flex md:flex-row flex-col justify-end gap-3">
        <div className="w-full md:w-3/5 rounded-xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112096.76438620142!2d76.92941599726562!3d28.599060199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b41e713b4db%3A0x1a7ae620a41b6e7d!2sLenskart.com%20at%20Mahavir%20Enclave!5e0!3m2!1sen!2sin!4v1707741679727!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
            className="rounded-xl"
          ></iframe>
        </div>

        {/* <div>
          <TelephoneInput />
          <CommonInput value={""} onChange={(e) => e.target.value} />
          <CountryInput />
        </div> */}
        <div className="w-full md:w-2/5 bg-white rounded-xl px-4 py-4 md:py-8 flex flex-col gap-8">
          <div className="flex flex-col items-center justify-center">
            <h1 className="md:text-4xl text-3xl font-bold">Get In Touch</h1>
            <p className="text-slate-600">You can reach us anytime</p>
          </div>
          <form
            className="inputs flex flex-col gap-4"
            onSubmit={handleCreateContact}
          >
            <div className="flex max-sm:flex-col gap-4">
              <input
                type="text"
                placeholder="Enter you name"
                className="px-4 py-4 border border-slate-500 rounded-full focus:outline-none w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="border border-slate-500 rounded-full flex w-full p-4  gap-2 items-center">
                <BsEnvelopeAt size={24} />
                <input
                  type="text"
                  placeholder="johndoe@mail.com"
                  className=" focus:outline-none w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <TelephoneInput
              divClass="border border-slate-500 rounded-full flex w-full gap-2 items-center"
              inputClass="focus:outline-none border-none p-4"
              setPhone={setPhone}
            />
            <div className="flex flex-col gap-4 border border-slate-500 rounded-2xl p-4">
              <textarea
                placeholder="Tell us how can we help you..."
                className="focus:outline-none w-full resize-none"
                rows={4} // Adjust the number of rows as needed
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <Button className="flex w-full bg-black text-white justify-center rounded-full p-4">
              {isLoading ? (
                <TailSpin
                  visible={true}
                  height="30"
                  width="30"
                  color="white"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperclassName=""
                />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
          <div className=" text-slate-600 text-sm">
            <p className="flex justify-center">
              By contacting us,you agree to our
            </p>
            <p className="flex justify-center">
              <Link
                to={"/term-of-service"}
                className="text-black font-semibold mr-1 cursor-pointer"
              >
                Terms of service
              </Link>
              &
              <Link
                to={"/privacy-policy"}
                className="text-black font-semibold ml-1 cursor-pointer"
              >
                Privacy policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPageContainerMain;
