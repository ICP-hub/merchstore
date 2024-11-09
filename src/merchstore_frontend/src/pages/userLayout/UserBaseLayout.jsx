import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";
// import ScrollToTop from "../../components/common/ScrollToTop";
import AnimationView from "../../components/common/AnimationView";
import { useEffect } from "react";

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const UserBaseLayout = () => {
  const location = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [location]);

  return (
    <>
      <AnimationView>
        <Header />
        <Outlet />
        <Footer />
      </AnimationView>
    </>
  );
};

export default UserBaseLayout;
