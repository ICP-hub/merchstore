import React, { useState } from "react";
import Product1 from "../../assets/fakeprod.png";
import { Link } from "react-router-dom";
import placeholderImg from "../../assets/placeholderImg-Small.jpeg";
import IcpLogo from "../../assets/IcpLogo";

const TrendingProductCard = ({ product }) => {
  const [errorImage, setErrorImage] = useState(false);
  const handleError = () => {
    setErrorImage(true);
  };

  if (!product) {
    return null;
  }

  const discount =
    ((product.variantColor[0].variant_price -
      product.variantColor[0].variant_sale_price) /
      product.variantColor[0].variant_price) *
    100;

  return (
    <Link to={`/product/${product?.slug}`}>
      <div className="bg-white/50 backdrop-blur-sm p-2 rounded-2xl overflow-hidden mx-2 border-[1px]">
        <img
          src={errorImage ? placeholderImg : product?.variantColor[0]?.img1}
          alt="product1"
          className="w-full object-cover bg-gray-300 rounded-xl mb-2"
          onError={handleError}
        />
        <div className="flex justify-between items-center px-1 mb-2">
          <h4 className="line-clamp-1 font-semibold text-lg text-gray-900 tracking-wide capitalize">
            {product?.title}
          </h4>
        </div>
        <div className="flex justify-between items-center px-1">
          <div className="line-clamp-1 font-semibold text-xl text-gray-900 tracking-wide flex gap-2 items-center">
            <div className="flex items-center">
              <span className="text-lg flex items-center gap-1">
                <IcpLogo size={18} />
                {product?.variantColor[0]?.variant_sale_price}{" "}
              </span>
              <span className="line-through text-sm text-gray-700 font-light">
                {product?.variantColor[0]?.variant_price}
              </span>
            </div>
            <span className="bg-green-600 text-white text-xs font-medium rounded-md px-2 py-1 min-w-max">
              {Math.round(discount)}% off
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TrendingProductCard;
