import { Link as ScrollLink } from "react-scroll";
import {
  Github,
  Linkedin,
  Twitter,
  ArrowUp,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function FooterMain() {
  return (
    <footer className="py-20 bg-gradient-to-r from-[#4f46e5] to-[#3730a3] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Minify
            </h3>
            <p className="text-gray-50 mb-4">
              Creating innovative web solutions with a focus on performance,
              accessibility, and user experience.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/kngDaveed"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white text-gray-50 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/godfreychimaobim"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-50 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/dave52524982?s=21"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-50 hover:text-white  transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:davidgodfrey365@gmail.com" target="_blank" rel="noopener noreferrer" className="text-gray-50 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["home", "about", "projects", "services"].map((link) => (
                <li key={link}>
                  <ScrollLink
                    to={link}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className="text-gray-50 hover:text-white cursor-pointer capitalize transition-colors"
                  >
                    {link}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              {[
                "Web Development + Design",
                "Revamping & SEO Enhancements",
                "Hosting Web Solutions & CICD",
                "AI-Powered Integrated Solutions",
              ].map((service, idx) => (
                <li key={idx}>
                  <span className="text-gray-50 hover:text-white cursor-pointer transition-colors">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <a
                  href="mailto:davidgodfrey365@gmail.com.com"
                  className="hover:text-primary-600 dark:hover:text-primary-400 flex items-start"
                >
                  <Mail className="w-5 h-5 text-white mr-2 mt-0.5" />
                  <span className="text-gray-50 hover:text-white">
                    davidgodfrey365@gmail
                  </span>
                </a>
              </li>
              <li className="flex items-start">
                <a
                  href="tel:+2349162529733"
                  className="hover:text-primary-600 dark:hover:text-primary-400 flex items-start"
                >
                  <Phone className="w-5 h-5 text-white  mr-2 mt-0.5" />
                  <span className="text-gray-50 hover:text-white">
                    (+234) 9162 529 733
                  </span>
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-white mr-2 mt-0.5" />
                <span className="text-gray-50 hover:text-white">
                  Lagos State, Nigeria
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-dashed border-gray-400 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-50 text-sm">
            {/* {new Date().getFullYear()} */}
            Copyright © 2025 Minify App. All rights reserved.
            
          </p>
          <ScrollLink
            to="home"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="mt-4 md:mt-0 p-2 bg-[#4f46e5]  text-white rounded-full hover:bg-blue-700  transition-colors cursor-pointer"
          >
            <ArrowUp className="w-5 h-5" />
          </ScrollLink>
        </div>
      </div>
    </footer>
  );
}
