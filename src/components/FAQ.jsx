import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
// import { faqs } from '../../data/faqs';
import { fadeInUp, staggerContainer } from '../utils/animations';
import FAQItem from './ui/FAQItem';

const faqs = [
  {
    id: 1,
    question: "What is Minify?",
    answer: "Minify is a simple, fast, and reliable URL shortening service that lets you convert long, messy URLs into short and shareable links. It’s perfect for simplifying links in conversations, social posts, or presentations."
  },
  {
    id: 2,
    question: "Is Minify free to use?",
    answer: "Yes, Minify is completely free for personal and non-commercial use. You can shorten as many links as you'd like, with no sign-up required."
  },
  {
    id: 3,
    question: "How long do Minify links last?",
    answer: "Minify links currently do not expire. However, future versions may introduce features like custom expiry dates, one-time links, or user-defined time limits."
  },
  {
    id: 4,
    question: "Can I track how many people clicked my link?",
    answer: "Link analytics and tracking are not available in the basic version, but we plan to add click tracking, device insights, and referral stats in upcoming updates."
  },
  {
    id: 5,
    question: "Does Minify store my data or URLs?",
    answer: "Minify stores shortened URLs temporarily for redirection purposes only. No personal data is stored, and we do not log user activity beyond what's required for service functionality."
  },
  {
    id: 6,
    question: "Can I create custom short links?",
    answer: "Currently, Minify auto-generates unique short codes for every link. Custom aliases and branded links are features we plan to release in a premium version."
  },
  {
    id: 7,
    question: "Why is my link not shortening?",
    answer: "Make sure the URL is properly formatted and doesn’t contain any unsupported characters. If the problem persists, check your internet connection or try again later due to potential API rate limits."
  },
  {
    id: 8,
    question: "Will Minify work on mobile and desktop?",
    answer: "Yes! Minify is fully responsive and optimized for use on all devices — mobile, tablet, and desktop. You can shorten, copy, and share links on the go."
  },
  {
    id: 9,
    question: "Can I use Minify in my own project?",
    answer: "Yes, the frontend of Minify is open-source. You can find it on GitHub and are free to fork, clone, or contribute. Just make sure to review our license and attribution guidelines."
  }
];




export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <section id="faqs" className="py-20 bg-[#FFBE00]">
      <div className="px-4" ref={ref}>
        <div className="text-center">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className='text-2xl md:text-4xl text-shadow-lg/20 text-white font-semibold'
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className='text-white text-shadow-lg/30'
          >
            Answers to common questions
          </motion.p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-12 max-w-3xl mx-auto space-y-4"
        >
          {faqs.map((faq, idx) => (
            <FAQItem key={faq.id} faq={faq} idx={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}