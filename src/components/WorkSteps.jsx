import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  MessageSquare, 
  FileSearch, 
  Code, 
  Hammer, 
  Glasses, 
  Rocket, 
  GalleryHorizontal,
  QrCode,
  Copy
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '../utils/animations';

const steps = [
  {
    icon: MessageSquare,
    title: "Copy Link",
    description: "Upload your long URL to begin. This is the original link you want to simplify for easier sharing."
  },
  {
    icon: FileSearch,
    title: "Paste & Shorten",
    description: "The system pings your long URL as you get a shorter version that redirects to it when clicked."
  },
  {
    icon: GalleryHorizontal,
    title: "Preview Card",
    description: "This shows what your link would look like, using the scraped metadata."
  },
  {
    icon:  Glasses,
    title: "Custom Features",
    description: "Create custom preview data for your links for enhanced user experience & conversion."
  },
  {
    icon: QrCode,
    title: "Upload Thumbnail or image url so the right data is displayed on preview before sharing",
    description: "Use QR"
  },
  {
    icon: Copy,
    title: "Copy Shortened Link",
    description: "Copy your new short link with one click and share it anywhere—messaging apps, emails, or social media."
  },

];


export default function WorkSteps() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <section className=" bg-white">
      <div className="px-4 md:px-12 py-20" ref={ref}>
        <div className="text-center">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className='text-3xl md:text-4xl font-semibold'
          >
            How It Works
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            A simple, effective process to Shorten your links and improve user experience
          </motion.p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            
            return (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-blue-100  text-blue-600  rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-800">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}