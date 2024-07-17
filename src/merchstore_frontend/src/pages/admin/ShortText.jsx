import React from "react";

const ShortText = ({ text }) => {
  const maxLength = 8;

  // Check if the length of text is greater than maxLength
  const truncatedText =
    text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

  return <div>{truncatedText}</div>;
};

export default ShortText;
