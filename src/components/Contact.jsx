import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import { Mail, Phone, MapPin, Send, Rocket } from "lucide-react";
import { fadeInLeft, fadeInRight } from "./utils/animations";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [state, handleSubmit] = useForm("mnnaeegd");

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      url: "https://github.com/kngDaveed",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      url: "https://www.linkedin.com/in/godfreychimaobim",
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      url: "https://x.com/dave52524982?s=21",
    },
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      url: "mailto:davidgodfrey365@gmail.com",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white px-4">
      <div className="section-container" ref={ref}>
        <div className="text-center">
          <motion.h2
            variants={fadeInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-3xl md:text-4xl font-semibold mb-2"
          >
            Lets Connect
          </motion.h2>
          <motion.p
            variants={fadeInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            Let's discuss how I can help you! Project Hiring, Interview Request or Collaboration Enquires
          </motion.p>
        </div>

        <div className="flex max-w-5xl mx-auto flex-col gap-4 justify-center md:flex-row mt-12">
          {/* Contact Info */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 h-full max-w-[360px]">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Contact Developer
              </h3>

              <p className="text-sm mb-6">
                I am available to answer your questions, project hiring and
                scheduled interview requests. Reach out through any of the
                following channels.
              </p>

              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                      <Mail className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm leading-[1] font-medium text-gray-900">
                      Email
                    </h4>
                    <p className="mt-1 text-gray-600">
                      <a
                        href="mailto:davidgodfrey365@gmail.com.com"
                        className="hover:text-blue-800"
                      >
                        davidgodfrey365@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                      <Phone className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm leading-[1] font-medium text-gray-900">
                      Phone
                    </h4>
                    <p className="mt-1 text-gray-600">
                      <a
                        href="tel:+2349162529733"
                        className="hover:text-primary-600"
                      >
                        (+234) 9162 529 733
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                      <MapPin className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm leading-[1] font-medium text-gray-900">
                      Location
                    </h4>
                    <p className="mt-1 text-gray-600">
                      Lagos State, Nigeria
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  Lets Connect on Socials <Rocket size={16} />
                </h4>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 hover:bg-blue-100  text-gray-600 hover:text-blue-600 p-3 rounded-full transition-colors"
                    >
                      <span className="sr-only">{social.name}</span>
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Have a project in mind?
              </h3>

              {state.succeeded ? (
                <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6">
                  <p className="font-medium">Message Sent Successfully!</p>
                  <p className="text-sm mt-1">
                    I'll be sure to get back to you Immediately with a response
                    regarding this Message.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        placeholder="Enter Your Name"
                        className="w-full px-4 py-2 border border-gray-300  rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white  text-gray-900"
                      />
                      <ValidationError
                        prefix="Name"
                        field="name"
                        errors={state.errors}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        placeholder="Enter Your Email"
                        className="w-full px-4 py-2 border border-gray-300  rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white  text-gray-900"
                      />
                      <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        placeholder="Enter Your Number"
                        className="w-full px-4 py-2 border border-gray-300  rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white  text-gray-900"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="website"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Website
                      </label>
                      <input
                        id="website"
                        type="url"
                        name="website"
                        placeholder="Company / Personal Website"
                        className="w-full px-4 py-2 border border-gray-300  rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject *
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      required
                      placeholder="Service or Subject Topic"
                      className="w-full px-4 py-2 border border-gray-300  rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900"
                    />
                    <ValidationError
                      prefix="Subject"
                      field="subject"
                      errors={state.errors}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      placeholder="Please share detailed highlights, specific enquires or hiring requests"
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900"
                    ></textarea>
                    <ValidationError
                      prefix="Message"
                      field="message"
                      errors={state.errors}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full border-2 border-blue-700 hover:border-blue-900 bg-blue-600 text-white py-3 px-5 rounded-full flex justify-center hover:bg-blue-700 transition-all duration-300 font-medium items-center cursor-pointer active"
                  >
                    {state.submitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          
        </div>
      </div>
    </section>
  );
}
