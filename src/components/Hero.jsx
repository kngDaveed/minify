import {
  ArrowDown,
  History as HistoryIcon,
  StepForward,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";

const bounceTransition = {
  y: {
    duration: 0.6,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
  },
};

const Hero = () => {
  const [hasHistory, setHasHistory] = useState(false);

  // Check for history on mount
  useEffect(() => {
    const stored = localStorage.getItem("minifyHistory");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setHasHistory(true);
      }
    }
  }, []);

  return (
    <div
      id="home"
      className="h-screen sm:h-[800px] lg:h-[1080px] xl:h-[750px] bg-[url(/images/web.jpg)] bg-center md:bg-top bg-cover bg-no-repeat bg-fixed  flex justify-center md:items-center items-end px-4 sm:px-12"
    >
      <div className="flex flex-col gap-6 max-w-3xl text-start mb-32 md:mb-0">
        <h1 className="text-3xl md:text-4xl font-semibold text-white text-shadow-lg/30">
          Allowing users to shorten long, clunky URLs into clean, shareable links
        </h1>

        <p className="text-lg text-primary-200 text-shadow-md/30 text-white">
          Minify is designed to reduce link fatigue in daily tech & casual
          conversations, making sharing easier, and improving user experience
          across social media and conversations
        </p>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <ScrollLink
            to="minify"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="w-full bg-blue-600 text-white py-4 rounded-full border-2  border-blue-900 flex justify-center hover:bg-blue-700 transition-all duration-300 font-medium items-center gap-2  hover:border-blue-800 cursor-pointer"
          >
            Minify Your Link
            <motion.div animate={{ y: [0, -4] }} transition={bounceTransition}>
              <ArrowDown size={15} className=" text-gray-800 dark:text-white" />
            </motion.div>
          </ScrollLink>

          {hasHistory ? (
            <ScrollLink
              to="history"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              className="w-full border-2 border-blue-600 py-4 rounded-full bg-white text-blue-600 hover:text-blue-700 hover:bg-[#fdc959e8] font-medium hover:border-blue-700 transition-all duration-300 flex items-center gap-2 justify-center cursor-pointer"
            >
              View Minify History <HistoryIcon size={14} />
            </ScrollLink>
          ) : (
            <ScrollLink
              to="minify-guide"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              className="w-full border-2 border-blue-600 py-4 rounded-full bg-white text-blue-600 hover:text-blue-700 hover:bg-[#fdc959e8] font-medium hover:border-blue-700 transition-all duration-300 flex items-center gap-2 justify-center cursor-pointer"
            >
              How to Use <StepForward size={16} />
            </ScrollLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
