import AboutSection from "@/components/aboutSection/AboutSection";
import Footer from "@/components/footer/Footer";
import PageNameSection from "@/components/pageNameSection/PageNameSection";
import Head from "next/head";

const AboutUsPage = () => {
  return (
    <>
      <Head>
        <title>About-Us</title>
      </Head>
      <div className="aboutUsPage">
        <PageNameSection
          title={"About-Us"}
          links={[
            { name: "Home", to: "/" },
            { name: "About-Us", to: "/about-us" },
          ]}
        />
        <div className="container">
          <AboutSection />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AboutUsPage;
