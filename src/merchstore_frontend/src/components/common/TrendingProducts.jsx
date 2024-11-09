import { useScroll, motion, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";

import TrendingProductCard from "./TrendingProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NoDataFound from "./NoDataFound";
import TrendingProductCardLoader from "./TrendingProductCardLoader";
import ProductApiHandler from "../../apiHandlers/ProductApiHandler";
import { useAuth } from "../../auth/useClient";

const TrendingProducts = () => {
  // const { backend } = useAuth();
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], [0, 800]); // Adjust the range as needed
  const { isLoading, productList, getProductList } = ProductApiHandler(0);

  // Filter trending products from productList
  const trendingProducts = productList?.filter((item) => {
    if (item.trending && item.active) {
      return productList;
    }
  });

  useEffect(() => {
    getProductList();
  }, []);

  const maxInitialDisplay = 6;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="md:container md:mx-auto px-6 mt-28 md:mt-36 flex flex-col md:flex-row justify-start items-center gap-5">
      <div className="w-full md:w-1/6 flex justify-start items-center ">
        <h1 className="text-xl md:text-4xl text-white uppercase flex md:flex-col flex-row justify-center items-center gap-1 rotate-0 md:-rotate-90">
          <span className="font-bold tracking-wider">Trending</span>
          <span className="font-thin tracking-wide">Products</span>
        </h1>
      </div>
      <motion.div style={{ x: x }} className="w-full md:w-5/6">
        {isLoading ? (
          <Slider {...settings}>
            {[...Array(4)].map((_, index) => (
              <TrendingProductCardLoader key={index} />
            ))}
          </Slider>
        ) : (
          <>
            {trendingProducts && trendingProducts.length > 0 ? (
              <Slider {...settings}>
                {trendingProducts
                  .slice(0, maxInitialDisplay)
                  .map((prodDetails, index) => (
                    <TrendingProductCard key={index} product={prodDetails} />
                  ))}
              </Slider>
            ) : (
              <NoDataFound
                title={"No Product Found"}
                bgcolor={"bg-white/50 backdrop-blur-sm"}
              />
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default TrendingProducts;
