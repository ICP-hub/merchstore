/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import React, { useEffect } from "react";
import Button from "../common/Button";
import "react-multi-carousel/lib/styles.css";
import SmoothList from "react-smooth-list";
import { Tilt } from "react-tilt";
import ProductApiHandler from "../../apiHandlers/ProductApiHandler";
import { Link, useNavigate } from "react-router-dom";
import LoadingScreen from "../common/LoadingScreen";
import placeholderImg from "../../assets/placeholderImg-Small.jpeg";
import NewIcon from "../../assets/new-icon.svg";
import IcpLogo from "../../assets/IcpLogo";
import { useAuth } from "../../auth/useClient";

const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 35, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Main : HomePage Bottom Component.
/* ----------------------------------------------------------------------------------------------------- */
const HomePageBottom = ({ productList, isLoading }) => {
  // Filter new Arrival from productList : last index will be the latest
  const newArrivalList = productList?.filter((item) => {
    if (item.newArrival) {
      return productList;
    }
  });

  console.log(productList, "productlist");
  // Get the lastest product based on time updated
  const newArrivalProd = newArrivalList[0];

  return (
    <div className="flex flex-col py-8  rounded-2xl gap-8 tracking-wider">
      <NewArrival newArrivalProd={newArrivalProd} isLoading={isLoading} />
      <ExpCategories />
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ First Div: HomeBottom : New Arrival Div.
/* ----------------------------------------------------------------------------------------------------- */

const NewArrival = ({ newArrivalProd, isLoading }) => {
  const { NewArrivalLoadingScreen } = LoadingScreen();

  if (isLoading) {
    return <NewArrivalLoadingScreen />;
  }
  if (!newArrivalProd) {
    // If no product details, return nothing
    return null;
  }

  const { title, description, variantColor, slug } = newArrivalProd;
  const discount =
    ((variantColor[0].variant_price - variantColor[0].variant_sale_price) /
      variantColor[0].variant_price) *
    100;

  return (
    <div className="md:px-6 max-md:px-2 md:container md:mx-auto mb-10">
      <div
        data-aos="fade-up"
        className="p-6 grid sm:grid-cols-2 max-h-full overflow-hidden gap-4 border border-gray-300 border-dashed rounded-2xl"
      >
        <div data-aos="fade-up" className="order-2 sm:order-1 flex flex-col">
          <div className="flex-1 overflow-auto flex flex-col">
            <p className="text-sm text-slate-600">NEW ARRIVAL</p>
            <h1 className="text-4xl max-md:text-3xl font-semibold pb-4 capitalize">
              {title}
            </h1>
            <p className="text-slate-600 pb-4">{description}</p>
            <div className="flex justify-between mt-auto">
              <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                  <span className="flex gap-2 items-center">
                    <p className="font-semibold text-lg flex gap-1 items-center">
                      <IcpLogo />
                      {variantColor[0].variant_sale_price}
                    </p>
                    <p className="line-through text-sm text-gray-600">
                      {variantColor[0].variant_price}
                    </p>
                  </span>
                  <span className="bg-green-600 text-white text-xs font-medium rounded-md px-2 py-1 max-w-max flex items-center">
                    {Math.round(discount)}% off
                  </span>
                </div>
                <Link
                  to={`/product/${slug}`}
                  className="flex items-start mt-auto px-4 py-2 bg-black rounded-full text-white text-sm justify-center"
                >
                  Get this Product
                </Link>
              </div>
              <img
                src={NewIcon}
                alt="New arrival"
                className="max-w-24 max-h-24 pr-4"
              />
            </div>
          </div>
        </div>
        <Tilt
          options={defaultOptions}
          className="order-1 sm:order-2 rounded-2xl bg-gray-200 justify-center items-center flex shadow-lg mb-4 md:mb-0"
        >
          <img
            src={variantColor[0].img1 || placeholderImg}
            alt="prod.name"
            className="h-80 w-80 object-contain"
          />
        </Tilt>
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Second Div: HomeBottom : ExploreCategories component.
/* ----------------------------------------------------------------------------------------------------- */
/* const ExploreCategories = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      paritialVisibilityGutter: 60,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      paritialVisibilityGutter: 50,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      paritialVisibilityGutter: 30,
    },
  }

  return (
    <div className="flex flex-col gap-2 relative py-8 container mx-auto">
      <div className="flex justify-between">
        <div className="text-xl font-semibold max-w-2xl sm:text-3xl">
          Explore Our Curated Categories and transform your living spaces
        </div>
      </div>
      <Carousel
        responsive={responsive}
        infinite
        containerclassName="carousel-container"
      >
        {Array.from({ length: 6 }, (_, index) => (
          <div className="relative rounded-lg bg-sky-500 mr-4" key={index}>
            <img
              src={fakeProd}
              alt={`Product ${index + 1}`}
              className="min-h-80 min-w-80"
            />
            <span className="absolute bottom-2 left-2 p-1 rounded-full bg-white text-xs font-semibold">
              Category
            </span>
          </div>
        ))}
      </Carousel>
    </div>
  )
} */

//category new
const ExpCategories = () => {
  const { backend } = useAuth();
  const { categoryList, getCategoryList } = ProductApiHandler(0);
  // Call CategoryList
  useEffect(() => {
    getCategoryList();
  }, [backend]);

  // Filter featured categories : Display only featured categories
  const featuredCategories = categoryList?.filter(({ featured }) => featured);

  return (
    <div className="md:container md:mx-auto px-6 my-8 max-md:px-2 ">
      <h1
        data-aos="fade-up"
        className="font-semibold text-5xl text-center text-gray-900 mb-2 max-sm:text-2xl"
      >
        Featured Collections
      </h1>
      <p
        data-aos="fade-up"
        className="mb-10 font-light text-sm text-center text-gray-400 max-sm:text-xs"
      >
        Explore our featured collections for a curated selection of excellence
        in every category.
      </p>
      <SmoothList delay={200}>
        <div className="grid-category">
          {/* render 6 category card at max */}
          {featuredCategories?.slice(0, 6).map((item, index) => (
            <CategoryCard
              key={index}
              name={item.name}
              category_img={item.category_img}
            />
          ))}
        </div>
      </SmoothList>
    </div>
  );
};

//category card
const CategoryCard = ({ name, category_img }) => {
  // Link from react-router-dom breaking css
  const navigate = useNavigate();

  const navigateAndFilter = () => {
    navigate("/products");
    sessionStorage.setItem("category", name);
  };

  return (
    <div
      data-aos="fade-up"
      style={{ backgroundImage: `url(${category_img})` }}
      className={`item-category rounded-2xl bg-cover bg-center bg-no-repeat grayscale hover:grayscale-0 transition duration-300 ease-in-out cursor-pointer`}
      onClick={navigateAndFilter}
    >
      <div className="h-full w-full bg-black/50 rounded-2xl flex flex-col justify-center items-center">
        <h4 className="font-semibold text-white text-4xl capitalize ">
          {name}
        </h4>
      </div>
    </div>
  );
};

// Features
// const FeatureItem = ({ title, quality }) => (
//   <div className="flex gap-3 items-center">
//     <Button className="p-4 rounded-full bg-gray-200">
//       <BsCart3 size={20} />
//     </Button>
//     <div className="flex flex-col">
//       <p className="text-lg font-semibold">{title}</p>
//       <p className="text-xs text-slate-600 font-semibold">{quality}</p>
//     </div>
//   </div>
// );

// export const Features = () => {
//   const featureData = [
//     { title: "Feature Name 1", quality: "Feature Quality 1" },
//     { title: "Feature Name 2", quality: "Feature Quality 2" },
//     { title: "Feature Name 3", quality: "Feature Quality 3" },
//   ];

//   return (
//     <div className="features flex flex-col gap-4 mt-4">
//       {featureData.map((feature, index) => (
//         <FeatureItem key={index} {...feature} />
//       ))}
//     </div>
//   );
// };

export default HomePageBottom;
