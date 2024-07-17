import React from 'react'
import { LazyMotion, m, domAnimation } from "framer-motion";

const AnimationView = ({ children }) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}

export default AnimationView