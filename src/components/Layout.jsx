import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ApiDataBanner from "./ApiDataBanner";
import Header from "./Header";
import Footer from "./Footer";
import EnquiryDrawer from "./EnquiryDrawer";

export default function Layout({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <ApiDataBanner />
      <Header />
      <main>{children}</main>
      <Footer />
      <EnquiryDrawer />
    </>
  );
}
