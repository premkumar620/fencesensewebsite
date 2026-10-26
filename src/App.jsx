import { Route, Routes } from "react-router-dom";
import { EnquiryProvider } from "./context/EnquiryContext";
import { SiteProvider } from "./context/SiteContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import DetailPage from "./pages/DetailPage";
import Services from "./pages/Services";
import Solutions from "./pages/Solutions";
import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import { Privacy, Sitemap, Terms } from "./pages/Legal";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <SiteProvider>
      <EnquiryProvider>
        <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<DetailPage kind="service" />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/:slug" element={<DetailPage kind="solution" />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Layout>
      </EnquiryProvider>
    </SiteProvider>
  );
}
