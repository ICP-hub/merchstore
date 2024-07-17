import React, { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const ScrollToTop = () => {
  // Extracts pathname property(key) from an object
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // refresh
  navigate(0)
}

export default ScrollToTop
