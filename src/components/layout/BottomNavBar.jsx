import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";
import {
  Home,
  LayoutDashboard,
  Briefcase,
  MessageCircle,
  HelpCircle
} from "lucide-react";

const bottomLinks = [
  { id: "home", label: "Home", icon: <Home className="w-5 h-5" /> },
  {
    id: "minify",
    label: "Minify",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    id: "history",
    label: "History",
    icon: <Briefcase className="w-5 h-5" />,
  },
  { id: "faqs", label: "FAQ's", icon: <HelpCircle className="w-5 h-5" /> },
  {
    id: "contact",
    label: "Contact",
    icon: <MessageCircle className="w-5 h-5" />,
  },
];

// Framer Motion Variants
const navBarVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      staggerChildren: 0.1,
    },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function BottomNavBar() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = bottomLinks.map((link) =>
        document.getElementById(link.id)
      );
      const scrollY = window.scrollY;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section) {
          const top = section.offsetTop - 100;
          const bottom = top + section.offsetHeight;
          if (scrollY >= top && scrollY < bottom) {
            setActiveSection(bottomLinks[i].id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
  <motion.nav
    className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow md:hidden w-full overflow-hidden"
    variants={navBarVariants}
    initial="hidden"
    animate="visible"
  >
    <div className="flex justify-between items-center w-full max-w-md mx-auto px-4 py-3">
      {bottomLinks.map((link) => (
        <motion.div key={link.id} variants={navItemVariants}>
          <ScrollLink
            to={link.id}
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className={`flex flex-col items-center text-[11px] font-medium transition-colors duration-200 cursor-pointer ${
              activeSection === link.id ? "text-[#0a66c2]" : "text-gray-600"
            }`}
          >
            {link.icon}
            <span className="mt-0.5">{link.label}</span>
          </ScrollLink>
        </motion.div>
      ))}
    </div>
  </motion.nav>
);

}
