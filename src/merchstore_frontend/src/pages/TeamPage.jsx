import React from "react";
import { useState } from "react";
import Header from "../components/common/Header.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";
import AnimationView from "../components/common/AnimationView.jsx";
import Footer from "../components/common/Footer.jsx";
import img1 from "../assets/ clothes.jpg";
import img2 from "../assets/hangers.jpg";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const dataList = [
  {
    name: "Integrity",
    discription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },

  {
    name: "Inclusion",
    discription:
      " Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    name: "Audacity",
    discription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    name: "Baise for Action",
    discription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    name: "Integrity",
    discription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },

  {
    name: "Inclusion",
    discription:
      " Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    name: "Audacity",
    discription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    name: "Baise for Action",
    discription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

const TeamPage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Header title={"AboutUs"} />
      <div className="container mx-auto mt-4 px-6 flex gap-2 items-center md:items-start justify-between flex-col  ">
        <div className="flex  flex-col xl:flex-row gap-2 my-6">
          <img src={img1} alt="" className="rounded-xl w-96 h-96" />
          <div className="fLex flex-row  items-center  mt-6 justify-center xl:ml-8 w-full">
            <p className="text-2xl font-bold  md:m-0 mt-4 pb-4">
              Welcome to the ICP Mech Store!
            </p>
            <p className=" text-xl">
              Welcome to the ICP Mech Store, your go-to destination for stylish
              and unique clothing inspired by Internet Computer Protocol (ICP)!
              Dive into our collection and explore a range of apparel that
              embodies the spirit of decentralization and innovation.Internet
              Computer Protocol (ICP) is a groundbreaking technology that aims
              to revolutionize the internet by enabling decentralized computing
              at scale. Developed by DFINITY, ICP empowers developers to build
              tamper-proof, open internet services, and applications.
            </p>
          </div>
          <div></div>
        </div>
        <div className="flex   flex-col xl:flex-row my-6 gap-4">
          <div className="fLex flex-row  items-center mt-6 justify-center xl:mr-8 w-full">
            <p className="text-2xl font-bold  md:m-0 mt-4 pb-4">Our Mission</p>
            <p className=" text-xl">
              At the ICP Mech Store, our mission is to merge fashion with
              technology, offering clothing that not only looks great but also
              celebrates the ethos of decentralization and the Internet Computer
              Protocol. We aim to empower individuals to express their passion
              for ICP through their style.Discover our diverse range of
              ICP-inspired clothing. Each piece is thoughtfully designed to
              reflect the innovation and creativity of the Internet Computer
              community. Whether you're attending a tech conference, hanging out
              with friends, or just want to make a statement, our clothing will
              help you stand out.
            </p>
          </div>
          <img src={img2} alt="" className="rounded-xl w-96 h-96" />
          <div></div>
        </div>

        {/* <Carousel /> */}
      </div>
      <Footer></Footer>
    </AnimationView>
  );
};

const Carousel = () => {
  const responsive = {
    0: { items: 1 },
    600: { items: 3 },
    1024: { items: 4 },
  };

  return (
    <AliceCarousel
      mouseTracking
      items={dataList.map((data, index) => (
        <div key={index} className=" container p-2 mt-4   ">
          <div className="rounded-xl border bg-gray-900 border-gray-200 shadow-lg h-60 m-2 flex flex-col items-center justify-center ">
            <p className="text-center text-white text-xl   mt-4">{data.name}</p>
            <p className="text-center text-white text-sm mt-4 m-1">
              {data.discription}
            </p>
          </div>
        </div>
      ))}
      responsive={responsive}
    />
  );
};

export default TeamPage;
