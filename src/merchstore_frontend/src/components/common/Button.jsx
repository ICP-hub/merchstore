import React from "react";
import { motion } from "framer-motion";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Component Button.
/* ----------------------------------------------------------------------------------------------------- */
const Button = ({ className, onClick, children, autoFocus, disabled }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      className={className}
      onClick={onClick}
      autoFocus={autoFocus}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default Button;
