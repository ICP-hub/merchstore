/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import ScrollToTop from "../components/common/ScrollToTop";
import Header from "../components/common/Header";
import Hero from "../components/common/Hero";
import Contact from "../components/common/Contact";
import Footer from "../components/common/Footer";
import AnimationView from "../components/common/AnimationView";
import React, { useState } from "react";
import { BsBrowserFirefox } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";
import { BsChevronUp } from "react-icons/bs";
import Button from "../components/common/Button";

const FaqPage = () => {
  return (
    // <AnimationView>
    //   <ScrollToTop />
    //   <Header title={"FAQ"}></Header>
    <FaqPageContainerMain />
    //   <Contact></Contact>
    //   <Footer></Footer>
    // </AnimationView>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ FAQ Page Container
/* ----------------------------------------------------------------------------------------------------- */
const FaqPageContainerMain = () => {
  return (
    <div className="container mx-auto tracking-wider p-6">
      <QuestionsBox questionbase="GENERAL QUESTIONS" />
      <QuestionsBox questionbase="SALES SUPPORT" />
      <CategoryFaq />
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ QuestionBox Component.
/* ----------------------------------------------------------------------------------------------------- */
const QuestionsBox = ({ questionbase }) => {
  return (
    <>
      <div className="py-6 font-bold text-xs border-b border-b-slate-500">
        {questionbase}
      </div>
      <div className="py-6 grid md:grid-cols-3 sm:grid-cols-2 gap-8">
        {Array.from({ length: 3 }, (_, index) => (
          <FaqCard key={index} />
        ))}
      </div>
    </>
  );
};

// Faq card
const FaqCard = () => {
  return (
    <div className="flex flex-col gap-4">
      <span className="bg-gray-200 rounded-lg p-2 w-12 flex justify-center">
        <BsBrowserFirefox size={24} color="" />
      </span>
      <div className="flex flex-col gap-4">
        <h1 className=" font-bold text-lg">How to login and register?</h1>
        <p
          className="text-sm text-slate-600 overflow-hidden overflow-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur,
          quia quisquam delectus saepe veniam maiores repellat tempore harum.
          Reprehenderit totam tempora minus quasi eius iste alias fugiat
          delectus et quibusdam!
        </p>
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Category FAQ && ACCORDION
/* ----------------------------------------------------------------------------------------------------- */

const CategoryFaq = () => {
  return (
    <div className="flex max-md:flex-col gap-8 py-6">
      <div className="flex flex-col gap-2 items-start min-w-40 max-md:justify-center max-md:items-center max-md:w-full">
        <h1 className="font-bold text-lg">Category FAQ</h1>
        {Array.from({ length: 3 }, (_, index) => (
          <Button
            className="px-4 py-2 hover:bg-black focus:bg-black hover:text-white focus:text-whitetext-sm font-semibold  rounded-full  max-md:justify-center max-md:items-center max-md:w-full"
            key={index}
          >
            category one
          </Button>
        ))}
      </div>
      <div className="flex flex-col justify-evenly w-full gap-4">
        {Array.from({ length: 4 }, (_, index) => (
          <CategoryFaqQues key={index} />
        ))}
      </div>
    </div>
  );
};

// Accordion
const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-dashed border-slate-500 p-4 flex flex-col w-full rounded-2xl">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleAccordion}
      >
        <span className="font-semibold">{title}</span>
        <button className="p-1 rounded-full bg-gray-200 flex justify-center">
          {isOpen ? <BsChevronUp /> : <BsChevronDown />}
        </button>
      </div>
      {isOpen && <div className="mt-2 text-sm text-slate-600">{content}</div>}
    </div>
  );
};

const CategoryFaqQues = () => {
  return (
    <AccordionItem
      title="Terms and conditions of Application Service fee"
      content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda sint esse, delectus veniam commodi, accusamus ratione dolor cumque, sequi eligendi quam molestiae soluta tempora quos quasi tenetur. Quisquam, numquam iste."
    />
  );
};

export default FaqPage;
