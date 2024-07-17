import { useScroll, motion, useTransform } from 'framer-motion'
import React from 'react'

const WelcomeText = () => {
    const { scrollYProgress } = useScroll()
    const x = useTransform(scrollYProgress, [0, 1], [0, 800]); // Adjust the range as needed

  return (
<motion.div
  style={{ x: x }}
  className=" text-[80px] md:text-[200px] font-black tracking-widest text-white absolute bottom-[50px] md:bottom-[100px] flex justify-center w-full"
>
  WelcomeTo
</motion.div>
  )
}

export default WelcomeText