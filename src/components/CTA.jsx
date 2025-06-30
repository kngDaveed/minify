import { ArrowUpRight } from "lucide-react";
import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { QrCode, Edit3, BarChart, Clock } from "lucide-react";
import MiniAppIconsGrid from "./ui/MiniAppIconsGrid";

const CTA = () => {
  return (
    <section
      id="cta"
      className="py-10 lg:py-20 px-4 md:px-12 relative text-center bg-[#FFBE00]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6">
        <div className="flex flex-col text-start gap-2 md:px-4">

          <ul className="grid gap-4 mt-4 mb-2">
            {/* QR Code */}
            <li className="flex items-start gap-2 md:gap-4 p-4 bg-white border border-gray-200 rounded-lg">
              <div className="p-2 bg-blue-50 border border-blue-200 rounded-md text-blue-700">
                <QrCode size={20} />
              </div>
              <div className="text-sm text-gray-700">
                <p className="font-medium">QR Code Generation</p>
                <p className="text-xs">
                  Auto-generate a QR code alongside every shortened URL.
                </p>
              </div>
            </li>

            {/* Custom Slugs */}
            <li className="flex items-start gap-2 md:gap-4 p-4 bg-white border border-gray-200 rounded-lg">
              <div className="p-2 bg-purple-50 border border-purple-200 rounded-md text-purple-700">
                <Edit3 size={20} />
              </div>
              <div className="text-sm text-gray-700">
                <p className="font-medium">Custom Slugs</p>
                <p className="text-xs">
                  Let users enter custom short link names.
                </p>
              </div>
            </li>

            {/* Click Analytics */}
            <li className="flex items-start gap-2 md:gap-4 p-4 bg-white border border-gray-200 rounded-lg">
              <div className="p-2 bg-green-50 border border-green-200 rounded-md text-green-700">
                <BarChart size={20} />
              </div>
              <div className="text-sm text-gray-700">
                <p className="font-medium">Click Analytics</p>
                <p className="text-xs">
                  Track how many times your shortened link was clicked.
                </p>
              </div>
            </li>

            {/* Expire Links */}
            <li className="flex items-start gap-2 md:gap-4 p-4 bg-white border border-gray-200 rounded-lg">
              <div className="p-2 bg-red-50 border border-red-200 rounded-md text-red-700">
                <Clock size={20} />
              </div>
              <div className="text-sm text-gray-700">
                <p className="font-medium">Preview Cards</p>
                <p className="text-xs">
                  See the metadata available for shortened links
                </p>
              </div>
            </li>
            {/* <li className="flex items-start gap-2 md:gap-4 p-4 bg-white border border-gray-200 rounded-lg">
              <div className="p-2 bg-red-50 border border-red-200 rounded-md text-red-700">
                <Clock size={20} />
              </div>
              <div className="text-sm text-gray-700">
                <p className="font-medium">Link Expiration</p>
                <p className="text-xs">
                  Set time-based expiry for links—automatically deactivate.
                </p>
              </div>
            </li> */}
          </ul>

          <MiniAppIconsGrid />
        </div>
        {/* <div className="gap-4 hidden xl:flex w-max mx-auto flex-col justify-center md:gap-4 mt-4 md:mt-0">
          

          <ScrollLink
            to="contact"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            className="w-max md:max-w-lg mx-auto border-2 border-white py-3 px-16 rounded-md bg-white text-blue-800 hover:text-white hover:bg-[#fdc959e8] font-medium hover:border-transparent transition-all duration-300 hidden items-center gap-2 justify-center cursor-pointer "
          >
            Stay Updated <ArrowUpRight size={16} />
          </ScrollLink>
        </div> */}
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="flex items-center gap-4">
            
            <div>
              <h1 className=" text-2xl sm:text-lg lg:text-xl font-bold text-white text-shadow-lg/20">
              Extended Features Updates
              </h1>
              <p className="text-white text-shadow-lg/30">
                QR Code, Custom Metadata, Custom url, Click Analysis, Meta PreviewCard if valid! Fallback to custom when not valid.
              </p>
            </div>
          </div>
          <ScrollLink
            to="contact"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            className="w-max md:max-w-lg mx-auto border-2 border-white py-3 px-16 rounded-md bg-white text-blue-800 hover:text-white hover:bg-[#fdc959e8] font-medium hover:border-transparent transition-all duration-300 flex items-center gap-2 justify-center cursor-pointer"
          >
            Stay Updated <ArrowUpRight size={16} />
          </ScrollLink>
          <img
            src="/images/Developers-reason.jpg"
            alt="developers linkedin profile image"
            className="md:w-[450px] md:mb-0 mb-8"
          />
          <a
            href="https://techbygodfrey.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-max md:max-w-lg mx-auto border-2 border-blue-800 bg-blue-700 py-3 px-10 rounded-md text-white hover:bg-blue-800 font-medium hover:border-blue-900 transition-all duration-300 flex items-center gap-2 justify-center cursor-pointer"
          >
            Developers Portfolio <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
