import React, { useState } from "react";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import Fakeprod from "../../assets/fakeprod.png";
import { BsFillStarFill } from "react-icons/bs";
import Button from "../common/Button";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useBackend, useAuth } from "../../auth/useClient";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { useEffect } from "react";
import placeholderImg from "../../assets/placeholderImg-Small.jpeg";
import IcpLogo from "../../assets/IcpLogo";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Component ProductCard.
/* ----------------------------------------------------------------------------------------------------- */
const ProductCard = ({ product }) => {
  const { principal, isConnected, backend, refreshCart } = useAuth();
  const [loading3, setLoading3] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  // const { backend } = useBackend();
  // console.log(principal, "principal", isConnected);

  const [isProductInLocalWishlist, setProductInLocalWishlist] = useState(false);

  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  const [carts, setCarts] = useState();
  const [addedToCart, setAddedToCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // State for img change on hover
  const [imageError, SetImageError] = useState(false);

  const listCarts = async () => {
    try {
      const cart = await backend.getCallerCartItems(100, 0);
      setCarts(cart.data);
      console.log(cart, "cart items");
    } catch (error) {
      console.error("Error listing carts:", error);
    } finally {
    }
  };

  useEffect(() => {
    listCarts();
  }, [backend, product]);

  const AddToCart = async () => {
    if (isConnected) {
      try {
        listCarts();
        setLoading(true);
        setAddedToCart(true);

        let cartId;
        let isProductInCart;
        let quantity1;

        carts?.some((item) => {
          if (item?.product_slug === product?.slug) {
            isProductInCart = true;

            quantity1 = item?.quantity;
            console.log(quantity1, "befewb");
            return true; // Stop iterating once the item is found
          }
          return false;
        });
        quantity1 = quantity1 + 1;
        console.log(quantity1, "befssfsfwb");
        if (isProductInCart) {
          const res = await backend.updateCartItems(
            product.slug,
            quantity1,
            product.variantSize[0].size,
            product.variantColor[0].color
          );
          toast.success("item updated successfully");
          console.log(res);
        } else {
          const res = await backend.addtoCartItems(
            product.slug,
            product.variantSize[0].size,
            product.variantColor[0].color,
            quantity
          );
          console.log(res, "add to cart response");
          console.log(res?.ok[0]?.userprincipal?.toText(), "principal");
          refreshCart();

          if ("ok" in res) {
            toast.success("Item added to cart");
          } else {
            // Log an error if the response does not have "ok" property
            console.error("Unexpected response from backend:", res);
          }
        }
      } catch (error) {
        // Log the error for debugging
        console.error("An error occurred adding items to cart:", error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please login first");
    }
  };
  const buyNowHandler = async () => {
    if (isConnected) {
      try {
        setLoading(true);
        setAddedToCart(false);
        const res = await backend.clearallcartitmesbyprincipal();

        if ("ok" in res) {
          const res = await backend.addtoCartItems(
            product.slug,
            product.variantSize[0].size,
            product.variantColor[0].color,
            quantity
          );
        } else {
          console.log(" error while clearing the cart", res);
        }
      } catch (error) {
        console.log("Error while buying the product", error);
      } finally {
        setTimeout(() => {
          navigate("/cart", { replace: true });
        }, 4000);
      }
    } else {
      toast.error("Please login first");
    }
  };
  useEffect(() => {
    listWishlists();
  }, [backend]);

  const listWishlists = async () => {
    try {
      //setLoading4(true)

      const wishlist2 = await backend.listWishlistItems(100, 0);
      setWishlist(wishlist2.data);
    } catch (error) {
      console.error("Error listing wishlist:", error);
    } finally {
      // setLoading4(false)
    }
  };

  useEffect(() => {
    // Check if the product is in the local cart
    const isProductInWishlist = wishlist.some(
      (item) => item.product_slug === product.slug
    );
    setProductInLocalWishlist(isProductInWishlist);
  }, [wishlist, product, principal]);

  const AddToWishlist = async () => {
    if (isConnected) {
      try {
        setLoading3(true);
        const res = await backend.addtoWishlist(
          product.slug,
          product.variantSize[0].size,
          product.variantColor[0].color
        );
        setProductInLocalWishlist(true);

        if ("ok" in res) {
          toast.success("Item added to wishlist Successfully");
        } else {
          // Log an error if the response does not have "ok" property
          console.error("Unexpected response from backend:", res);
        }
      } catch (error) {
        // Log the error for debugging
        console.error("An error occurred adding items to wishlist:", error);
      } finally {
        setLoading3(false);
      }
    } else {
      toast.error("You need to login first");
      // open();
    }
  };

  const removeToWishlist = async () => {
    try {
      setLoading3(true);
      console.log(product.slug);
      const res = await backend.deleteWishlistItems(
        product.slug,
        product.variantSize[0].size,
        product.variantColor[0].color
      );
      console.log(res);
      if ("ok" in res) {
        toast.success("The product has been removed to your wishlist.");
        setProductInLocalWishlist(false);
        listWishlists();
        //window.location.reload()
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading3(false); // Set loading to false when the update is complete (success or error)
    }
  };

  // Img change on mouse hover and leave
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleError = () => {
    SetImageError(true);
  };

  /* ----------------------------------------------------------------------------------------------------- */
  /*  @ Final ProductCard and Renders
/* ----------------------------------------------------------------------------------------------------- */
  // Product structure :  ['product-four-7', {…}]
  // Destructure product to extract required
  const extractProductInfo = (product) => {
    const { title, category, description, variantColor, variantSize, slug } =
      product;
    const { color, img1, img2, img3, variant_price, variant_sale_price } =
      variantColor[0];
    const { size } = variantSize[0];

    return {
      title,
      slug,
      category,
      description,
      variantInfo: {
        color,
        img1,
        img2,
        img3,
        variant_price,
        variant_sale_price,
      },
      size,
    };
  };
  const productInfo = extractProductInfo(product);
  // Calculate discount
  const calculateDiscountPercentage = () => {
    if (productInfo?.variantInfo.variant_price === 0) {
      return 0;
    }
    const discountPercentage =
      ((productInfo?.variantInfo.variant_price -
        productInfo?.variantInfo.variant_sale_price) /
        productInfo?.variantInfo.variant_price) *
      100;

    return Math.round(discountPercentage);
  };

  const discount = calculateDiscountPercentage();

  if (productInfo !== undefined || null) {
    return (
      <div className="rounded-xl  flex flex-col overflow-hidden gap-2">
        <div className="bg-gray-200 relative rounded-xl">
          <div
            className="absolute top-2 left-2 bg-white py-1 px-2 rounded-full text-sm cursor-pointer font-semibold capitalize"
            style={{ zIndex: "1" }}
          >
            {productInfo.category}
          </div>
          <button
            onClick={() => {
              isProductInLocalWishlist ? removeToWishlist() : AddToWishlist();
            }}
            className={`absolute top-2  right-2  bg-white p-2 rounded-full shadow-sm w-[40px] h-[40px] ${
              loading3 && "opacity-50"
            }`}
            disabled={loading3 && true}
            style={{ zIndex: "1" }}
          >
            {loading3 ? (
              <TailSpin
                height="100%"
                width="100%"
                color="black"
                ariaLabel="tail-spin-loading"
                radius="1"
                visible={true}
              />
            ) : (
              <>
                {isProductInLocalWishlist ? (
                  <IoHeart className="text-[#D02F2F]" size="1.5em" />
                ) : (
                  <IoHeartOutline size="1.5em" />
                )}
              </>
            )}
          </button>
          <Link to={`/product/${productInfo.slug}`}>
            <div
              className="rounded-xl cursor-pointer image-container"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={
                  imageError
                    ? placeholderImg
                    : isHovered
                    ? productInfo.variantInfo.img2
                    : productInfo.variantInfo.img1
                }
                alt="prod name"
                className="rounded-xl product-image lg:size-72  object-cover "
                onError={handleError}
              />
            </div>
          </Link>
        </div>
        <div className="flex flex-col gap-1 max-md:px-4">
          <div className="flex justify-between">
            <Link
              to={`/product/${productInfo.slug}`}
              className="text-lg font-semibold line-clamp-2 capitalize"
            >
              {productInfo.title}
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <span className="font-medium text-lg flex items-center gap-1">
                <IcpLogo size={24} />
                <p>{productInfo.variantInfo.variant_sale_price}</p>
              </span>
              <span className="text-sm line-through font-light flex items-center gap-1">
                <p>{productInfo.variantInfo.variant_price}</p>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-green-600 text-white text-xs font-medium rounded-md px-2 py-1 max-w-max flex items-center">
                {discount}% off
              </span>
            </div>
          </div>
          <div className="flex justify-between gap-2 text-sm">
            <Button
              onClick={() => {
                if (!addedToCart) {
                  AddToCart();
                } else {
                  navigate("/cart"); // Navigate to the cart page
                }
              }}
              className={`w-full rounded-full  font-semibold  border border-black px-4 py-2 hover:bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:border-white hover:text-white ${
                loading && " flex items-center justify-center"
              } `}
              disabled={loading && true}
            >
              {loading && addedToCart ? (
                <TailSpin
                  height="20"
                  width="20"
                  color="black"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  visible={true}
                />
              ) : (
                <p>{addedToCart ? "Go to Cart" : "Add to Cart"}</p>
              )}
            </Button>

            <Button
              onClick={() => {
                buyNowHandler();
              }}
              className={`w-full rounded-full  font-semibold  bg-black border text-white border-black px-4 py-2 hover:bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:border-white ${
                loading && " flex items-center justify-center"
              } `}
              disabled={loading && true}
            >
              {loading && !addedToCart ? (
                <TailSpin
                  height="20"
                  width="20"
                  color="white"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  visible={true}
                />
              ) : (
                <p>Buy Now</p>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return;
  }
};

export default ProductCard;
