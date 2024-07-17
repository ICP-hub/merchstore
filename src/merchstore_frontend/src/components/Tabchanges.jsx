import React from "react";
import { Link } from "react-router-dom";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ TabChanges : CartPage, ShiipingAddressPage, CheckoutPage, OrderDetailPage.
/* ----------------------------------------------------------------------------------------------------- */
const TabChanges = ({ paths }) => {
  return (
    <div className="text-gray-600 gap-2 flex text-sm font-semibold py-6 items-center">
      {paths.map((path, index) => (
        <React.Fragment key={index}>
          {/*Set path for home */}
          {path === "Home" ? (
            <Link to="/" className="min-w-max">
              Home
            </Link>
          ) : (
            <Link to={`/${path}`} className="min-w-max">
              {path}
            </Link>
          )}
          {index < paths.length - 1 && <span>{" > "}</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TabChanges;
