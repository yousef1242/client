import AboutSection from "@/components/aboutSection/AboutSection";
import AnimatedCarSection from "@/components/animatedCarSection/AnimatedCarSection";
import Footer from "@/components/footer/Footer";
import HeroSection from "@/components/heroSection/HeroSection";
import OpinionsSection from "@/components/opinionsSection/OpinionsSection";

export default function HomePage() {
  return (
    <>
      <div className="App">
        <HeroSection key={"heroSection"} />
        <AnimatedCarSection key={"animatedCarSection"} />
        <AboutSection key={"aboutSection"} />
          <OpinionsSection key={"opinionsSection"} />
          <Footer key={"footerSection"} />
      </div>
    </>
  );
};


