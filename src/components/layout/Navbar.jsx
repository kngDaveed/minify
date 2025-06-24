import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import {
  Moon,
  Sun,
  Menu,
  X,
  Download,
  ArrowRight,
  Home,
  User2,
  LayoutDashboard,
  Briefcase,
  MessageCircle,
  HelpCircle,
} from "lucide-react";

const navLinks = [
  { id: "home", name: "Home", icon: <Home className="w-4 h-4 mr-2" /> },
  {
    id: "minify",
    name: "Minify",
    icon: <LayoutDashboard className="w-4 h-4 mr-2" />,
  },
  {
    id: "history",
    name: "History",
    icon: <LayoutDashboard className="w-4 h-4 mr-2" />,
  },
  { id: "faqs", name: "FAQs & Help", icon: <HelpCircle className="w-4 h-4 mr-2" /> },
  {
    id: "contact",
    name: "Contact",
    icon: <Briefcase className="w-4 h-4 mr-2" />,
  },
];

const navVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const mobileMenuVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 20,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: { x: "100%", opacity: 0, transition: { duration: 0.3 } },
};

const mobileLinkVariants = {
  hidden: { x: 20, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  // const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <ScrollLink
            to="home"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="cursor-pointer"
            onClick={() => setActiveSection("home")}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-xl flex items-center gap-1"
            >
              <img src="/icons/minify.png" alt="Minify Logo" className=" w-6 h-6" /> 
               <span className={`font-semibold ${isScrolled ? "text-blue-900" : "text-white text-shadow-lg/30"}`}>Minify</span>
            </motion.div>
          </ScrollLink>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden xl:flex gap-6"
            variants={navVariants}
            initial="hidden"
            animate="visible"
          >
            {navLinks.map((link, idx) => (
              <motion.div
                key={link.id}
                variants={itemVariants}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                <ScrollLink
                  to={link.id}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className={`cursor-pointer transition-all duration-300 ${isScrolled ? "text-gray-900 hover:text-blue-600" : "text-white text-shadow-lg/20 hover:text-shadow-sm/20"} ${
                    activeSection === link.id
                      ? "nav-item-active"
                      : "text-blue-600"
                  }`}
                  onClick={() => setActiveSection(link.id)}
                  activeClass="nav-item-active"
                >
                  {link.name}
                </ScrollLink>
              </motion.div>
            ))}
          </motion.nav>

          {/* Action Buttons */}
          <div className="hidden xl:flex items-center space-x-4">
   
            <ScrollLink
              to="contact"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="w-max bg-blue-600 text-white py-[10px] px-6 rounded-full flex justify-center border-2 border-blue-700 hover:border-blue-800 hover:bg-blue-700 transition-all duration-300 font-medium items-center cursor-pointer"
            >
              Developer
              <ArrowRight className="w-4 h-4 ml-2" />
            </ScrollLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center space-x-4">

            <button
              onClick={toggleMobileMenu}
              className={`${ isScrolled ? "text-blue-900 hover:text-primary-600" : "text-white text-shadow-lg/20 hover:text-shadow-sm/20"}`}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X size={28} />
              ) : (
                <Menu size={28} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 xl:hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeMobileMenu}
          >
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute right-0 top-0 h-full w-full bg-white p-6 shadow-lg z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Log and Close Icon */}
              <div className="flex justify-between pb-8">
                <ScrollLink
                  to="home"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="cursor-pointer"
                  onClick={() => setActiveSection("home")}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl text-blue-900 flex items-center gap-1 font-semibold"
                  >
                    <img src="/icons/minify.png" alt="Minify Logo" className=" w-6 h-6" /> Minify
                  </motion.div>
                </ScrollLink>
                <button
                  onClick={toggleMobileMenu}
                  className="rounded-sm text-blue-900 border p-[6px] hover:text-blue-600"
                  aria-label="Toggle mobile menu"
                >
                  {mobileMenuOpen ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <Menu className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <motion.div key={link.id} variants={mobileLinkVariants}>
                    <ScrollLink
                      to={link.id}
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                      className={`flex items-center py-2 px-3 rounded-md text-sm font-medium ${
                        activeSection === link.id
                          ? "bg-primary-50  text-primary-600"
                          : "text-gray-700 hover:bg-gray-100 "
                      }`}
                      onClick={() => {
                        setActiveSection(link.id);
                        closeMobileMenu();
                      }}
                    >
                      {link.icon}
                      {link.name}
                    </ScrollLink>
                  </motion.div>
                ))}

                <motion.div variants={mobileLinkVariants}>
                  <ScrollLink
                    to="contact"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className="w-full bg-blue-600 text-white py-3 rounded-full border-2 border-blue-800 flex justify-center hover:bg-blue-800 transition-all duration-300 font-medium items-center"
                    onClick={closeMobileMenu}
                  >
                    Contact Developer
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </ScrollLink>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
