import {
  ArrowDown,
  ArrowRight,
  History,
  StepForward,
  SuperscriptIcon,
} from "lucide-react";
import {useState, React} from "react";
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

const [history, setHistory] = useState([]); // Your minified links history
const [showHistory, setShowHistory] = useState(false); // Controls what to display



  return (
    <div
      id="home"
      className="h-screen md:h-[750px] flex justify-center bg-gray-50 items-center px-4"
    >
      <div className="flex flex-col gap-6 max-w-3xl text-start">
        <h1 className="text-3xl md:text-4xl font-semibold">
          Allowing users to shorten long, clunky URLs into clean, shareable
          links
        </h1>

        <p className="text-lg text-primary-200">
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
            className="w-full bg-blue-600 text-white py-4 rounded-md flex justify-center hover:bg-blue-700 transition-all duration-300 font-medium items-center gap-2 border cursor-pointer"
          >
            Minify Your Link
            <motion.div animate={{ y: [0, -4] }} transition={bounceTransition}>
              <ArrowDown className="w-6 h-6 text-gray-800 dark:text-white" />
            </motion.div>
          </ScrollLink>

          {history.length > 0 ? (
            <ScrollLink
              onClick={() => setShowHistory(true)}
              to="history"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
              className="w-full border border-blue-600 py-4 rounded-md text-blue-600 hover:text-white hover:bg-blue-600 font-medium hover:border-blue-800 transition-all duration-300 flex items-center gap-2 justify-center cursor-pointer"
            >
              View Minify History <History size={16} />
            </ScrollLink>
          ) : (
            <ScrollLink
              onClick={() => setShowHistory(true)}
              to="minify-guide"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              className="w-full border border-blue-600 py-4 rounded-md text-blue-600 hover:text-white hover:bg-blue-600 font-medium hover:border-blue-800 transition-all duration-300 flex items-center gap-2 justify-center cursor-pointer"
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
